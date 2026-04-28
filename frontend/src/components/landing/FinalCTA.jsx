import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FinalCTA = ({ onStartChat }) => {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-accent rounded-3xl p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-accent/30"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
              Ready to give your <br /> data a voice?
            </h2>
            <p className="text-indigo-100 text-xl max-w-xl mx-auto mb-12">
              Join thousands of professionals who are saving time and gaining insights with RAGenius.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={onStartChat}
                className="bg-white text-accent hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Start Chat
              </button>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
