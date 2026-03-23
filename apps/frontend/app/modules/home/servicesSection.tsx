"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Rocket, TrendingUp, Zap } from "lucide-react";
import Link from "next/dist/client/link";
import { ROUTES } from "../../../../shared/constants/routes";

export default function ServicesSection() {
return (
      <section className="py-24 md:py-32 bg-muted relative">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
              What I Do
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              Services That Make<br />An <span className="text-primary">Impact</span>
            </h2>
          </motion.div>

          {/* Overlapping Cards Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            {[
              {
                icon: Code2,
                title: "Full Stack Development",
                description: "React, Next.js, TypeScript. Modern tech that actually scales.",
                metrics: ["Next.js", "Node.js", "MongoDB", "TypeScript"],
              },
              {
                icon: Rocket,
                title: "HubSpot CMS Development",
                description: "Custom themes and modules that turn your CMS into a lead machine.",
                metrics: ["+250% Leads", "Seamless CRM", "Marketing Auto"],
              },
              {
                icon: Zap,
                title: "Performance Optimization",
                description: "Core Web Vitals. SEO. Speed that converts.",
                metrics: ["-60% Load Time", "+40% Lower Bounce", "Google ❤️"],
              },
              {
                icon: TrendingUp,
                title: "Conversion Optimization",
                description: "Data-driven UX improvements. A/B testing. Revenue growth.",
                metrics: ["2.3x Conversions", "UX Research", "A/B Testing"],
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-background border-4 border-foreground p-10 hover:shadow-2xl transition-all group ${
                    index % 2 === 0 ? 'lg:-rotate-1' : 'lg:rotate-1'
                  } hover:rotate-0 hover:scale-105`}
                  style={{ zIndex: 4 - index }}
                >
                  <Icon className="w-16 h-16 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-black mb-4 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {service.metrics.map((metric, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-muted text-foreground font-black text-sm"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href={`${ROUTES.SERVICES}`}
              className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background font-black text-lg hover:bg-primary transition-all"
            >
              VIEW ALL SERVICES
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      );
}