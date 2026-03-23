"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Zap, Coffee } from "lucide-react";

const skillsData = [
  {
    icon: <Code2 className="w-12 h-12" />,
    title: "Frontend Mastery",
    // Adding SSR/ISR and specific Next.js features
    skills: ["Next.js (App Router/SSR)", "React & TypeScript", "Tailwind CSS & SCSS", "Framer Motion", "Core Web Vitals Audit"],
    color: "bg-primary text-background",
  },
  {
    icon: <Rocket className="w-12 h-12" />,
    title: "Backend & APIs",
    // Mentioning the specific MERN stack and secure auth
    skills: ["Node.js & Express", "MongoDB & Mongoose", "RESTful APIs & JWT", "Server-Side Rendering", "Payment Gateways (Stripe)"],
    color: "bg-secondary text-foreground",
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "HubSpot Specialist",
    // Mentioning HubL and Custom Modules—the high-value stuff
    skills: ["HubL & Custom Modules", "Design-to-HubSpot CMS", "Advanced Theme Architecture", "CRM & API Integration", "Lead Gen Optimization"],
    color: "bg-accent",
  },
  {
    icon: <Coffee className="w-12 h-12" />,
    title: "Business Skills",
    // Aligning with your "Revenue Engineer" branding
    skills: ["Conversion Rate Opt. (CRO)", "Technical SEO Strategy", "Strategic Consulting", "Project Management", "Agile Development"],
    color: "bg-foreground text-background",
  },
];

export default function AboutSkills() {
  return (
        <section className="py-24 relative overflow-hidden">

    <div className="space-y-12">
              <div className="container mx-auto px-6 lg:px-12 relative z-10">

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-5xl font-black mb-4">
          SKILLS & <span className="text-secondary">EXPERTISE</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-10">The tools I use to build revenue machines</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`${skill.color} p-8`}
          >
            {skill.icon}
            <h3 className="text-2xl font-black my-4">{skill.title}</h3>
            <ul className="space-y-2">
              {skill.skills.map((item) => (
                <li key={item} className="flex items-center gap-2 font-bold">
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
    </section>
  );
}
