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

export default function StatsSection() {
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
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="h-12 bg-background/20 rounded mb-3 w-24 mx-auto"></div>
                <div className="h-4 bg-background/20 rounded w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat._id}
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