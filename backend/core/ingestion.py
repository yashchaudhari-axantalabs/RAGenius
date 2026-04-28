import fitz  # PyMuPDF
import os
import uuid
import re
from typing import List, Dict, Any
from models import DocumentChunk

class IngestionService:
    def __init__(self, chunk_size=500, chunk_overlap=50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def process_document(self, file_path: str, filename: str) -> List[DocumentChunk]:
        ext = os.path.splitext(filename)[1].lower()
        text = ""
        
        if ext == '.pdf':
            text = self._extract_text_from_pdf(file_path)
        elif ext in ['.txt', '.md']:
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read()
        else:
            raise ValueError(f"Unsupported file type: {ext}")
            
        chunks_text = self._chunk_text(text)
        
        document_chunks = []
        for i, chunk in enumerate(chunks_text):
            if not chunk.strip():
                continue
            doc_chunk = DocumentChunk(
                id=str(uuid.uuid4()),
                text=chunk,
                metadata={
                    "source": filename,
                    "chunk_index": i
                }
            )
            document_chunks.append(doc_chunk)
            
        return document_chunks

    def _extract_text_from_pdf(self, file_path: str) -> str:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text() + "\n\n"
        return text

    def _chunk_text(self, text: str) -> List[str]:
        # Simple recursive character chunking roughly based on words
        words = re.split(r'(\s+)', text)
        chunks = []
        current_chunk = ""
        current_length = 0
        
        for word in words:
            if current_length + len(word) > self.chunk_size:
                chunks.append(current_chunk)
                # Keep some overlap
                overlap_text = current_chunk[-self.chunk_overlap:] if len(current_chunk) > self.chunk_overlap else current_chunk
                current_chunk = overlap_text + word
                current_length = len(current_chunk)
            else:
                current_chunk += word
                current_length += len(word)
                
        if current_chunk:
            chunks.append(current_chunk)
            
        return chunks
