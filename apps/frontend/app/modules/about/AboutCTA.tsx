"use client";

import Link from "next/dist/client/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="py-32 bg-primary text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-12">
            CONVINCED?
            <br />
            <span className="text-secondary">LET&apos;S WORK.</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-background text-foreground font-black text-xl hover:bg-secondary hover:text-foreground transition-all"
            >
              START A PROJECT
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/projects"
                className="inline-flex items-center justify-center gap-3 px-12 py-6 border-4 border-background font-black text-xl hover:bg-background hover:text-foreground transition-all"
            >
              VIEW WORK
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
