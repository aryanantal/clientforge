"use client";

import { motion } from "framer-motion";
import { RefreshCw, Rocket, Target, TrendingUp } from "lucide-react";

export default function ProcessSection() {

  const workProcess = [
    {
      number: "01",
      title: "Understand Your Business",
      description: "Deep dive into your goals, audience, and pain points. No cookie-cutter solutions.",
      icon: Target,
    },
    {
      number: "02",
      title: "Build Fast + Scalable",
      description: "Modern tech stack, clean code, performance-first approach. Built to grow with you.",
      icon: Rocket,
    },
    {
      number: "03",
      title: "Optimize for Conversion",
      description: "Every pixel serves a purpose. Data-driven decisions that impact your bottom line.",
      icon: TrendingUp,
    },
    {
      number: "04",
      title: "Continuous Improvement",
      description: "Launch is just the beginning. Monitor, test, iterate, and scale.",
      icon: RefreshCw,
    },
  ];
  
return (
      <section className="relative py-32 bg-primary text-background overflow-hidden">
        {/* Diagonal Background */}
        <div className="absolute inset-0 bg-foreground transform -skew-y-3 origin-top-left" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">
              My Process
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              How I Work
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Not a template factory. Every project gets the full strategic treatment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-secondary text-foreground flex items-center justify-center font-black text-2xl z-10">
                    {step.number}
                  </div>

                  <div className="bg-background text-foreground p-8 pt-12 h-full border-4 border-background hover:border-secondary transition-all">
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-black mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
);
}