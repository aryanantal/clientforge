import dotenv from "dotenv";
import mongoose from "mongoose";
import Resume from "../models/Resume.js";
import Project from "../models/Project.js";
import FAQ from "../models/FAQ.js";
import Stats from "../models/Stats.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const PROFILE = {
  name: "Aryan Antal",
  title: "Frontend Engineer · Next.js & HubSpot CMS Developer",
  summary:
    "Frontend Engineer with 3+ years of experience building high-performance Next.js applications and conversion-focused HubSpot CMS websites. Specialized in custom HubSpot themes, HubL modules, Core Web Vitals optimization (95–98+ Lighthouse), and production-grade React/TypeScript interfaces. Experienced across enterprise migrations, Maka Power theme builds, and full-stack product work.",
  contactInfo: {
    email: "aryanantal2301@gmail.com",
    phone: "+91 88649 94444",
    linkedin: "https://www.linkedin.com/in/aryan-antal-74310920b",
    github: "https://github.com/aryanantal",
    location: "Noida, Uttar Pradesh, India",
  },
  isActive: true,
};

const EXPERIENCE = [
  {
    period: "May 2025 – Present",
    role: "Full Stack Engineer (Next.js & MERN)",
    company: "EmpKhet Services Pvt. Ltd.",
    location: "Remote",
    description:
      "Own frontend and full-stack delivery for a production organic farming e-commerce platform — Next.js, Node.js, MongoDB, payments, and performance optimization.",
    achievements: [
      { description: "Achieved 98/100 Google PageSpeed through SSR, image optimization, and route-level code splitting." },
      { description: "Built reusable UI architecture for auth, REST integrations, and secure checkout flows." },
      { description: "Engineered MongoDB schemas for products and transactions with optimized query performance." },
    ],
    order: 0,
    isActive: true,
  },
  {
    period: "Jan 2024 – Present",
    role: "HubSpot CMS Developer (Freelance)",
    company: "Self-Employed",
    location: "Remote",
    description:
      "Deliver custom HubSpot themes, migrations, and advanced modules for SaaS, enterprise, and service brands — concurrent with full-time product engineering.",
    achievements: [
      { description: "Shipped 10+ HubSpot CMS websites including enterprise clients in healthcare, logistics, and manufacturing." },
      { description: "Built pricing calculators, multi-step forms, and reusable module systems reducing campaign launch time by ~60%." },
      { description: "Maintained 95–98+ Lighthouse scores through Core Web Vitals discipline on shipped HubSpot pages." },
    ],
    order: 1,
    isActive: true,
  },
  {
    period: "May 2022 – Jan 2024",
    role: "Front-End Developer",
    company: "Palmspire Technologies (formerly iOSYS Software)",
    location: "Bijnor",
    description:
      "Developed responsive, SEO-optimized marketing websites and collaborated with design and marketing teams on conversion-focused UI.",
    achievements: [
      { description: "Delivered 30+ responsive websites with ~25% improvement in load times and mobile usability." },
      { description: "Conducted technical SEO audits including schema markup and metadata optimization." },
      { description: "Contributed to ~20% organic traffic growth through performance and SEO fixes." },
    ],
    order: 2,
    isActive: true,
  },
];

const STATS = [
  { label: "Projects Completed", value: "20+", order: 1 },
  { label: "HubSpot Sites Shipped", value: "10+", order: 2 },
  { label: "PageSpeed Score", value: "98+", order: 3 },
  { label: "Years Experience", value: "3+", order: 4 },
];

const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer:
      "Standard HubSpot theme or marketing site builds take 4–6 weeks. Enterprise migrations, multi-location sites, or complex Next.js applications typically span 8–12 weeks in agile weekly sprints.",
    category: "general",
    order: 0,
  },
  {
    question: "Do you work on both Next.js and HubSpot CMS?",
    answer:
      "Yes. I build production Next.js/MERN applications (currently at EmpKhet) and deliver HubSpot CMS themes, migrations, and custom modules for enterprise and mid-market clients — including healthcare, logistics, and manufacturing.",
    category: "general",
    order: 1,
  },
  {
    question: "How do you handle pricing?",
    answer:
      "Fixed pricing for defined HubSpot or Next.js projects. For ongoing HubSpot support, performance tuning, or technical consulting, I offer monthly retainers scoped to your roadmap.",
    category: "general",
    order: 2,
  },
  {
    question: "Can you optimize my existing website?",
    answer:
      "Yes. I offer Core Web Vitals audits and performance rescue passes for Next.js and HubSpot sites — targeting 95+ Lighthouse scores and measurable LCP, CLS, and INP improvements.",
    category: "general",
    order: 3,
  },
  {
    question: "Are you available for remote / contract work?",
    answer:
      "Yes. Based in Noida, India — open to remote freelance and contract engagements worldwide. Reach out via email or LinkedIn to discuss availability.",
    category: "contact",
    order: 4,
  },
];

const FEATURED_SLUGS = [
  "empkhet-organic-farming-e-commerce-platform",
  "prognos-health-hubspot-website",
  "odw-logistics-maka-power-theme",
  "rj-lee-group-enterprise-migration",
  "contegix-wordpress-to-hubspot-migration",
  "north-coast-container-maka-power-theme",
];

async function syncStats() {
  for (const stat of STATS) {
    await Stats.findOneAndUpdate(
      { label: stat.label },
      { ...stat, isActive: true },
      { upsert: true, new: true },
    );
  }
}

async function syncFaqs() {
  await FAQ.deleteMany({});
  await FAQ.insertMany(FAQS.map((f) => ({ ...f, isActive: true })));
}

async function syncResume(featuredIds) {
  let resume = await Resume.findOne();
  if (!resume) {
    resume = new Resume({ profile: PROFILE, experience: EXPERIENCE, featuredProjects: featuredIds });
  } else {
    resume.profile = { ...resume.profile.toObject?.() ?? resume.profile, ...PROFILE };
    resume.experience = EXPERIENCE;
    resume.featuredProjects = featuredIds;
  }
  await resume.save();
  return resume;
}

async function main() {
  await connectDB();

  const featuredProjects = await Project.find({ slug: { $in: FEATURED_SLUGS } }).select("_id slug title");
  const featuredIds = FEATURED_SLUGS.map(
    (slug) => featuredProjects.find((p) => p.slug === slug)?._id,
  ).filter(Boolean);

  await syncStats();
  await syncFaqs();
  const resume = await syncResume(featuredIds);

  console.log("Site alignment complete");
  console.log("Profile:", resume.profile.title);
  console.log("Email:", resume.profile.contactInfo.email);
  console.log("Featured projects:", featuredProjects.map((p) => p.slug).join(", "));
  console.log("Stats:", STATS.length, "FAQs:", FAQS.length);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
