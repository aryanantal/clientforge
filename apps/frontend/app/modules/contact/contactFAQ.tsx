"use client";

import { motion } from "framer-motion";


export default function ContactFAQ() {


return (
<section className="py-32 bg-primary text-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
        >
        <div className="mb-16">
            <div className="text-sm font-bold uppercase tracking-wider  text-foreground mb-4">
            [ FAQS ]
            </div>
            <h2 className="text-5xl md:text-7xl font-black">
            QUICK <span className="text-foreground">ANSWERS</span>
            </h2>
        </div>

        <div className="space-y-8">
            {[
            {
                q: "How long does a typical project take?",
                a: "4-12 weeks depending on scope. I work in 1-week sprints with regular updates.",
            },
            {
                q: "Do you work with startups?",
                a: "Absolutely. I specialize in helping startups ship fast. MVP development is my sweet spot.",
            },
            {
                q: "What's your pricing model?",
                a: "Flexible: fixed-price for defined projects, hourly for ongoing work, or monthly retainers.",
            },
            {
                q: "Do you offer ongoing support?",
                a: "Yes. All projects include 30 days of support. I also offer monthly retainer packages.",
            },
            ].map((faq, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b-2 border-background/20 pb-6"
            >
                <h3 className="text-2xl font-black opacity-50 mb-3">{faq.q}</h3>
                <p className="text-lg  leading-relaxed">{faq.a}</p>
            </motion.div>
            ))}
        </div>
        </motion.div>
    </div>
    </section>
);
}