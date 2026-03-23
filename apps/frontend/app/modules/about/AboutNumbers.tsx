"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API } from "@/../shared/constants/api";

interface StatItem {
  _id: string;
  label: string;
  value: string;
  order: number;
}

export default function AboutNumbers() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API.BASE_URL}${API.STATS}`);
        const data = await res.json();
        
        if (data.success && data.data.length > 0) {
          setStats(data.data);
        } else {
          // Default fallback stats if none in database
          setStats([
            { _id: "1", label: "Projects Completed", value: "10+", order: 0 },
            { _id: "2", label: "Happy Clients", value: "5+", order: 1 },
            { _id: "3", label: "PageSpeed Score", value: "96/100", order: 2 },
            { _id: "4", label: "Years Experience", value: "3+", order: 3 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Default fallback stats on error
        setStats([
          { _id: "1", label: "Projects Completed", value: "10+", order: 0 },
          { _id: "2", label: "Happy Clients", value: "5+", order: 1 },
          { _id: "3", label: "PageSpeed Score", value: "96/100", order: 2 },
          { _id: "4", label: "Years Experience", value: "3+", order: 3 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="h-12 bg-foreground/20 rounded mb-2 w-24 mx-auto"></div>
                <div className="h-4 bg-foreground/20 rounded w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

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
          {stats.map((stat, index) => (
            <motion.div
              key={stat._id}
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
