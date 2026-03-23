import { Badge, Code } from "lucide-react";

interface Skill {
  name: string;
}

interface SkillCategory {
  _id?: string;
  category: string;
  skills: Skill[];
  order?: number;
  isActive?: boolean;
}

interface ResumeSkillsProps {
  skills: SkillCategory[];
}

// Default skills data
const defaultSkills: Record<string, string[]> = {
  "Frontend Development": ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3", "Responsive Design"],
  "Backend Development": ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"],
  "HubSpot Ecosystem": ["HubSpot CMS", "HubL", "CRM Integration", "Marketing Hub", "Custom Modules", "API Integration"],
  "Tools & DevOps": ["Git & GitHub", "Docker", "Vercel", "AWS", "CI/CD", "Figma", "VS Code"],
  "Soft Skills": ["Client Communication", "Project Management", "Agile/Scrum", "Technical Writing", "Problem Solving"],
};

export default function ResumeSkills({ skills }: ResumeSkillsProps) {
  // If we have skills from API, use them; otherwise use defaults
  let displaySkills: Record<string, string[]>;
  
  if (skills && skills.length > 0) {
    displaySkills = {};
    skills.forEach((category) => {
      displaySkills[category.category] = category.skills.map(s => s.name);
    });
  } else {
    displaySkills = defaultSkills;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
          <Code className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Technical Skills</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(displaySkills).map(([category, items], index) => (
              <div key={index} className="p-6 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
              <h3 className="font-bold mb-4">{category}</h3>

              <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                      <div
                      key={skill}
                      className="bg-primary text-background rounded-sm p-1 h-max border-transparent hover:bg-secondary/90"
                      >
                          {skill}
                  </div>
                  ))}
              </div>
              </div>
          ))}
          </div>
      </div>
      </div>
  </section>
  );
}
