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
  {
    _id: "5",
    question: "Are you available for remote / contract work?",
    answer:
      "Yes. Based in Noida, India — open to remote freelance and contract engagements worldwide. Reach out via email or LinkedIn to discuss availability.",
    category: "contact",
    order: 4,
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