"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/dist/client/link";

export default function CTASection() {
return (
          <section className="py-32 bg-primary text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Ready to Turn Your<br />
              Website Into a<br />
              <span className="text-secondary">Money Machine?</span>
            </h2>
            <p className="text-2xl mb-12 opacity-90 font-bold">
              Let&apos;s talk numbers. Let&apos;s talk growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-background text-foreground font-black text-xl hover:bg-secondary hover:text-foreground transition-all"
              >
                START A PROJECT
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 px-12 py-6 border-4 border-background font-black text-xl hover:bg-background hover:text-foreground transition-all"
              >
                SEE MORE PROOF
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
);
}