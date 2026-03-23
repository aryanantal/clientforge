"use client";

import Link from "next/dist/client/link";
import { FileText, AlertCircle, CheckCircle2, Scale } from "lucide-react";
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

export default function Terms() {
  const sections: Section[] = [
    {
      icon: <CheckCircle2 className="w-10 h-10" />,
      title: "Acceptance of Terms",
      content: [
        {
          text: "By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.",
        },
        {
          text: "These terms apply to all visitors, users, and others who access or use the website.",
        },
        {
          text: "These terms are governed by and construed in accordance with the laws of Uttar Pradesh, India, without regard to its conflict of law principles.",
        },
      ],
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Website Usage",
      content: [
        {
          subtitle: "Permitted Use",
          text: "You may view, download, and print content from this website for personal, non-commercial use only. You must retain all copyright and proprietary notices.",
        },
        {
          subtitle: "Intellectual Property Rights",
          text: "Unless otherwise stated, all code snippets, design patterns, and case study content are the intellectual property of Aryan Antal. You may not reproduce or sell these materials without express written consent.",
        },
        {
          subtitle: "Prohibited Use",
          text: "You may not: (a) modify or copy website materials, (b) use materials for commercial purposes, (c) attempt to reverse engineer any software, (d) remove copyright notices, or (e) transfer materials to another person.",
        },
        {
          subtitle: "User Conduct",
          text: "You agree not to use the website for any unlawful purpose or in any way that could damage, disable, or impair the website.",
        },
      ],
    },
    {
      icon: <Scale className="w-10 h-10" />,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Ownership",
          text: "All content on this website, including text, graphics, logos, images, code, and design, is the property of Aryan (the website owner) and is protected by copyright and trademark laws.",
        },
        {
          subtitle: "Portfolio Work",
          text: "Case studies and project examples displayed are for demonstration purposes. Client work shown with permission. All trademarks and brand names belong to their respective owners.",
        },
        {
          subtitle: "Your Content",
          text: "By submitting content (e.g., contact forms, comments), you grant me a non-exclusive license to use, reproduce, and display that content solely for the purpose of providing services.",
        },
      ],
    },
    {
      icon: <AlertCircle className="w-10 h-10" />,
      title: "Service Terms",
      content: [
        {
          subtitle: "Project Agreements",
          text: "Any development or consulting services are subject to separate written agreements. These website terms do not constitute a service contract.",
        },
        {
          subtitle: "Availability",
          text: "Information about services, pricing, and availability is subject to change. I reserve the right to accept or decline projects at my discretion.",
        },
        {
          subtitle: "No Guarantees",
          text: "While I strive for excellence, I make no guarantees about specific results or outcomes. Performance metrics shown are examples and not guarantees of future results.",
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
              Terms of <span className="text-primary">Service</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground leading-relaxed max-w-3xl font-bold">
              The rules and guidelines for using this website.
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
              These Terms of Service govern your use of this website. By using this website, you
              agree to these terms in full. If you disagree with any part of these terms, you
              must not use this website.
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
                      {item.subtitle && (
                        <h3 className="text-2xl font-black text-foreground">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-lg leading-relaxed text-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-6 mb-12">
              <div className="text-secondary">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black">Disclaimers & Limitations</h2>
            </div>

            <div className="space-y-8 pl-0 md:pl-16">
              <div>
                <h3 className="text-2xl font-black mb-4">No Warranties</h3>
                <p className="text-lg leading-relaxed">
                  This website and its content are provided &quot;as is&quot; without warranties of any
                  kind, either express or implied. I do not warrant that the website will be
                  uninterrupted, timely, secure, or error-free.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">No Guarantee of Results</h3>
                <p className="text-lg leading-relaxed">
                  While our services are designed to optimize conversions and performance, we do not guarantee specific financial outcomes or revenue increases. Business results depend on numerous external factors beyond our technical implementation. Marketing language such as &quot;makes money&quot; or &quot;money machine&quot; refers to our optimization approach and past client outcomes, not guaranteed future results.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">Limitation of Liability</h3>
                <p className="text-lg leading-relaxed">
                  To the maximum extent permitted by law, I shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages resulting from your use
                  of this website.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">Accuracy of Information</h3>
                <p className="text-lg leading-relaxed">
                  While I strive to ensure information accuracy, I make no guarantees about the
                  completeness, reliability, or accuracy of website content. Portfolio metrics and
                  case studies are examples and not guarantees of future results.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">Third-Party Links</h3>
                <p className="text-lg leading-relaxed">
                  This website may contain links to third-party websites. I have no control over
                  and assume no responsibility for the content, privacy policies, or practices of
                  third-party sites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8">
              External Links & Resources
            </h2>

            <div className="bg-white border-4 border-foreground p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground mb-8 font-bold">
                This website may include links to external websites and resources for your
                convenience and information.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="font-black text-xl mb-2 text-foreground">No Endorsement</div>
                  <p className="text-lg text-foreground">
                    Links to third-party sites do not constitute an endorsement of their content,
                    products, or services.
                  </p>
                </div>

                <div>
                  <div className="font-black text-xl mb-2 text-foreground">
                    Third-Party Responsibility
                  </div>
                  <p className="text-lg text-foreground">
                    I am not responsible for the content, accuracy, or practices of linked
                    third-party websites.
                  </p>
                </div>

                <div>
                  <div className="font-black text-xl mb-2 text-foreground">Use at Your Risk</div>
                  <p className="text-lg text-foreground">
                    Accessing third-party links is at your own risk. Review their terms and
                    privacy policies before engaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Changes & Termination */}
      <section className="py-24 bg-accent text-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-12">
              Changes, Termination & Governing Law
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background border-4 border-foreground p-6">
                <div className="font-black text-2xl mb-4 text-foreground">Changes to Terms</div>
                <p className="text-base leading-relaxed text-foreground">
                  I reserve the right to modify these terms at any time. Changes will be posted
                  with an updated date. Continued use constitutes acceptance.
                </p>
              </div>

              <div className="bg-background border-4 border-foreground p-6">
                <div className="font-black text-2xl mb-4 text-foreground">Termination</div>
                <p className="text-base leading-relaxed text-foreground">
                  I may terminate or suspend access to the website immediately, without notice,
                  for conduct that violates these terms or is harmful to others.
                </p>
              </div>

              <div className="bg-background border-4 border-foreground p-6">
                <div className="font-black text-2xl mb-4 text-foreground">Governing Law</div>
                <p className="text-base leading-relaxed text-foreground">
                  These terms are governed by the laws of Uttar Pradesh, India. Any dispute arising from these terms shall first be attempted to be resolved through informal mediation before proceeding to the courts of Noida/Gautam Buddha Nagar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indemnification */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8">
              Indemnification
            </h2>
            <p className="text-lg leading-relaxed text-foreground font-bold">
              You agree to indemnify and hold harmless Aryan (the website owner) from any claims,
              damages, losses, liabilities, and expenses (including legal fees) arising from your
              use of the website or violation of these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Severability */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8">
              Severability & Entire Agreement
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-foreground mb-4">Severability</h3>
                <p className="text-lg leading-relaxed text-foreground">
                  If any provision of these terms is found to be invalid or unenforceable, the
                  remaining provisions shall remain in full force and effect.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-foreground mb-4">Entire Agreement</h3>
                <p className="text-lg leading-relaxed text-foreground">
                  These Terms of Service, together with the Privacy Policy, constitute the entire
                  agreement between you and me regarding the use of this website.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-foreground mb-4">No Waiver</h3>
                <p className="text-lg leading-relaxed text-foreground">
                  Failure to enforce any right or provision of these terms shall not constitute a
                  waiver of such right or provision.
                </p>
              </div>
            </div>
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
              <FileText className="w-16 h-16 mx-auto mb-6 text-secondary" />
            </div>

            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Questions About<br />
              <span className="text-secondary">These Terms?</span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 font-bold">
              If you have questions about these Terms of Service, reach out anytime.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href={`${ROUTES.CONTACT}`}
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-background text-foreground font-black text-xl hover:bg-secondary transition-all"
              >
                CONTACT ME
              </Link>
              <Link
                href={`${ROUTES.PRIVACY}`}
                className="inline-flex items-center justify-center gap-3 px-12 py-6 border-4 border-background font-black text-xl hover:bg-background hover:text-foreground transition-all"
              >
                PRIVACY POLICY
              </Link>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}