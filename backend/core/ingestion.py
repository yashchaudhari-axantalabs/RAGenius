import fitz  # PyMuPDF
import os
import uuid
import re
from typing import List, Dict, Any
from models import DocumentChunk
import pytesseract
from PIL import Image
import io

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
        elif ext in ['.png', '.jpg', '.jpeg']:
            text = self._extract_text_from_image(file_path)
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

    def _extract_text_from_image(self, file_path: str) -> str:
        # Check if user has specified a custom Tesseract path
        tesseract_cmd = os.environ.get("TESSERACT_CMD")
        if tesseract_cmd:
            pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
            
        try:
            image = Image.open(file_path)
            return pytesseract.image_to_string(image)
        except Exception as e:
            print(f"OCR failed for image {file_path}: {e}")
            return ""

    def _extract_text_from_pdf(self, file_path: str) -> str:
        doc = fitz.open(file_path)
        text = ""
        
        # Check if user has specified a custom Tesseract path
        tesseract_cmd = os.environ.get("TESSERACT_CMD")
        if tesseract_cmd:
            pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
            
        for page in doc:
            page_text = page.get_text()
            
            # If the page contains very little text, it's likely a scanned image or handwritten note
            if len(page_text.strip()) < 50:
                try:
                    # Render the entire page as a high-res image (better for handwriting/scans)
                    pix = page.get_pixmap(dpi=300)
                    img_data = pix.tobytes("png")
                    image = Image.open(io.BytesIO(img_data))
                    ocr_text = pytesseract.image_to_string(image)
                    page_text += ocr_text + "\n"
                except Exception as e:
                    print(f"OCR failed for page {page.number}: {e}")
                    
            text += page_text + "\n\n"
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
