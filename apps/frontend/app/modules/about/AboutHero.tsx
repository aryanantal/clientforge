"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-secondary opacity-20 blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="text-sm font-bold uppercase tracking-wider text-primary">
              [ ABOUT ME ]
            </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9]">
                I&apos;M NOT
                <br />
                <span className="text-primary">JUST A</span>
                <br />
                DEVELOPER
              </h1>

              <div className="space-y-6 text-xl md:text-2xl leading-relaxed max-w-2xl">
                <p className="text-foreground font-bold">
                  I&apos;m a revenue engineer. A business-first developer. A consultant who codes.
                </p>
                <p className="text-muted-foreground">
                  With 3+ years of experience, I bridge the gap between complex 
                  <span className="text-foreground font-medium"> Next.js architectures</span> and high-converting 
                  <span className="text-foreground font-medium"> HubSpot solutions</span>. 
                  I don’t just build pretty websites—I engineer high-performance platforms that drive 
                  actual growth.
                </p>
              </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              <Image
                src="/About.jpg"
                alt="About Aryan Antal"
                width={500}
                height={500}
                className="w-full  transition-all duration-500 shadow-2xl"
              />           
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent z-10"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
