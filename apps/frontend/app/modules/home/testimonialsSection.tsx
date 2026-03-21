"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/dist/client/link";

export default function TestimonialsSection() {
return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
              Don&apos;t Take My Word
            </h2>
            <p className="text-xl text-foreground">
              Listen to the clients whose businesses I grew
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "2.3x conversion increase in 8 weeks. The ROI was insane.",
                name: "Sarah Chen",
                role: "CEO, TechStart",
              },
              {
                quote: "Lead quality jumped 80% overnight. Best investment we made.",
                name: "Michael Rodriguez",
                role: "CMO, GrowthCo",
              },
              {
                quote: "60% faster = 40% lower bounce rate. Numbers don't lie.",
                name: "Emily Park",
                role: "Founder, StartupXYZ",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-4 border-foreground p-8 hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg font-bold mb-6 text-foreground leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="border-t-2 border-muted pt-4">
                  <div className="font-black text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors"
            >
              Read All Testimonials
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
);
}