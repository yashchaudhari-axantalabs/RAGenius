import os
from dotenv import load_dotenv
import ollama
import json
from typing import List, Dict, Any, Generator
from openai import OpenAI
import google.generativeai as genai

# Load environment variables from specific files
load_dotenv(os.path.join(os.path.dirname(__file__), "../../user.env"))
load_dotenv(os.path.join(os.path.dirname(__file__), "../../developer.env"))

class LLMService:
    def __init__(self):
        self.provider = os.getenv("LLM_PROVIDER", "ollama").lower()
        
        # Ollama Config
        self.ollama_base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        self.ollama_model = os.getenv("OLLAMA_MODEL", "llama3")
        self.ollama_client = ollama.Client(host=self.ollama_base_url)
        
        # OpenAI Config
        self.openai_key = os.getenv("OPENAI_API_KEY")
        self.openai_model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
        self.openai_client = OpenAI(api_key=self.openai_key) if self.openai_key else None
        
        # Gemini Config
        self.gemini_key = os.getenv("GEMINI_API_KEY")
        self.gemini_model_name = os.getenv("GEMINI_MODEL", "gemini-pro")
        if self.gemini_key:
            genai.configure(api_key=self.gemini_key)
            self.gemini_model = genai.GenerativeModel(self.gemini_model_name)
        else:
            self.gemini_model = None

    def generate_streaming_response(
        self, 
        query: str, 
        context: str, 
        history: List[Dict[str, str]], 
        sources: List[Dict[str, Any]]
    ) -> Generator[str, None, None]:
        
        system_prompt = (
            "You are RAGenius, a helpful AI Knowledge Assistant. "
            "Use the provided retrieved context to answer the user's question. "
            "If the answer cannot be found in the context, politely state that you do not know. "
            "Always cite the source document when providing facts from the context.\n\n"
            f"Context:\n{context}"
        )
        
        messages = [{"role": "system", "content": system_prompt}]
        for msg in history[-10:]:
            messages.append(msg)
        messages.append({"role": "user", "content": query})
        
        # Send an initial event with source metadata
        sources_event = {
            "type": "sources",
            "data": [
                {
                    "source": s["metadata"]["source"],
                    "score": s["score"],
                    "text": s["text"][:150] + "..."
                }
                for s in sources
            ]
        }
        yield f"data: {json.dumps(sources_event)}\n\n"

        try:
            if self.provider == "openai" and self.openai_client:
                yield from self._stream_openai(messages)
            elif self.provider == "gemini" and self.gemini_model:
                yield from self._stream_gemini(query, context, history)
            else:
                yield from self._stream_ollama(messages)
                
            yield f"data: {json.dumps({'type': 'done', 'data': ''})}\n\n"
            
        except Exception as e:
            error_event = {
                "type": "error",
                "data": f"{self.provider.capitalize()} Error: {str(e)}"
            }
            yield f"data: {json.dumps(error_event)}\n\n"

    def _stream_ollama(self, messages):
        stream = self.ollama_client.chat(
            model=self.ollama_model,
            messages=messages,
            stream=True,
            options={"temperature": 0.3}
        )
        for chunk in stream:
            content = chunk.get("message", {}).get("content", "")
            if content:
                yield f"data: {json.dumps({'type': 'content', 'data': content})}\n\n"

    def _stream_openai(self, messages):
        response = self.openai_client.chat.completions.create(
            model=self.openai_model,
            messages=messages,
            stream=True,
            temperature=0.3
        )
        for chunk in response:
            if chunk.choices[0].delta.content:
                yield f"data: {json.dumps({'type': 'content', 'data': chunk.choices[0].delta.content})}\n\n"

    def _stream_gemini(self, query, context, history):
        # Gemini uses a different message structure
        full_prompt = f"System: You are RAGenius. Context: {context}\n\n"
        for msg in history[-5:]:
            full_prompt += f"{msg['role'].capitalize()}: {msg['content']}\n"
        full_prompt += f"User: {query}"
        
        response = self.gemini_model.generate_content(full_prompt, stream=True)
        for chunk in response:
            if chunk.text:
                yield f"data: {json.dumps({'type': 'content', 'data': chunk.text})}\n\n"
