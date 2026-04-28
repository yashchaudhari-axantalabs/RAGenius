import React, { useRef, useState } from 'react';
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import Problem from './landing/Problem';
import Solution from './landing/Solution';
import Features from './landing/Features';
import Process from './landing/Process';
import Stats from './landing/Stats';
import FinalCTA from './landing/FinalCTA';
import Footer from './landing/Footer';

const LandingPage = ({ uploadFile }) => {
  const fileInputRef = useRef(null);

  const handleStartChat = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.txt,.md"
      />
      
      <Navbar 
        onStartChat={handleStartChat} 
      />
      
      <main>
        <Hero onStartChat={handleStartChat} />
        <Problem />
        <Solution />
        <Features />
        <Process />
        <Stats />
        <FinalCTA onStartChat={handleStartChat} />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
