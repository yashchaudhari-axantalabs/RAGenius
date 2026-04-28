import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ onStartChat }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-bold text-xl text-primary tracking-tight">RAGenius</span>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#features" 
            className="px-4 py-2 rounded-xl transition-all duration-300 hover:bg-slate-100 hover:text-accent hover:scale-105 active:scale-95 border border-transparent hover:border-border font-bold text-sm text-secondary"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="px-4 py-2 rounded-xl transition-all duration-300 hover:bg-slate-100 hover:text-accent hover:scale-105 active:scale-95 border border-transparent hover:border-border font-bold text-sm text-secondary"
          >
            How it works
          </a>
          <button 
            onClick={onStartChat}
            className="btn-primary py-2 px-5 text-sm flex items-center gap-1"
          >
            Start Chat
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
