import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Loader } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ documents, uploadFile, isUploading, isOpen }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
             <div className="w-3 h-3 bg-white rounded-sm rotate-45" />
          </div>
          <h1>RAGenius</h1>
        </div>
        <p className="subtitle">by <span className="company-name text-accent font-semibold">Axanta Labs</span></p>
      </div>

      <div className="sidebar-body">
        <div className="upload-section">
          <p className="section-label">Knowledge Base</p>
          <div
            className={`upload-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple={false}
              accept=".pdf,.txt,.md"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            {isUploading ? (
              <div className="upload-content">
                <Loader className="animate-spin text-accent" size={20} />
                <p className="text-sm font-medium mt-2">Processing...</p>
              </div>
            ) : (
              <div className="upload-content">
                <div className="upload-icon-wrap">
                  <UploadCloud size={20} />
                </div>
                <p>Drop PDF or TXT here</p>
                <span>or click to browse</span>
              </div>
            )}
          </div>
        </div>

        <div className="documents-list">
          <p className="section-label">Indexed Documents ({documents.length})</p>
          {documents.length === 0 ? (
            <p className="empty-state">No documents uploaded yet.</p>
          ) : (
            <ul>
              {documents.map((doc, i) => (
                <li key={i} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
                  <FileText size={16} className="text-accent shrink-0" />
                  <div className="doc-info min-w-0">
                    <p className="doc-name text-sm font-semibold truncate">{doc.name}</p>
                    <p className="doc-meta text-xs text-secondary">{doc.chunks} chunks indexed</p>
                  </div>
                  <CheckCircle size={14} className="text-green-500 ml-auto shrink-0" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
