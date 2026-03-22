import { Badge, Briefcase } from "lucide-react";

  const experience = [
    {
      period: "Jan 2023 - Present",
      role: "Full Stack Engineer (Next.js & MERN)",
      company: "EmpBeat Services Private Limited",
      location: "Bangalore, India",
      description:
        "Leading end-to-end development of 18+ HRTech platforms focusing on scalability, user experience, and business outcomes.",
      achievements: [
        "Architected and deployed scalable HRTech solutions serving 10,000+ users",
        "Reduced application load time by 60% through optimization techniques",
        "Implemented CI/CD pipelines reducing deployment time by 40%",
        "Led cross-functional teams delivering projects 20% ahead of schedule",
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
        "Completed 50+ HubSpot CMS projects for clients across 5 countries",
        "Achieved 95% client satisfaction with repeat business rate of 80%",
        "Generated 200+ qualified leads for clients through optimized websites",
        "Conducted HubSpot training for 30+ marketing teams",
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
        "Developed 20+ responsive websites with 98% cross-browser compatibility",
        "Improved mobile performance scores from 60 to 95+ (Lighthouse)",
        "Collaborated with design teams to implement pixel-perfect UI",
      ],
    },
  ];

export default function ExperienceSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {experience.map((job, index) => (
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
                      <span>{a}</span>
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