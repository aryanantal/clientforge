"use client";

import { motion } from "framer-motion";

export default function ServicesFAQSection() {
  const faqs = [
            {
            q: "What is your typical project timeline?",
            a: "Standard website builds take 4-6 weeks. Complex Next.js applications or custom HubSpot theme developments usually span 8-12 weeks, working in agile 1-week sprints.",
            },
            {
            q: "Do you only work with tech startups?",
            a: "While I love the pace of startups, I also partner with established businesses (like agri-tech and service firms) looking to modernize their stack for better performance.",
            },
            {
            q: "How do you handle pricing?",
            a: "I provide value-based fixed pricing for defined projects. For ongoing technical consulting or HubSpot management, I offer monthly performance retainers.",
            },
            {
            q: "Can you optimize my existing website?",
            a: "Yes. I offer performance audits and 'Speed Sprints' specifically for Next.js and HubSpot sites to improve Core Web Vitals and Lighthouse scores.",
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
