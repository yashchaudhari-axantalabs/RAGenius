from sentence_transformers import CrossEncoder
from typing import List, Dict, Any

class RerankerService:
    def __init__(self, model_name="cross-encoder/ms-marco-MiniLM-L-6-v2"):
        # Load a cross-encoder model for superior reranking
        self.reranker = CrossEncoder(model_name)

    def rerank(self, query: str, retrieved_chunks: List[Dict[str, Any]], top_k: int = 3) -> List[Dict[str, Any]]:
        if not retrieved_chunks:
            return []
            
        top_k = min(top_k, len(retrieved_chunks))
        
        # Prepare pairs for cross-encoder [query, document]
        pairs = [[query, chunk["text"]] for chunk in retrieved_chunks]
        
        # Predict scores
        scores = self.reranker.predict(pairs)
        
        # Assign scores and sort
        for idx, chunk in enumerate(retrieved_chunks):
            chunk["score"] = float(scores[idx])  # Update score with cross-encoder score
            
        # Sort descending by cross-encoder score
        reranked = sorted(retrieved_chunks, key=lambda x: x["score"], reverse=True)
        
        return reranked[:top_k]
