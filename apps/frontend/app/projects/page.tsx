"use client";

import { useEffect, useState, useMemo } from "react";
import { API } from "@/../shared/constants/api";
import ProjectHero from "../modules/project/ProjectHero";
import ProjectFilters from "../modules/project/ProjectFilters";
import ProjectGrid, { INITIAL_VISIBLE_COUNT } from "../modules/project/ProjectGrid";
import ProjectCTA from "../modules/project/ProjectCTA";
import {
  collectTechnologyOptions,
  filterProjects,
  type PlatformFilter,
} from "../modules/project/projectFilterUtils";

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
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [technology, setTechnology] = useState("all");
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const technologyOptions = useMemo(
    () => collectTechnologyOptions(projects),
    [projects],
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [platform, technology, search]);

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

  const filteredProjects = useMemo(
    () => filterProjects(projects, platform, technology, search),
    [projects, platform, technology, search],
  );

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
        platform={platform}
        setPlatform={setPlatform}
        technology={technology}
        setTechnology={setTechnology}
        search={search}
        setSearch={setSearch}
        technologyOptions={technologyOptions}
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
