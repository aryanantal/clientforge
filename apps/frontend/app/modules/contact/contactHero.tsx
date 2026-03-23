"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-sm font-bold uppercase text-primary mb-6">
            [ GET IN TOUCH ]
          </div>

          <h1 className="text-6xl font-black leading-[0.9] mb-12">
            LET&apos;S <br />
            <span className="text-primary">TALK</span> <br />
            BUSINESS
          </h1>

          <p className="text-2xl text-muted-foreground max-w-2xl">
            Ready to turn your digital presence into a high-performance 
            revenue machine? Let&apos;s discuss your goals and build something 
            that actually moves the needle.
          </p>
        </motion.div>
      </div>
    </section>
  );
}