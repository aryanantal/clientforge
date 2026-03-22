"use client"

import { motion } from "framer-motion";

export default function AboutPullQuote() {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight italic mb-8">
            &quot;Speed is a feature.
            <br />
            <span className="text-secondary">Performance is profit.&quot;</span>
          </div>
          <div className="text-xl font-bold uppercase tracking-wider text-muted-foreground">
            — My Mantra
          </div>
        </motion.div>
      </div>
    </section>
  );
}
