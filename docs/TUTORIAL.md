# ⚙️ Project Tutorial: Get Started with RAGenius

Welcome to the RAGenius setup guide. Follow these steps to transform your documents into an interactive knowledge base in minutes.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
*   **Python 3.9+** (For the Backend engine)
*   **Node.js 18+** (For the Frontend interface)
*   **Ollama** (Optional: Only required if you want to run AI 100% locally)

---

## 🛠 Step 1: Backend Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    ```

3.  **Activate the Environment**:
    - **Windows**: `venv\Scripts\activate`
    - **Mac/Linux**: `source venv/bin/activate`

4.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

---

## 🔑 Step 2: Configure Your "Brain" (`user.env`)

In the project root, you will find a file named **`user.env`**. This is where you tell RAGenius which AI to use.

### Option A: 100% Local (Ollama)
1.  Download Ollama from [ollama.com](https://ollama.com).
2.  Open your terminal and pull a model: `ollama pull tinyllama` (or your preferred model).
3.  Set your `user.env`:
    ```env
    LLM_PROVIDER=ollama
    OLLAMA_MODEL=tinyllama
    VITE_API_URL=http://127.0.0.1:8000
    ```

### Option B: High-Performance Cloud (OpenAI/Gemini)
1.  Obtain your API Key from [OpenAI](https://platform.openai.com/) or [Google AI Studio](https://aistudio.google.com/).
2.  Update your `user.env`:
    ```env
    LLM_PROVIDER=openai  # or 'gemini'
    OPENAI_API_KEY=your_secret_key_here
    VITE_API_URL=http://127.0.0.1:8000
    ```

---

## 🎨 Step 3: Frontend Interface Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install Packages**:
    ```bash
    npm install
    ```

3.  **Launch the UI**:
    ```bash
    npm run dev
    ```

---

## 🏁 Step 4: Launch & Chat

1.  **Start the Backend**: In your backend terminal (with venv active), run:
    ```bash
    uvicorn main:app --reload
    ```
2.  **Access the App**: Open your browser and go to `http://localhost:5173`.
3.  **Knowledge Transfer**: 
    - Click on the sidebar to **Upload** your PDF, TXT, or MD files.
    - Wait for the "Successfully processed" notification.
    - **Start Chatting** with your data!

---

> [!TIP]
> Always ensure your backend is running before trying to upload or chat in the frontend. If you see connection errors, check that the `VITE_API_URL` in your `user.env` matches your backend address.

---
Need help? Contact us via the in-app contact form!
