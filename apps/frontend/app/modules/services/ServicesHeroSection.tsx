"use client";

import { motion } from "framer-motion";

export default function ServicesHeroSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="text-sm font-bold uppercase tracking-wider text-primary mb-6">
            [ SERVICES ]
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-12">
            WHAT I
            <br />
            <span className="text-primary">DO BEST</span>
          </h1>
          <p className="text-2xl md:text-3xl max-w-3xl leading-relaxed text-muted-foreground">
            End-to-end solutions that drive real business results. No fluff, just revenue.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
