import os
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class DocumentChunk(BaseModel):
    id: str
    text: str
    metadata: Dict[str, Any]
    
class QueryRequest(BaseModel):
    query: str
    session_id: Optional[str] = None
    
class QueryResponse(BaseModel):
    answer: str
    sources: List[Dict[str, Any]]
    
class SourceInfo(BaseModel):
    id: str
    text: str
    score: float
    metadata: Dict[str, Any]
