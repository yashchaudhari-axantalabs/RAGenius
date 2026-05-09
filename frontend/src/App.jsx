import { useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import LandingPage from './components/LandingPage';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function App() {
  const [documents, setDocuments] = useState([]);
  const [sessionId] = useState(Math.random().toString(36).substring(7));
  const [isUploading, setIsUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const uploadFile = async (file) => {
      setIsUploading(true);
      try {
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post(`${API_URL}/upload`, formData);
          setDocuments(prev => [...prev, {
            name: file.name,
            status: 'success',
            chunks: response.data.chunks_indexed
          }]);
      } catch (error) {
          console.error('Upload failed:', error);
          alert('Upload failed: ' + (error.response?.data?.detail || error.message));
      } finally {
          setIsUploading(false);
      }
  }

  return (
    <div className="min-h-screen bg-background">
      {documents.length === 0 && !isUploading ? (
        <LandingPage uploadFile={uploadFile} />
      ) : (
        <div className="flex h-screen overflow-hidden bg-slate-50">
          <Sidebar 
            documents={documents} 
            uploadFile={uploadFile} 
            isUploading={isUploading}
            isOpen={isSidebarOpen}
          />
          <div className="flex-1 flex flex-col p-5 relative overflow-hidden">
            <div className="flex-1 bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl flex flex-col">
              <ChatBox 
                sessionId={sessionId}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
