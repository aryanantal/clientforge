"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
return (
    <section className="py-16 bg-foreground text-background">
    <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
            { label: "Avg Conversion Increase", value: "2.3x" },
            { label: "Avg Load Time Reduction", value: "-60%" },
            { label: "Client Revenue Growth", value: "+180%" },
            { label: "Projects Delivered", value: "50+" },
        ].map((stat, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
            >
            <div className="text-5xl md:text-6xl font-black text-accent mb-3">
                {stat.value}
            </div>
            <div className="text-sm font-bold uppercase tracking-wider opacity-90">
                {stat.label}
            </div>
            </motion.div>
        ))}
        </div>
    </div>
    </section>
);
}