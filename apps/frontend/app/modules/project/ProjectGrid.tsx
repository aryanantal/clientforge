import { motion } from "framer-motion";
import Link from "next/link";
import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import { API } from "@/../shared/constants/api";

interface Project {
  _id: string;
  id: number;
  slug?: string;
  title: string;
  category: string;
  before: string;
  after: string;
  metric: string;
  problem: string;
  solution: string;
  images?: string[];
  image?: string;
  tags: string[];
}

interface ProjectGridProps {
  projects: Project[];
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProjectGrid({ projects, visibleCount, setVisibleCount }: ProjectGridProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleCount).map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white border-4 border-foreground hover:shadow-2xl transition-all"
            >
              <Link href={`/projects/${project.slug || project.id}`}>
                <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                  <ImageWithFallback
                    src={
                      (project.images?.[0] || "").startsWith("http")
                        ? project.images?.[0] || ""
                        : `${API.BASE_URL}${project.images?.[0] || ""}`
                    }
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* <div className="absolute top-4 right-4 bg-foreground text-background px-4 py-2 font-black text-2xl">
                    {project.metric}
                  </div> */}
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1.5 bg-primary text-background">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black mb-4 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Before / After */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b-2 border-muted">
                    <div>
                      <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Before</div>
                      <div className="font-black text-lg text-foreground">{project.before}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-primary mb-1">After</div>
                      <div className="font-black text-lg text-primary">{project.after}</div>
                    </div>
                  </div>

                  {/* Problem → Solution */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        ❌ Problem
                      </div>
                      <p className="text-sm font-bold text-foreground">{project.problem}</p>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                        ✅ Solution
                      </div>
                      <p className="text-sm font-bold text-foreground">{project.solution}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 bg-muted text-foreground font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Load More/Less Buttons */}
        {projects.length > 12 && (
          <div className="flex justify-center gap-6 mt-12">
            {visibleCount < projects.length && (
              <button
                onClick={() => setVisibleCount((prev: number) => Math.min(prev + 4, projects.length))}
                className="px-8 py-4 bg-foreground text-background font-black text-lg hover:bg-primary transition-all"
              >
                LOAD MORE
              </button>
            )}
            {visibleCount > 12 && (
              <button
                onClick={() => setVisibleCount(12)}
                className="px-8 py-4 border-4 border-foreground text-foreground font-black text-lg hover:bg-foreground hover:text-background transition-all"
              >
                LOAD LESS
              </button>
            )}
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-32">
            <div className="text-8xl font-black text-muted-foreground mb-6">0</div>
            <p className="text-2xl font-bold text-foreground">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}