import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, AlertCircle, ChevronDown, ChevronUp, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import './ChatBox.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function ChatBox({ sessionId, isSidebarOpen, toggleSidebar }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantMessageId = Math.random().toString(36);
    setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '', sources: [] }]);

    try {
      const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: userMessage.content,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              setMessages(prev => prev.map(msg => {
                if (msg.id === assistantMessageId) {
                  if (data.type === 'sources') {
                    return { ...msg, sources: data.data };
                  } else if (data.type === 'content') {
                    return { ...msg, content: msg.content + data.data };
                  } else if (data.type === 'error') {
                    return { ...msg, content: `Error: ${data.data}` };
                  }
                }
                return msg;
              }));
            } catch (err) {
              console.error('Error parsing SSE:', err, line);
            }
          }
        }
      }
    } catch (error) {
      console.error('Query failed:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: "Sorry, an error occurred while processing your query. Have you uploaded any documents?" }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-left">
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          <span>System Online</span>
        </div>
      </div>

      <div className="messages-area">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <div className="empty-bot-icon">
              <Bot size={32} />
            </div>
            <h2 className="text-xl font-bold text-primary mb-2">Ready to assist</h2>
            <p className="text-secondary">Ask anything about your uploaded documents.</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <motion.div
              key={msg.id || idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`message-wrapper ${msg.role === 'user' ? 'user' : 'bot'}`}
            >
              <div className={`avatar ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className="message-content">
                <div className="text">
                  {msg.content || (msg.role === 'assistant' && isLoading && idx === messages.length - 1 ? (
                    <div className="flex gap-1.5 p-1">
                      <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  ) : '')}
                </div>
                
                {msg.sources && msg.sources.length > 0 && (
                  <SourcePanel sources={msg.sources} />
                )}
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <form onSubmit={handleSubmit} className="input-form shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your documents..."
            rows={1}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="send-button shadow-lg shadow-accent/20"
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function SourcePanel({ sources }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sources-container">
      <button 
        className="flex items-center gap-2 text-xs font-semibold text-secondary hover:text-accent transition-colors bg-white px-3 py-1.5 rounded-full border border-border mt-2" 
        onClick={() => setExpanded(!expanded)}
      >
        <AlertCircle size={14} />
        <span>{sources.length} sources</span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      
      {expanded && (
        <div className="flex flex-col gap-3 mt-4">
          {sources.map((src, i) => (
            <div key={i} className="bg-slate-50 border border-border p-4 rounded-xl text-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-accent text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{src.source}</span>
                <span className="text-[10px] font-bold text-slate-400">Match: {(src.score * 100).toFixed(1)}%</span>
              </div>
              <p className="text-secondary leading-relaxed">{src.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
