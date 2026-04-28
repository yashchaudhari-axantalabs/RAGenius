import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const featureList = [
    {
      icon: "⚡",
      title: "Instant Retrieval",
      description: "Get answers in seconds. Our optimized indexing ensures lightning-fast search across thousands of pages."
    },
    {
      icon: "🔒",
      title: "Data Privacy",
      description: "Your data never leaves your control. We prioritize security with industry-standard encryption and local processing options."
    },
    {
      icon: "📚",
      title: "Multi-Source Indexing",
      description: "Connect multiple documents, PDFs, and text files. RAGenius synthesizes information from all your sources."
    },
    {
      icon: "🤖",
      title: "Advanced LLM Integration",
      description: "Leverage state-of-the-art language models fine-tuned for retrieval tasks and high accuracy."
    },
    {
      icon: "🔗",
      title: "Seamless Integration",
      description: "Easy-to-use API and embeddable components allow you to bring RAGenius to any application."
    },
    {
      icon: "📊",
      title: "Insight Analytics",
      description: "Track query performance and document usage to understand what information is most valuable."
    }
  ];

  return (
    <section id="features" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-bold text-sm mb-6">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Built for performance and <span className="text-accent">privacy</span>
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Everything you need to build a robust knowledge assistant, out of the box.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
