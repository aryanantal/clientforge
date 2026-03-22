"use client";

import { motion } from "framer-motion";

export default function ServicesFAQSection() {
  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Most projects range from 4-12 weeks depending on scope. I work in 1-week sprints with regular updates.",
    },
    {
      q: "Do you work with startups?",
      a: "Absolutely. I specialize in helping startups ship fast and scale smart. MVP development is my sweet spot.",
    },
    {
      q: "What's your availability?",
      a: "I take on 2-3 projects at a time to ensure quality. Currently booking 3-4 weeks out.",
    },
    {
      q: "Do you offer ongoing support?",
      a: "Yes. All projects include 30 days of support. I also offer monthly retainer packages for ongoing optimization.",
    },
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-16">
            COMMON <span className="text-secondary">QUESTIONS</span>
          </h2>

          <div className="space-y-12">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b-2 border-foreground pb-8"
              >
                <h3 className="text-2xl md:text-3xl font-black mb-4">{faq.q}</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
