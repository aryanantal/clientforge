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
    category: "contact",
    order: 0,
    isActive: true,
  },
  {
    _id: "2",
    question: "Do you only work with tech startups?",
    answer: "While I love the pace of startups, I also partner with established businesses (like agri-tech and service firms) looking to modernize their stack for better performance.",
    category: "contact",
    order: 1,
    isActive: true,
  },
  {
    _id: "3",
    question: "How do you handle pricing?",
    answer: "I provide value-based fixed pricing for defined projects. For ongoing technical consulting or HubSpot management, I offer monthly performance retainers.",
    category: "contact",
    order: 2,
    isActive: true,
  },
  {
    _id: "4",
    question: "Can you optimize my existing website?",
    answer: "Yes. I offer performance audits and 'Speed Sprints' specifically for Next.js and HubSpot sites to improve Core Web Vitals and Lighthouse scores.",
    category: "contact",
    order: 3,
    isActive: true,
  },
];

export default function ContactFAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        // Fetch all FAQs and filter to show contact + general
        const res = await fetch(`${API.BASE_URL}${API.FAQS}`);
        const data = await res.json();

        if (data.success && data.data && data.data.length > 0) {
          // Filter to show only 'contact' and 'general' categories, then sort by order
          const filteredFAQs = data.data
            .filter((faq: FAQItem) => faq.category === 'contact' || faq.category === 'general')
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
      <section className="py-32 bg-primary text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-16">
              <div className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                [ FAQS ]
              </div>
              <h2 className="text-5xl md:text-7xl font-black">
                QUICK <span className="text-foreground">ANSWERS</span>
              </h2>
            </div>

            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border-b-2 border-background/20 pb-6 animate-pulse">
                  <div className="h-6 bg-background/20 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-background/20 rounded w-full"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

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
            <div className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              [ FAQS ]
            </div>
            <h2 className="text-5xl md:text-7xl font-black">
              QUICK <span className="text-foreground">ANSWERS</span>
            </h2>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b-2 border-background/20 pb-6"
              >
                <h3 className="text-2xl font-black opacity-50 mb-3">{faq.question}</h3>
                <p className="text-lg leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}