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
    answer:
      "Standard HubSpot theme or marketing site builds take 4–6 weeks. Enterprise migrations, multi-location sites, or complex Next.js applications typically span 8–12 weeks in agile weekly sprints.",
    category: "general",
    order: 0,
    isActive: true,
  },
  {
    _id: "2",
    question: "Do you work on both Next.js and HubSpot CMS?",
    answer:
      "Yes. I build production Next.js/MERN applications (currently at EmpKhet) and deliver HubSpot CMS themes, migrations, and custom modules for enterprise and mid-market clients.",
    category: "general",
    order: 1,
    isActive: true,
  },
  {
    _id: "3",
    question: "How do you handle pricing?",
    answer:
      "Fixed pricing for defined HubSpot or Next.js projects. For ongoing HubSpot support, performance tuning, or technical consulting, I offer monthly retainers scoped to your roadmap.",
    category: "general",
    order: 2,
    isActive: true,
  },
  {
    _id: "4",
    question: "Can you optimize my existing website?",
    answer:
      "Yes. I offer Core Web Vitals audits and performance rescue passes for Next.js and HubSpot sites — targeting 95+ Lighthouse scores and measurable LCP, CLS, and INP improvements.",
    category: "general",
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
