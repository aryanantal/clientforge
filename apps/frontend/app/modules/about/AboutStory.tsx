"use client";

import { motion } from "framer-motion";

export default function AboutStory() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-1">
              <h2 className="text-4xl md:text-5xl font-black sticky top-32">
                THE
                <br />
                <span className="text-primary">JOURNEY</span>
              </h2>
            </div>
            <div className="lg:col-span-2 space-y-6 text-xl leading-relaxed text-muted-foreground">
              <p>
                I started building responsive, SEO-focused marketing sites, then moved into{" "}
                <span className="text-foreground font-medium">Next.js & MERN</span> product work — currently engineering the EmpKhet organic farming platform with auth, payments, and 98/100 PageSpeed targets.
              </p>
              <p>
                In parallel, I deliver{" "}
                <span className="text-foreground font-medium">HubSpot CMS</span> themes, WordPress migrations, and custom modules for enterprise clients — from healthcare and logistics to manufacturing.
              </p>
              <p>
                Today I&apos;m a{" "}
                <span className="text-foreground font-medium">Frontend Engineer & HubSpot CMS Developer</span>{" "}
                who cares as much about Core Web Vitals and clean architecture as conversion-ready UI.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-primary text-background p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 text-9xl font-black opacity-10">DIFF</div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-5xl md:text-6xl font-black mb-8">WHAT I DO DIFFERENT</h2>
              <div className="space-y-6 text-xl leading-relaxed">
                <p>
                  <span className="font-bold">I don&apos;t just ship features.</span> I ship measurable quality —
                  performance budgets, accessible UI, and maintainable code.
                </p>
                <p>
                  <span className="font-bold underline decoration-accent/50 underline-offset-4">I obsess over metrics.</span>{" "}
                  95–98+ Lighthouse scores, Core Web Vitals (LCP, CLS, INP), and clean HubSpot/Next.js architecture.
                </p>
                <p>
                  <span className="font-bold">I bridge product and CMS work.</span> Same engineer behind EmpKhet&apos;s Next.js platform and enterprise HubSpot client sites.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
