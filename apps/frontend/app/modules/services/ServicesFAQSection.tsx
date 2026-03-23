"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API } from "@/../shared/constants/api";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

const defaultFAQs: FAQItem[] = [
  {
    _id: "1",
    question: "What is your typical project timeline?",
    answer: "Standard website builds take 4-6 weeks. Complex Next.js applications or custom HubSpot theme developments usually span 8-12 weeks, working in agile 1-week sprints.",
    category: "services",
    order: 0,
    isActive: true,
  },
  {
    _id: "2",
    question: "Do you only work with tech startups?",
    answer: "While I love the pace of startups, I also partner with established businesses (like agri-tech and service firms) looking to modernize their stack for better performance.",
    category: "services",
    order: 1,
    isActive: true,
  },
  {
    _id: "3",
    question: "How do you handle pricing?",
    answer: "I provide value-based fixed pricing for defined projects. For ongoing technical consulting or HubSpot management, I offer monthly performance retainers.",
    category: "services",
    order: 2,
    isActive: true,
  },
  {
    _id: "4",
    question: "Can you optimize my existing website?",
    answer: "Yes. I offer performance audits and 'Speed Sprints' specifically for Next.js and HubSpot sites to improve Core Web Vitals and Lighthouse scores.",
    category: "services",
    order: 3,
    isActive: true,
  },
];

export default function ServicesFAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        // Fetch all FAQs and filter to show services + general
        const res = await fetch(`${API.BASE_URL}${API.FAQS}`);
        const data = await res.json();

        if (data.success && data.data && data.data.length > 0) {
          // Filter to show only 'services' and 'general' categories, then sort by order
          const filteredFAQs = data.data
            .filter((faq: FAQItem) => faq.category === 'services' || faq.category === 'general')
            .sort((a: FAQItem, b: FAQItem) => a.order - b.order);
          setFaqs(filteredFAQs.length > 0 ? filteredFAQs : defaultFAQs);
        } else {
          // Default fallback FAQs
          setFaqs(defaultFAQs);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        // Default fallback FAQs on error
        setFaqs(defaultFAQs);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
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
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border-b-2 border-foreground pb-8 animate-pulse">
                  <div className="h-8 bg-muted/20 rounded mb-4 w-3/4"></div>
                  <div className="h-6 bg-muted/20 rounded w-full"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

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
                key={faq._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b-2 border-foreground pb-8"
              >
                <h3 className="text-2xl md:text-3xl font-black mb-4">{faq.question}</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
