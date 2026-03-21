"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-sm font-bold uppercase text-primary mb-6">
            [ GET IN TOUCH ]
          </div>

          <h1 className="text-6xl font-black leading-[0.9] mb-12">
            LET&apos;S <br />
            <span className="text-primary">TALK</span> <br />
            BUSINESS
          </h1>

          <p className="text-2xl text-muted-foreground">
            Got a project? A question? An idea? Let&apos;s talk.
          </p>
        </motion.div>
      </div>
    </section>
  );
}