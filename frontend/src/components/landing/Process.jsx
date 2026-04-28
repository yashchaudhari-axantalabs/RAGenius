import React from 'react';
import { motion } from 'framer-motion';
import { Database, Search, MessageSquareCode } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: <Database size={32} />,
      title: "Multimodal Ingestion",
      description: "Sophisticated document parsing and context-aware chunking converted into high-dimensional vector space using state-of-the-art embedding models."
    },
    {
      icon: <Search size={32} />,
      title: "Hybrid Neural Search",
      description: "Advanced dual-path retrieval combining semantic vector search with BM25 keyword matching, optimized by cross-encoder re-ranking for pinpoint accuracy."
    },
    {
      icon: <MessageSquareCode size={32} />,
      title: "Grounded Synthesis",
      description: "Hallucination-free response generation using grounded LLM logic, ensuring every insight is verifiable with direct source citations from your private data."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white font-bold text-sm mb-6 border border-white/10"
          >
            The RAG Architecture
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
            Engineered for <span className="text-accent">Absolute Precision</span> & Reliability
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Experience a production-grade RAG pipeline that transforms unstructured data into a private knowledge engine. 
            By merging high-dimensional vector embeddings with classical keyword matching, we provide a mathematical guarantee 
            of accuracy while maintaining enterprise-grade data privacy at every stage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[100px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 shadow-xl border border-white/10 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-white transition-all duration-500 text-accent rotate-3 group-hover:rotate-0">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed px-4 text-sm md:text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
