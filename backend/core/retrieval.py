import faiss
import numpy as np
from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any
from models import DocumentChunk
import os

class RetrievalStore:
    def __init__(self, model_name="BAAI/bge-small-en-v1.5"):
        # We load a small embedding model. In production, this can run on a dedicated GPU.
        # Ensure we download it to a specific directory or just rely on HF cache
        self.embedding_model = SentenceTransformer(model_name)
        
        self.chunks: List[DocumentChunk] = []
        
        # FAISS index setup
        self.embedding_dim = self.embedding_model.get_sentence_embedding_dimension()
        self.faiss_index = faiss.IndexFlatL2(self.embedding_dim)
        
        # BM25 setup
        self.bm25: BM25Okapi = None
        self.tokenized_corpus = []

    def has_documents(self) -> bool:
        return len(self.chunks) > 0

    def add_documents(self, new_chunks: List[DocumentChunk]):
        self.chunks.extend(new_chunks)
        texts = [chunk.text for chunk in new_chunks]
        
        # 1. Add to FAISS
        embeddings = self.embedding_model.encode(texts, convert_to_numpy=True)
        self.faiss_index.add(embeddings)
        
        # 2. Add to BM25
        # Re-initialize BM25 with all corpus (for simplicity, a more advanced impl would use a dynamic inverted index)
        all_texts = [chunk.text for chunk in self.chunks]
        self.tokenized_corpus = [doc.lower().split() for doc in all_texts]
        self.bm25 = BM25Okapi(self.tokenized_corpus)

    def hybrid_search(self, query: str, top_k: int = 10, alpha: float = 0.5) -> List[Dict[str, Any]]:
        if not self.has_documents():
            return []
            
        top_k = min(top_k, len(self.chunks))
        
        # Dense Retrieval (FAISS)
        query_embedding = self.embedding_model.encode([query], convert_to_numpy=True)
        distances, faiss_indices = self.faiss_index.search(query_embedding, top_k)
        
        # Sparse Retrieval (BM25)
        tokenized_query = query.lower().split()
        bm25_scores = self.bm25.get_scores(tokenized_query)
        bm25_indices = np.argsort(bm25_scores)[::-1][:top_k]
        
        # Reciprocal Rank Fusion (RRF)
        # Combine rankings from both sparse and dense retrieval
        k = 60 # RRF constant
        rrf_scores = {}
        
        # Process FAISS
        for rank, idx in enumerate(faiss_indices[0]):
            if idx == -1: continue
            if idx not in rrf_scores:
                rrf_scores[idx] = 0
            rrf_scores[idx] += 1 / (k + rank + 1)
            
        # Process BM25
        for rank, idx in enumerate(bm25_indices):
            if idx not in rrf_scores:
                rrf_scores[idx] = 0
            rrf_scores[idx] += 1 / (k + rank + 1)
            
        # Sort by RRF score
        sorted_indices = sorted(rrf_scores.keys(), key=lambda x: rrf_scores[x], reverse=True)
        
        results = []
        for idx in sorted_indices[:top_k]:
            chunk = self.chunks[idx]
            results.append({
                "id": chunk.id,
                "text": chunk.text,
                "score": rrf_scores[idx],
                "metadata": chunk.metadata
            })
            
        return results
