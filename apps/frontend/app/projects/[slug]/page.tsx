"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Clock, Zap } from "lucide-react";
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

export default function ProjectDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('Page loaded with slug:', slug);

  useEffect(() => {
    const fetchProject = async () => {
      const apiUrl = 'http://localhost:5000';
      console.log('Fetching project with slug:', slug);
      console.log('API URL:', `${apiUrl}${API.PROJECTS}/${slug}`);
      try {
        const res = await fetch(`${apiUrl}${API.PROJECTS}/${slug}`);
        const data = await res.json();
        console.log('API Response:', data);
        if (data.success) {
          setProject(data.data);
        } else {
          console.log('API returned success: false');
          // router.push('/projects');
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        // router.push('/projects');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    } else {
      console.log('No slug provided');
      router.push('/projects');
    }
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/projects" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Create metrics from project data
  const metrics = [
    { label: "Before", value: project.before, icon: <Clock className="w-5 h-5" /> },
    { label: "After", value: project.after, icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Key Metric", value: project.metric, icon: <Zap className="w-5 h-5" /> },
  ];

  const projectImage = project.images?.[0] || project.image || "";

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-12 mt-24 md:py-16 bg-gradient-to-br from-background via-muted to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full mb-4">{project.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <ImageWithFallback
                  src={
                    projectImage.startsWith("http")
                      ? projectImage
                      : `http://localhost:5000${projectImage}`
                  }
                  alt={project.title}
                  className="rounded-3xl w-full h-auto max-h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 md:py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="p-6 bg-background/10 border border-background/20 text-center rounded-lg">
                <div className="flex justify-center mb-3 text-primary">
                  {metric.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm text-background/70">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem, Solution */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-16">
            {/* Problem */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center text-destructive font-bold text-xl">
                  01
                </div>
                <h2 className="text-3xl font-bold">The Problem</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                  02
                </div>
                <h2 className="text-3xl font-bold">The Solution</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      {project.images && project.images.length > 1 && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Project Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.slice(1).map((image, index) => (
                <div key={image} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <ImageWithFallback
                    src={
                      image.startsWith("http")
                        ? image
                        : `http://localhost:5000${image}`
                    }
                    alt={`Project image ${index + 2}`}
                    className="rounded-2xl w-full h-auto max-h-80 object-cover relative"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-accent to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Similar Projects?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Let&apos;s discuss how I can help you achieve your business goals with a
              high-performance web solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors text-lg font-medium">
                Start Your Project
              </Link>
              <Link href="/projects" className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-md hover:bg-white hover:text-foreground transition-colors text-lg font-medium">
                <ArrowLeft className="mr-2 w-4 h-4" /> View More Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}