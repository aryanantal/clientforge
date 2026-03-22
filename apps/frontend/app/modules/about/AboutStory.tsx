"use client";

import { motion } from "framer-motion";

export default function AboutStory() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                Started as a curious teenager breaking WordPress themes. Evolved into a full-stack
                engineer who&apos;s obsessed with web performance and conversion optimization.
              </p>
              <p>
                <span className="text-foreground font-bold">Along the way, I discovered something:</span>{" "}
                Most developers build what clients ask for. I build what makes clients money.
              </p>
              <p>
                Today, I specialize in high-performance React applications, HubSpot CMS
                implementations, and conversion-focused web experiences that actually move the
                needle.
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
                  <span className="font-bold">I obsess over metrics.</span> Core Web Vitals,
                  conversion rates, bounce rates — I track everything that matters.
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
