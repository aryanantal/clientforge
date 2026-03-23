"use client";

import { useState } from "react";
import { Send, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "@/../shared/constants/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API.BASE_URL}${API.CONTACT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showToast("Message sent successfully!", "success");
        setFormData({ name: "", email: "", company: "", message: "" });
      }
    } catch (error) {
      console.error(error);
      showToast("Something went wrong", "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left - Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="mb-12">
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  START A <span className="text-primary">PROJECT</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Tell me about your goals and I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white border-2 border-foreground focus:border-primary focus:outline-none text-lg font-bold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full px-6 py-4 bg-white border-2 border-foreground focus:border-primary focus:outline-none text-lg font-bold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                    Company / Website
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company Inc."
                    className="w-full px-6 py-4 bg-white border-2 border-foreground focus:border-primary focus:outline-none text-lg font-bold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-3">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project, goals, and timeline..."
                    rows={6}
                    className="w-full px-6 py-4 bg-white border-2 border-foreground focus:border-primary focus:outline-none text-lg font-bold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full px-8 py-6 bg-foreground text-background font-black text-xl hover:bg-primary transition-all flex items-center justify-center gap-3"
                >
                  SEND MESSAGE
                  <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </motion.div>

            {/* Toast Notification */}
            <AnimatePresence>
              {toast.show && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`fixed bottom-8 right-8 px-8 py-4 rounded-lg shadow-2xl font-bold text-lg z-50 flex items-center gap-3 ${
                    toast.type === "success"
                      ? "bg-primary text-primary-foreground"
                      : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {toast.type === "success" ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  {toast.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right - Info Blocks */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-5 space-y-8"
            >
              {/* Availability */}
              <div className="bg-secondary text-foreground p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-foreground rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold uppercase tracking-wider">
                    AVAILABLE NOW
                  </span>
                </div>
                <h3 className="text-3xl font-black mb-4">Currently Booking</h3>
                <p className="text-lg font-bold mb-6">
                  Now booking high-impact projects for 2026.
                </p>
                <div className="text-sm font-bold uppercase tracking-wider">
                  RESPONSE TIME: 24 HOURS
                </div>
              </div>

              {/* Why Work Together */}
              <div className="border-4 border-foreground p-8">
                <h3 className="text-3xl font-black mb-6">WHY WORK TOGETHER?</h3>
                <ul className="space-y-4">
                  {[
"Next.js & HubSpot Specialist",
  "ROI-focused architecture",
  "95+ Google Lighthouse scores",
  "Founder-level business insight",
  "Transparent, agile workflow",
  "Post-launch scale support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-lg font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="bg-accent text-background p-8">
                <h3 className="text-3xl font-black mb-6">WHAT HAPPENS NEXT?</h3>
                <div className="space-y-6">
                  {[
                    { step: "01", text: "Project Review (24h)" },
                    { step: "02", text: "Discovery & Strategy Call" },
                    { step: "03", text: "Technical Architecture Proposal" },
                    { step: "04", text: "Development & Scaling" },
                  ].map((phase) => (
                    <div key={phase.step} className="flex items-start gap-4">
                      <div className="text-4xl font-black opacity-50">{phase.step}</div>
                      <div className="text-lg font-bold pt-2">{phase.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
}