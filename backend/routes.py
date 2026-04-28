from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from fastapi.responses import StreamingResponse
from typing import List, Optional
import os
import shutil
import tempfile
from models import QueryRequest, QueryResponse
from core.ingestion import IngestionService
from core.retrieval import RetrievalStore
from core.reranker import RerankerService
from core.llm import LLMService
from core.mail import mail_service

router = APIRouter()

# Initialize core services
ingestion_service = IngestionService()
retrieval_store = RetrievalStore()
reranker_service = RerankerService()
llm_service = LLMService()

# Global memory dictionary to simulate session memory
chat_history_db = {}

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload a document, parse it, and index it in the hybrid store."""
    try:
        # Save file to a temporary location
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name

        # Parse and chunk the document
        chunks = ingestion_service.process_document(tmp_path, filename=file.filename)
        
        # Clean up temp file
        os.remove(tmp_path)
        
        if not chunks:
            raise HTTPException(status_code=400, detail="Could not extract text from the document.")

        # Add chunks to vector store and BM25 store
        retrieval_store.add_documents(chunks)
        
        return {
            "status": "success", 
            "message": f"Successfully processed '{file.filename}'", 
            "chunks_indexed": len(chunks)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/query")
async def query_system(request: QueryRequest):
    """Query the system. This triggers hybrid retrieval, reranking, and LLM generation."""
    query = request.query
    session_id = request.session_id or "default"
    
    if not retrieval_store.has_documents():
        return {
            "answer": "No documents have been indexed yet. Please upload a document first.",
            "sources": []
        }
        
    try:
        # 1. Hybrid Retrieval (FAISS + BM25)
        # We retrieve top 10 chunks from hybrid search
        retrieved_chunks = retrieval_store.hybrid_search(query, top_k=10)
        
        # 2. Re-ranking
        # We re-rank the top 10 chunks and select the top 3
        reranked_chunks = reranker_service.rerank(query, retrieved_chunks, top_k=3)
        
        # 3. Context Preparation
        context_texts = [f"Source: {c['metadata']['source']}\nContent: {c['text']}" for c in reranked_chunks]
        context = "\n\n".join(context_texts)
        
        # 4. Chat History
        if session_id not in chat_history_db:
            chat_history_db[session_id] = []
        history = chat_history_db[session_id]
        
        # 5. LLM Generation (Streaming)
        # Using a generator for Server-Sent Events
        generator = llm_service.generate_streaming_response(query, context, history, reranked_chunks)
        
        # Update history (we append the query now, the generator will append the response)
        chat_history_db[session_id].append({"role": "user", "content": query})
        
        return StreamingResponse(generator, media_type="text/event-stream")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
async def get_history(session_id: str = "default"):
    """Retrieve chat history for a session."""
    return {"history": chat_history_db.get(session_id, [])}
@router.post("/contact")
async def handle_contact(
    name: str = Form(...), 
    email: str = Form(...), 
    message: str = Form(...),
    type: str = Form("contact")
):
    """Handle contact/feedback form submissions and send email."""
    target_email = os.getenv("MAIL_TO", "axantalabs@gmail.com")
    subject = f"New {type.capitalize()} Message from {name}"
    
    body = f"""
    You have received a new {type} submission:
    
    Name: {name}
    Email: {email}
    Message: {message}
    
    Type: {type}
    """
    
    # 1. Log the message
    print(f"NEW {type.upper()} FOR {target_email} FROM: {name} ({email})")
    
    # 2. Send the actual email
    sent = mail_service.send_email(subject, body, target_email)
    
    # 3. Persistent log
    with open("submissions.txt", "a") as f:
        f.write(f"--- NEW {type.upper()} SUBMISSION ---\nName: {name}\nEmail: {email}\nMessage: {message}\nSent: {sent}\n\n")
    
    return {"status": "success", "message": f"Message processed successfully!"}
