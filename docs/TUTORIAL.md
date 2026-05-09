# Project Tutorial: Setup & Installation

Follow these steps to get **RAGenius** up and running.

## 📋 Prerequisites
*   **Python 3.9+**
*   **Node.js 18+**
*   **Ollama** (Required ONLY for Offline Mode)

---

## 🛠 Step 1: Common Backend Setup
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Initialize your environment variables**:
    *   Open **`user.env`** in the root folder and configure your AI provider.

---

## 🏠 Path A: Offline Setup (Ollama)
1.  **Install Ollama**: Download from [ollama.com](https://ollama.com).
2.  **Pull the Model**: `ollama pull llama3`
3.  **Configure `user.env`**:
    ```env
    LLM_PROVIDER=ollama
    OLLAMA_BASE_URL=http://localhost:11434
    OLLAMA_MODEL=llama3
    ```

---

## ☁️ Path B: Online Setup (Cloud APIs)
Configure your **`user.env`** with your chosen provider:

### For OpenAI:
```env
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-3.5-turbo
```

### For Google Gemini:
```env
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-pro
```

---

## 🎨 Step 2: Frontend Setup
1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install packages: `npm install`
3.  Start the development server: `npm run dev`

---

## 🏁 Step 3: Launch
1.  **Start Backend**: In the `backend` folder, run:
    ```bash
    uvicorn main:app --reload
    ```
2.  **Open Browser**: Go to `http://localhost:5173`.
3.  **Chat**: Upload a document and start your conversation!

---

