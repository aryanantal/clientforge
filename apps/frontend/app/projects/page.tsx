"use client";

import { useEffect, useState, useMemo } from "react";
import { API } from "@/../shared/constants/api";
import ProjectHero from "../modules/project/ProjectHero";
import ProjectFilters from "../modules/project/ProjectFilters";
import ProjectGrid from "../modules/project/ProjectGrid";
import ProjectCTA from "../modules/project/ProjectCTA";

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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.category)));
  }, [projects]);

  const filters = ["All", ...categories];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeFilter]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.PROJECTS}`);
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  if (loading) {
    return (
      <div className="w-full pt-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center py-32">
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background">
      <ProjectHero />
      <ProjectFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filters={filters}
      />
      <ProjectGrid 
        projects={filteredProjects} 
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
      />
      <ProjectCTA />
    </div>
  );
}