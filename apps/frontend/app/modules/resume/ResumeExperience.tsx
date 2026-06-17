import { Badge, Briefcase } from "lucide-react";

interface Achievement {
  description: string;
}

interface Experience {
  _id?: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: Achievement[];
  order?: number;
  isActive?: boolean;
}

interface ResumeExperienceProps {
  experience: Experience[];
}

// Fallback only when API returns no experience — matches resume PDF / MongoDB seed
const defaultExperience: Experience[] = [
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
  },
  {
    period: "Jan 2024 – Present",
    role: "HubSpot CMS Developer (Freelance)",
    company: "Self-Employed",
    location: "Remote",
    description:
      "Deliver custom HubSpot themes, migrations, and advanced modules for SaaS, enterprise, and service brands.",
    achievements: [
      { description: "Shipped 10+ HubSpot CMS websites including enterprise clients in healthcare, logistics, and manufacturing." },
      { description: "Built pricing calculators, multi-step forms, and reusable module systems reducing campaign launch time by ~60%." },
      { description: "Maintained 95–98+ Lighthouse scores through Core Web Vitals discipline on shipped HubSpot pages." },
    ],
  },
  {
    period: "May 2022 – Jan 2024",
    role: "Front-End Developer",
    company: "Palmspire Technologies (formerly iOSys Software)",
    location: "Bijnor",
    description:
      "Developed responsive, SEO-optimized marketing websites and collaborated with design and marketing teams on conversion-focused UI.",
    achievements: [
      { description: "Delivered 30+ responsive websites with ~25% improvement in load times and mobile usability." },
      { description: "Conducted technical SEO audits including schema markup and metadata optimization." },
      { description: "Contributed to ~20% organic traffic growth through performance and SEO fixes." },
    ],
  },
];

export default function ResumeExperience({ experience }: ResumeExperienceProps) {
  const displayExperience = experience && experience.length > 0 ? experience : defaultExperience;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {displayExperience.map((job, index) => (
              <div key={index} className="p-6 md:p-8 hover:border-primary transition-all duration-300 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="flex flex-col md:flex-row md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{job.role}</h3>
                    <p className="text-primary font-medium mb-1">{job.company}</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                  <div
                      className="border border-primary text-foreground p-1 rounded-sm h-max hover:bg-accent hover:text-accent-foreground"
                    >
                    {job.period}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{job.description}</p>

                <ul className="space-y-2">
                  {job.achievements.map((a, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>{a.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
