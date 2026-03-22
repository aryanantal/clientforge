"use client";

import { motion } from "framer-motion";

export default function ServicesProcessSection() {
  const phases = [
    {
      step: "01",
      title: "Discovery",
      description: "Understand your business, goals, and challenges",
    },
    {
      step: "02",
      title: "Strategy",
      description: "Create a technical roadmap aligned with business outcomes",
    },
    {
      step: "03",
      title: "Build",
      description: "Rapid development with weekly progress updates",
    },
    {
      step: "04",
      title: "Launch & Optimize",
      description: "Deploy, monitor, and continuously improve",
    },
  ];

  return (
    <section className="py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-sm font-bold uppercase tracking-wider text-secondary mb-4">
            [ HOW IT WORKS ]
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            MY <span className="text-primary">PROCESS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-8xl font-black text-muted opacity-20 mb-4">
                {phase.step}
              </div>
              <h3 className="text-3xl font-black mb-4">{phase.title}</h3>
              <p className="text-lg text-muted leading-relaxed">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
