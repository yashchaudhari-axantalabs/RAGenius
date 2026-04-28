import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { label: "Queries Processed", value: "2M+" },
    { label: "Document Indexed", value: "500k+" },
    { label: "Retrieval Accuracy", value: "99.2%" },
    { label: "Average Response Time", value: "< 1.5s" }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">{stat.value}</div>
              <div className="text-secondary font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 max-w-4xl mx-auto bg-slate-50 border border-border p-12 rounded-3xl relative"
        >
          <div className="absolute top-0 left-12 -translate-y-1/2 text-8xl text-accent/10 font-serif">"</div>
          <p className="text-xl md:text-2xl font-medium text-primary mb-8 relative z-10 leading-relaxed">
            Axanta Labs is an emerging AI innovations startup dedicated to building the next generation of intelligent tools. RAGenius, our flagship product, bridges the gap between static documentation and actionable insights, empowering teams to converse with their data seamlessly and securely.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold">YC</div>
            <div>
              <div className="font-bold text-primary">Yash Chaudhari</div>
              <div className="text-secondary text-sm">Founder & Lead Developer, Axanta Labs</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
