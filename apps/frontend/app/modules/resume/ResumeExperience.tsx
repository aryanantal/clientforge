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

// Default experience data
const defaultExperience: Experience[] = [
  {
    period: "Jan 2023 - Present",
    role: "Full Stack Engineer (Next.js & MERN)",
    company: "EmpBeat Services Private Limited",
    location: "Bangalore, India",
    description:
      "Leading end-to-end development of 18+ HRTech platforms focusing on scalability, user experience, and business outcomes.",
    achievements: [
      { description: "Architected and deployed scalable HRTech solutions serving 10,000+ users" },
      { description: "Reduced application load time by 60% through optimization techniques" },
      { description: "Implemented CI/CD pipelines reducing deployment time by 40%" },
      { description: "Led cross-functional teams delivering projects 20% ahead of schedule" },
    ],
  },
  {
    period: "Jan 2021 - Dec 2023",
    role: "HubSpot Developer & Technical Consultant",
    company: "Freelance / Self-Employed",
    location: "Remote",
    description:
      "Delivered HubSpot solutions for global clients, focusing on scalability, marketing automation, and lead generation.",
    achievements: [
      { description: "Completed 50+ HubSpot CMS projects for clients across 5 countries" },
      { description: "Achieved 95% client satisfaction with repeat business rate of 80%" },
      { description: "Generated 200+ qualified leads for clients through optimized websites" },
      { description: "Conducted HubSpot training for 30+ marketing teams" },
    ],
  },
  {
    period: "Jun 2020 - Dec 2021",
    role: "Front-End Developer",
    company: "Palnpine Technologies (IISP Software Pvt. Ltd.)",
    location: "Bikaner, India",
    description:
      "Created responsive, user-friendly websites using HTML, CSS, JavaScript, and React.",
    achievements: [
      { description: "Developed 20+ responsive websites with 98% cross-browser compatibility" },
      { description: "Improved mobile performance scores from 60 to 95+ (Lighthouse)" },
      { description: "Collaborated with design teams to implement pixel-perfect UI" },
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
