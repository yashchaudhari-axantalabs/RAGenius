<div align="center">
  <h1>📈 RAGenius: Changelog & Updates</h1>
  <p>Track the evolution of RAGenius. This file serves as a public ledger for all improvements, bug fixes, and feature additions.</p>
</div>

<hr />

## 🚀 Current Version: `v1.2.0 (Stable)`

### 🆕 What's New?

#### ✨ Optical Character Recognition (OCR) Capabilities
- **Handwriting & Scans:** Overhauled PDF ingestion. If a PDF page contains less than 50 characters of digital text, the system automatically renders a high-resolution snapshot and extracts text using Tesseract OCR.
- **Direct Image Uploads:** Added direct support for uploading image files (`.png`, `.jpg`, `.jpeg`) for text extraction.
- **Tesseract Config:** Added `TESSERACT_CMD` environment variable to `user.env` for seamless local Tesseract OCR integration.

#### 🛠️ Stability & Dependencies
- **Fixed `Network Error`:** Resolved a critical bug where the backend server process would freeze and hold port `8000` hostage.
- **Global Dependencies:** Globally installed necessary Python dependencies to prevent `ModuleNotFoundError` crashes when starting the backend server outside of the virtual environment.

---

## ⏳ Previous Versions

<details>
<summary><b>v1.1.0</b> (Click to expand)</summary>
<br>

- 🔒 **Security**: Implemented dual-environment configuration (`user.env` vs `developer.env`) to protect developer secrets.
- ⚙️ **Config**: Moved `VITE_API_URL` to `user.env` for easier deployment by end-users.
- 📚 **Docs**: Complete rewrite of all documentation (`README.md`, Features, Tutorial) for a more professional and impressive presentation.
- 🎨 **UI**: Enhanced Glassmorphic effects in the Sidebar and Chat components.
</details>

<details>
<summary><b>v1.0.0</b> (Click to expand)</summary>
<br>

- 🎉 **Initial Release**: Core RAG pipeline with FastAPI and React.
- 🔍 **Hybrid Search**: Introduction of FAISS + BM25 integration.
- 🤖 **Multi-LLM**: Initial support for Ollama, OpenAI, and Gemini.
</details>

---

## 🤝 How to Contribute Updates

We welcome the GitHub community to help make **RAGenius** even better! If you've made an update, follow these steps to add it here:

1. **Fork the Repo**: Create your own branch for the feature or fix.
2. **Implement Changes**: Ensure your code follows the project's design aesthetic.
3. **Update this File**: Add a new entry under the **Community Contributions** section below.
4. **Submit a PR**: We will review and merge it!

### 🌟 Community Contributions
*(Add your name and update details below!)*

- **[Your Name/GitHub Profile Link]**: *Brief description of the update you made (e.g., "Added support for Excel files").*

---
<div align="center">
  <b>Stay updated with Axanta Labs.</b>
</div>
