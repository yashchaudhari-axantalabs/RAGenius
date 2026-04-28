# 🚀 RAGenius: Features & Technical Architecture

Deep dive into the engine that powers the ultimate RAG assistant. RAGenius is engineered for precision, speed, and a premium user experience.

---

## 🛠 Advanced Features

### 1. Hybrid Retrieval Engine (Semantic + Keyword)
Standard vector search often misses specific keywords. RAGenius solves this by running two parallel search paths:
-   **FAISS (Semantic)**: Uses `sentence-transformers` to find chunks that are conceptually similar to your query.
-   **BM25 (Keyword)**: Uses traditional TF-IDF based ranking to ensure specific terms and technical jargon are never missed.
The results are then fused to provide the most relevant context.

### 2. Multi-Stage Re-ranking
Before the context reaches the AI, it undergoes a **Cross-Encoder Re-ranking** phase. This verifies the relevance of each retrieved chunk against the query, ensuring only high-quality data is used for generation.

### 3. Dynamic LLM Switching
Switch between "Brains" instantly by updating your `user.env`:
-   **Local**: Ollama (Llama 3, Mistral, TinyLlama).
-   **Cloud**: OpenAI (GPT-3.5/4 Turbo), Google Gemini (Pro).

### 4. Real-time Streaming
No more waiting for a wall of text. RAGenius uses **Server-Sent Events (SSE)** to stream responses word-by-word, providing an interactive and responsive chat experience.

---

## ⚙️ Technical Workflow

The magic of RAGenius happens in five distinct stages:

### 📥 1. Intelligent Ingestion
When you upload a file (PDF, TXT, MD), our system parses the raw text and applies an **Overlapping Recursive Character Splitting** strategy. This ensures that context is preserved between chunks, preventing "broken" information.

### 🧠 2. Vectorization & Indexing
Each chunk is transformed into a high-dimensional vector (embedding). These vectors are stored in a **FAISS** index for lightning-fast retrieval, while the raw text is indexed in **BM25** for keyword matching.

### 🔍 3. Contextual Retrieval
When you ask a question:
1.  We vectorize your query.
2.  We perform a semantic search in FAISS.
3.  We perform a keyword search in BM25.
4.  We merge and deduplicate the top results.

### 🎭 4. Re-ranking & Refinement
The top candidates are passed through a re-ranking model that calculates a "final relevance score." Only the top-tier chunks are selected to form the **AI Prompt Context**.

### ✍️ 5. Augmented Generation
The LLM receives your query + the refined context. It then synthesizes a factual, cited response, ensuring that the answer is grounded in your uploaded documents.

---

## 💎 Design Philosophy: Glassmorphism
RAGenius isn't just a tool; it's an experience. Our UI uses:
-   **Translucent Layers**: Subtle backdrops that feel modern and light.
-   **Dynamic Animations**: Micro-interactions that respond to user input.
-   **Responsive Layout**: Perfectly optimized for both desktop and mobile productivity.

---
Built for the future of knowledge management by **Axanta Labs**.
