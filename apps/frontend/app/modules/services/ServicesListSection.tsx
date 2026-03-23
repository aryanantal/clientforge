"use client";

import Link from "next/link";
import { Code2, Rocket, Zap, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "../../../../shared/constants";

export default function ServicesListSection() {
const services = [
  {
    icon: <Code2 className="w-16 h-16" />,
    title: "Next.js & Full Stack",
    tagline: "High-performance architectures",
    description:
      "I build production-ready applications focusing on speed and scalability. Using the Next.js App Router, TypeScript, and MERN stack, I ensure your tech stack is a growth asset, not a bottleneck.",
    deliverables: [
      "Next.js App Router Architecture",
      "TypeScript & Secure API Design",
      "Dynamic Dashboard Development",
      "Database Modeling (MongoDB/SQL)",
      "Vercel & AWS Deployment",
    ],
    color: "bg-primary text-background",
  },
  {
    icon: <Rocket className="w-16 h-16" />,
    title: "HubSpot Development",
    tagline: "The CRM-first Web Experience",
    description:
      "Stop using generic templates. I build custom, high-converting HubSpot themes and HubL modules that give your marketing team full control while maintaining elite performance.",
    deliverables: [
      "Custom HubL Theme Development",
      "Complex Custom Modules",
      "CRM & Operations Hub Logic",
      "Design-to-HubSpot Migration",
      "Advanced Marketing Automation",
    ],
    color: "bg-secondary text-foreground",
  },
  {
    icon: <Zap className="w-16 h-16" />,
    title: "Technical SEO & Speed",
    tagline: "Because every 100ms costs money",
    description:
      "I specialize in passing Core Web Vitals. I audit and refactor existing sites to reduce TBT and LCP, directly improving your search rankings and lowering your bounce rates.",
    deliverables: [
      "Core Web Vitals Optimization",
      "Render-blocking Asset Removal",
      "Image & Font Strategy",
      "Technical SEO Infrastructure",
      "Ongoing Performance Monitoring",
    ],
    color: "bg-foreground text-background",
  },
  {
    icon: <TrendingUp className="w-16 h-16" />,
    title: "Growth Consulting",
    tagline: "ROI-driven tech strategy",
    description:
      "I don't just take orders; I consult. I help founders choose the right tools and build the right funnels to ensure their digital product actually generates a return.",
    deliverables: [
      "Conversion Funnel Audit",
      "Tech-Stack ROI Analysis",
      "A/B Testing Frameworks",
      "Analytics & Event Tracking",
      "Product Strategy Roadmap",
    ],
    color: "bg-accent text-background ",
  }
];
  return (
    <section className="pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Number - Large */}
                <div className="lg:col-span-2">
                  <div className="text-9xl font-black text-muted-foreground opacity-20">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-10">
                  <div className={`${service.color} p-12 md:p-16 relative overflow-hidden`}>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 opacity-10 text-9xl font-black">
                      {service.icon}
                    </div>

                    <div className="relative z-10">
                      <div className="mb-8">
                        {service.icon}
                      </div>

                      <div className="space-y-4 mb-8">
                        <h2 className="text-5xl md:text-6xl font-black leading-tight">
                          {service.title}
                        </h2>
                        <p className="text-2xl font-bold italic">{service.tagline}</p>
                      </div>

                      <p className="text-xl leading-relaxed mb-12 max-w-2xl">
                        {service.description}
                      </p>

                      {/* Deliverables */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {service.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                            <span className="text-lg font-bold">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="pt-8 border-t-2 border-current">
                        <Link
                          href={`${ROUTES.CONTACT}`}
                          className={`group px-8 py-4 font-black text-lg inline-flex items-center gap-3 transition-all ${
                            service.color.includes("text-background")
                              ? "bg-background text-foreground hover:bg-primary hover:text-background"
                              : "bg-foreground text-background hover:bg-background hover:text-foreground"
                          }`}
                        >
                          GET STARTED
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
