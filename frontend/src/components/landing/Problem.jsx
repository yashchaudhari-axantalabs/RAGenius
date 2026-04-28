import React from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, FileWarning } from 'lucide-react';

const Problem = () => {
  const problems = [
    {
      icon: <Search className="text-red-500" />,
      title: "Endless Searching",
      description: "Stop wasting hours digging through folders. Finding the right information shouldn't be a full-time job."
    },
    {
      icon: <FileWarning className="text-red-500" />,
      title: "Inaccurate Answers",
      description: "Generic AI models hallucinate. You need answers based on your specific documents, not general knowledge."
    },
    {
      icon: <Clock className="text-red-500" />,
      title: "Delayed Decisions",
      description: "Waiting for information slows down your business. Get instant insights to keep your momentum going."
    }
  ];

  return (
    <section className="section-padding bg-slate-50 border-y border-border">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The Challenge of Modern Information</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Traditional tools for document management are outdated. They don't understand context, leaving you with more noise and less value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-secondary leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
