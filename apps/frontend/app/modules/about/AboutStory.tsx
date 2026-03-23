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
                I started by architecting high-performance <span className="text-foreground font-medium">Next.js & MERN</span> applications. That journey led me to founding <span className="text-foreground font-medium text-primary">EmpKhet</span>, where I engineered a full-scale DTC ecosystem from the ground up—prioritizing speed, accessibility, and actual sales.
              </p>
              <p>
                <span className="text-foreground font-bold italic">Along the way, I discovered a gap:</span>{" "}
                Most developers build what looks good on a portfolio. I build what looks good on a <span className="text-foreground font-bold">Balance Sheet</span>.
              </p>
              <p>
                Today, I’m a <span className="text-foreground font-medium">HubSpot Developer & Technical Consultant</span> who speaks the language of marketing and ROI. I help businesses bridge the gap between complex backend logic and pixel-perfect, high-converting frontends.
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
                  <span className="font-bold">I don&apos;t just ship features.</span> I ship outcomes.
                  Every line of code is written with business goals in mind.
                </p>
                <p>
                  <span className="font-bold underline decoration-accent/50 underline-offset-4">I obsess over metrics.</span>{" "}
                  98/100 Lighthouse scores, Core Web Vitals (LCP, CLS, INP), and conversion funnels—I audit and optimize the numbers that directly impact your bottom line.
                </p>
                <p>
                  <span className="font-bold">I speak business first, tech second.</span> Because
                  stakeholders care about ROI, not your tech stack.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
