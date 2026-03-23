"use client";

import { motion } from "framer-motion";

export default function ServicesProcessSection() {
const phases = [
  {
    step: "01",
    title: "Audit & Discovery",
    description: "We dive deep into your current metrics, bottlenecks, and business goals to find the highest leverage opportunities.",
  },
  {
    step: "02",
    title: "Technical Roadmap",
    description: "I design a strategy focused on ROI, selecting the right architecture (Next.js/HubSpot) for your specific scale.",
  },
  {
    step: "03",
    title: "Agile Execution",
    description: "Rapid, transparent development with weekly sprints and a private staging environment for constant feedback.",
  },
  {
    step: "04",
    title: "Optimization",
    description: "Launch is just the beginning. We monitor Core Web Vitals and conversion data to ensure the product performs.",
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
