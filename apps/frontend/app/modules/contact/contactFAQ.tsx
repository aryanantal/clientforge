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