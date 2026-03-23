import { FolderOpen } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "../../../../shared/constants/routes";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  tags?: string[];
}

interface ResumeProjectsProps {
  projects: Project[];
}

export default function ResumeProjects({ projects }: ResumeProjectsProps) {
  // Only show if there are projects
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <FolderOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.slice(0, 6).map((project) => (
              <div 
                key={project._id} 
                className="p-6 bg-card text-card-foreground flex flex-col gap-4 rounded-xl border hover:border-primary transition-all duration-300"
              >
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {project.description}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-primary text-background px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link 
                  href={`${ROUTES.PROJECTS}/${project.slug}`}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  View Project →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
