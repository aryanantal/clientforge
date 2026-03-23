"use client";

import Link from "next/dist/client/link";
import { Shield, Lock, Eye, Database, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "../../../shared/constants";

interface ContentItem {
  subtitle?: string;
  text: string;
}

interface Section {
  icon: React.ReactNode;
  title: string;
  content: ContentItem[];
}

export default function Privacy() {
  const sections: Section[] = [
    {
      icon: <Database className="w-10 h-10" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Information You Provide",
          text: "When you contact me through forms or email, I collect your name, email address, company information, and any details you share about your project. If you contact us via our website forms, your data may be stored and processed within the HubSpot CRM ecosystem to facilitate communication and service delivery.",
        },
        {
          subtitle: "Automatic Information",
          text: "I collect basic analytics data including your IP address, browser type, device information, and pages visited to improve the website experience.",
        },
      ],
    },
    {
      icon: <Lock className="w-10 h-10" />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Communication",
          text: "Your contact information is used solely to respond to your inquiries and discuss potential project collaborations.",
        },
        {
          subtitle: "Analytics",
          text: "Anonymous usage data helps me understand how visitors interact with the site and identify areas for improvement.",
        },
        {
          subtitle: "Technical Optimization",
          text: "We may use anonymized traffic data to run A/B tests and performance audits (e.g., Core Web Vitals monitoring) to improve the website experience.",
        },
        {
          subtitle: "Marketing",
          text: "If you subscribe to my newsletter, I'll send occasional updates about new projects, insights, and availability. You can unsubscribe anytime.",
        },
      ],
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Data Sharing & Disclosure",
      content: [
        {
          subtitle: "No Selling",
          text: "I never sell, rent, or trade your personal information to third parties. Your data is yours.",
        },
        {
          subtitle: "Service Providers",
          text: "I use trusted third-party services (hosting, analytics, email) that may process your data on my behalf. All are GDPR-compliant.",
        },
        {
          subtitle: "Legal Requirements",
          text: "I may disclose information if required by law or to protect my rights and safety.",
        },
      ],
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You can request a copy of all data I have about you at any time.",
        },
        {
          subtitle: "Correction & Deletion",
          text: "You can update or delete your information by contacting me directly.",
        },
        {
          subtitle: "Opt-Out",
          text: "You can unsubscribe from communications and request removal from all marketing lists.",
        },
      ],
    },
  ];

  return (
    <div className="w-full pt-24 bg-background">
      {/* Hero */}
      <section className="py-24 md:py-32 border-b-4 border-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="inline-block mb-8 px-5 py-3 bg-foreground text-background font-black uppercase tracking-wider text-sm">
              Legal
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-10 text-foreground">
              Privacy <span className="text-primary">Policy</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground leading-relaxed max-w-3xl font-bold">
              Your privacy matters. Here&apos;s how I handle your data.
            </p>

            <div className="mt-8 text-sm font-bold text-muted-foreground">
              Last Updated: March 23, 2026
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-lg leading-relaxed text-foreground font-bold">
              This privacy policy explains how I collect, use, and protect your personal
              information when you visit this website or engage with my services. I&apos;m committed
              to transparency and protecting your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-24">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-8"
              >
                {/* Section Header */}
                <div className="flex items-start gap-6 pb-6 border-b-4 border-foreground">
                  <div className="text-primary flex-shrink-0">{section.icon}</div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground">
                    {section.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div className="space-y-8 pl-0 md:pl-16">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="text-2xl font-black text-foreground">
                        {item.subtitle}
                      </h3>
                      <p className="text-lg leading-relaxed text-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies Section */}
      <section className="py-24 bg-accent text-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-6 mb-12">
              <div className="text-foreground">
                <Database className="w-10 h-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black">Cookies & Tracking</h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed pl-0 md:pl-16">
              <p className="font-bold">
                This website uses minimal cookies to function properly and understand usage
                patterns.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="font-black text-xl mb-2">Essential Cookies</div>
                  <p>Required for the website to function (session management, security).</p>
                </div>

                <div>
                  <div className="font-black text-xl mb-2">Analytics & Tracking</div>
                  <p>
                    We use Google Analytics for traffic insights and HubSpot Tracking Pixels to understand how visitors interact with our content and services.
                  </p>
                </div>

                <div>
                  <div className="font-black text-xl mb-2">Your Choice</div>
                  <p>
                    You can disable non-essential cookies in your browser settings. Essential
                    cookies cannot be disabled without affecting site functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-6 mb-12">
              <div className="text-secondary">
                <Lock className="w-10 h-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black">Data Security</h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed pl-0 md:pl-16">
              <p className="font-bold">
                I take reasonable measures to protect your personal information from unauthorized
                access, disclosure, alteration, or destruction. Our website is hosted on Vercel, providing enterprise-grade security, SSL encryption, and a global Edge Network to keep your data safe.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[
                  { label: "SSL Encryption", desc: "All data transmitted is encrypted" },
                  { label: "Secure Hosting", desc: "Hosted on trusted, secure platforms" },
                  { label: "Access Controls", desc: "Limited access to personal data" },
                  { label: "Regular Updates", desc: "Security patches applied promptly" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-2 border-background p-6 hover:bg-primary hover:text-foreground transition-all"
                  >
                    <div className="font-black text-xl mb-2">{item.label}</div>
                    <p className="text-base">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-base text-muted-foreground">
                Note: No method of transmission over the internet is 100% secure. While I strive
                to protect your information, I cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-12">
              Third-Party Services
            </h2>

            <div className="bg-white border-4 border-foreground p-8 md:p-12">
              <p className="text-lg mb-8 font-bold text-foreground">
                This website may use the following third-party services:
              </p>

              <div className="space-y-6">
                {[
                  {
                    service: "Analytics",
                    purpose: "Google Analytics (or similar) for anonymous usage tracking",
                  },
                  {
                    service: "Hosting",
                    purpose: "Vercel/Netlify for website hosting and CDN services",
                  },
                  {
                    service: "Email",
                    purpose: "Email service providers for communications and newsletters",
                  },
                  {
                    service: "Forms",
                    purpose: "Form processing services for contact submissions",
                  },
                ].map((item) => (
                  <div key={item.service} className="flex gap-4 items-start">
                    <div className="font-black text-lg text-primary min-w-[120px]">
                      {item.service}:
                    </div>
                    <div className="text-lg text-foreground">{item.purpose}</div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-base text-muted-foreground">
                Each third-party service has its own privacy policy. I recommend reviewing their
                policies for more information about how they handle data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Children's Privacy */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8">
              Children&apos;s Privacy
            </h2>
            <p className="text-lg leading-relaxed text-foreground font-bold">
              This website is not directed at children under 13. I do not knowingly collect
              personal information from children. If you believe a child has provided personal
              information, please contact me immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8">
              Changes to This Policy
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-6 font-bold">
              I may update this privacy policy from time to time. Changes will be posted on this
              page with an updated &quot;Last Updated&quot; date. Significant changes will be communicated
              via email if you&apos;re subscribed to my newsletter.
            </p>
            <p className="text-base text-muted-foreground">
              Continued use of the website after changes constitutes acceptance of the updated
              policy.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-primary text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <Mail className="w-16 h-16 mx-auto mb-6 text-secondary" />
            </div>

            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Questions About<br />
              <span className="text-secondary">Your Privacy?</span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 font-bold">
              If you have questions or concerns about this privacy policy or how your data is
              handled, get in touch.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href={`${ROUTES.CONTACT}`}
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-background text-foreground font-black text-xl hover:bg-secondary transition-all"
              >
                CONTACT ME
              </Link>
              <Link
                href={`${ROUTES.HOME}`}
                className="inline-flex items-center justify-center gap-3 px-12 py-6 border-4 border-background font-black text-xl hover:bg-background hover:text-foreground transition-all"
              >
                BACK HOME
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}