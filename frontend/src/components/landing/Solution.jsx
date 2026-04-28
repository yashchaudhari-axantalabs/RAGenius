import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Solution = () => {
  const benefits = [
    "Context-Aware Retrieval",
    "Private & Secure Processing",
    "Source-Cited Answers",
    "Lightning Fast Querying",
    "Easy Document Ingestion",
    "Interactive Chat Interface"
  ];

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-xs mb-6 uppercase tracking-wider">
            The Solution
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Meet your personal AI <br /> knowledge assistant.
          </h2>
          <p className="text-secondary text-lg mb-8 leading-relaxed">
            RAGenius uses advanced Retrieval-Augmented Generation to turn your static documents into a dynamic conversation. Our system indexes your data and uses it as the primary source for all AI interactions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-medium text-primary">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 relative group"
        >
          {/* Windows Laptop Browser Style Frame */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-accent/20">
            {/* Windows Browser Header */}
            <div className="bg-[#f3f3f3] border-b border-slate-300 px-4 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                {/* Back/Forward buttons */}
                <div className="flex gap-4 text-slate-400">
                  <span className="text-sm">←</span>
                  <span className="text-sm">→</span>
                  <span className="text-sm">⟳</span>
                </div>
                {/* URL Bar */}
                <div className="flex-1 bg-white border border-slate-300 rounded-md py-1 px-3 text-[11px] text-slate-500 font-sans truncate">
                  https://ragenius.axantalabs.com/demo
                </div>
              </div>
              
              {/* Windows Window Controls (Right side) */}
              <div className="flex items-center">
                <div className="px-3 py-1 hover:bg-slate-200 transition-colors text-slate-600 text-xs">─</div>
                <div className="px-3 py-1 hover:bg-slate-200 transition-colors text-slate-600 text-[10px]">⬜</div>
                <div className="px-3 py-1 hover:bg-red-500 hover:text-white transition-colors text-slate-600 text-sm">×</div>
              </div>
            </div>
            
            {/* Video Content */}
            <div className="aspect-video relative bg-slate-950">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* Floating accent elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-all" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all" />
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
