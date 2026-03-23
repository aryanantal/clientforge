"use client";

import { motion } from "framer-motion";

const numbersData = [
            { label: "PageSpeed Score", value: "96/100" },
            { label: "Increase in Session Duration", value: "20%" },
            { label: "Query Optimization", value: "100ms" },
            { label: "Websites Delivered", value: "30+" },
];

export default function AboutNumbers() {
  return (

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-4 border-foreground p-12 md:p-16"
    >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <h2 className="text-5xl font-black mb-12">
        BY THE <span className="text-primary">NUMBERS</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {numbersData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-5xl md:text-6xl font-black text-primary mb-2">{stat.value}</div>
            <div className="text-sm font-bold uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.div>
  );
}
