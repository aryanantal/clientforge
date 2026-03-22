"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesCTASection() {
  return (
    <section className="py-32 bg-primary text-background relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-secondary opacity-30 blur-3xl"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-12">
            READY TO
            <br />
            <span className="text-secondary">SCALE UP?</span>
          </h2>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-12 py-6 bg-background text-foreground font-black text-xl hover:bg-secondary hover:text-foreground transition-all"
          >
            BOOK A CALL
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
