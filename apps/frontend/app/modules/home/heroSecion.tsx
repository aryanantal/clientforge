"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "../../../../shared/constants";

export default function HeroSection() {
return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden min-h-[85vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <div className="inline-block mb-6 px-4 py-2.5 bg-foreground text-background font-black uppercase tracking-wider text-xs">
            Full Stack Developer & HubSpot Specialist.
          </div>
          
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-8 text-foreground">
              Your website shouldn&apos;t<br />
              just <span className="text-secondary">look good</span>.<br />
              It should <span className="relative inline-block">
                make money
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-0 left-0 w-full h-3 bg-accent -z-10"
                />
              </span>.
            </h1>

          <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-10 max-w-3xl font-bold">
            I build high-performance web platforms that drive revenue.
            Full Stack Engineer (Next.js & MERN) + HubSpot Specialist.
            Helping startups and businesses scale with fast, conversion-focused websites and custom CMS solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${ROUTES.PROJECTS}`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-black text-base hover:bg-accent hover:text-foreground transition-all"
            >
              SEE THE PROOF
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href={`${ROUTES.CONTACT}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-4 border-foreground text-foreground font-black text-base hover:bg-foreground hover:text-background transition-all"
            >
              LET&apos;S TALK GROWTH
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
);
}