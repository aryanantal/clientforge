"use client";

import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import { motion } from "framer-motion";
import Link from "next/dist/client/link";
import { useEffect, useState, useRef } from "react";
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

export default function ProjectSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.PROJECTS}`);
      const data = await res.json();
      if (data.success) {
        setProjects(data.data.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const handleSliderWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const scrollContainer = e.currentTarget;
    const atStart = scrollContainer.scrollLeft <= 0;
    const atEnd =
      scrollContainer.scrollLeft + scrollContainer.clientWidth >=
      scrollContainer.scrollWidth - 2;

    // Smooth, user-dependent speed
    const multiplier = Math.min(8, Math.max(2, Math.abs(e.deltaY) / 2));

    if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY * multiplier;
    }
  };

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p>No projects available.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects-section"
      className="py-12 md:py-16 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <div className="py-4">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
              Real Results
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Before → After
            </h2>
            <p className="text-lg text-foreground">
              Client problems turned into measurable wins
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide horizontal-scroll pb-6"
            style={{
              scrollBehavior: "smooth",
              cursor: "grab",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
            onWheel={handleSliderWheel}
          >
            <div
              className="flex gap-6 px-6 lg:px-12"
              style={{ width: "max-content" }}
            >
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white border-4 border-foreground hover:shadow-2xl transition-all w-[550px] md:w-[580px] flex-shrink-0"
                >
                  <Link href={`/case-study/${project.slug}`}>
                    <div className="aspect-[16/6] overflow-hidden bg-muted relative">
                      <ImageWithFallback
                        src={
                          (project.images?.[0] || "").startsWith("http")
                            ? project.images?.[0] || ""
                            : `${API.BASE_URL}${project.images?.[0] || ""}`
                        }
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-foreground text-background px-4 py-2 font-black text-2xl">
                        {project.metric}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-black uppercase tracking-wider px-3 py-1.5 bg-primary text-background">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-black mb-3 text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* Before / After */}
                      <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b-2 border-muted">
                        <div>
                          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">
                            Before
                          </div>
                          <div className="font-black text-base text-foreground">
                            {project.before}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase text-primary mb-1">
                            After
                          </div>
                          <div className="font-black text-base text-primary">
                            {project.after}
                          </div>
                        </div>
                      </div>

                      {/* Problem → Solution */}
                      <div className="space-y-3 mb-5">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                            ❌ Problem
                          </div>
                          <p className="text-xs font-bold text-foreground">
                            {project.problem}
                          </p>
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                            ✅ Solution
                          </div>
                          <p className="text-xs font-bold text-foreground">
                            {project.solution}
                          </p>
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
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-6">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              ← Scroll to see more projects →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
