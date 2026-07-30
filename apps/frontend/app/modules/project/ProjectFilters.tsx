"use client";

import { Search } from "lucide-react";
import {
  PLATFORM_OPTIONS,
  type PlatformFilter,
} from "./projectFilterUtils";

interface ProjectFiltersProps {
  platform: PlatformFilter;
  setPlatform: (value: PlatformFilter) => void;
  technology: string;
  setTechnology: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  technologyOptions: string[];
}

const selectClassName =
  "w-full px-4 py-3 font-bold text-sm bg-background border-2 border-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer";

export default function ProjectFilters({
  platform,
  setPlatform,
  technology,
  setTechnology,
  search,
  setSearch,
  technologyOptions,
}: ProjectFiltersProps) {
  return (
    <div className="sticky top-20 z-40 bg-background border-b-4 border-foreground py-5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] gap-4 items-end">
          {/* Platform */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="platform-filter"
              className="text-xs font-black uppercase tracking-wider text-muted-foreground"
            >
              Platform
            </label>
            <select
              id="platform-filter"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformFilter)}
              className={selectClassName}
            >
              {PLATFORM_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Technology */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="technology-filter"
              className="text-xs font-black uppercase tracking-wider text-muted-foreground"
            >
              Technology
            </label>
            <select
              id="technology-filter"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              className={selectClassName}
            >
              <option value="all">All Technologies</option>
              {technologyOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="project-search"
              className="text-xs font-black uppercase tracking-wider text-muted-foreground"
            >
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                id="project-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, tags, clients..."
                className="w-full pl-11 pr-4 py-3 font-bold text-sm bg-background border-2 border-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
