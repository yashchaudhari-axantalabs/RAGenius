import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="font-bold text-xl text-primary tracking-tight">RAGenius</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-secondary">
            <a 
              href="https://www.linkedin.com/in/yashchaudhari-axantalabs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 rounded-xl transition-all duration-300 hover:bg-slate-100 hover:text-accent hover:scale-105 active:scale-95 border border-transparent hover:border-border"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/yashchaudhari-axantalabs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 rounded-xl transition-all duration-300 hover:bg-slate-100 hover:text-accent hover:scale-105 active:scale-95 border border-transparent hover:border-border"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-secondary text-sm">
          <p>© 2024 Axanta Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
