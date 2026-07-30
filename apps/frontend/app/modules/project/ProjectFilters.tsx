"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
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

interface FilterDropdownProps<T extends string> {
  id: string;
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

function FilterDropdown<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div className="flex flex-col gap-2" ref={rootRef}>
      <label
        htmlFor={id}
        className="text-xs font-black uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="project-filter-trigger w-full flex items-center justify-between gap-3 px-4 py-3 font-black uppercase tracking-wider text-sm bg-background border-2 border-foreground text-foreground hover:bg-muted transition-all text-left"
        >
          <span className="truncate">{selected?.label ?? "Select"}</span>
          <ChevronDown
            className={`w-4 h-4 shrink-0 text-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-labelledby={id}
            className="project-filter-menu absolute z-50 left-0 right-0 top-[calc(100%+4px)] max-h-64 overflow-y-auto border-2 border-foreground bg-card shadow-[4px_4px_0_0_var(--foreground)]"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm font-bold uppercase tracking-wide transition-colors ${
                      isSelected
                        ? "bg-foreground text-background"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function ProjectFilters({
  platform,
  setPlatform,
  technology,
  setTechnology,
  search,
  setSearch,
  technologyOptions,
}: ProjectFiltersProps) {
  const platformOptions = PLATFORM_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const techOptions = [
    { value: "all", label: "All Technologies" },
    ...technologyOptions.map((tag) => ({ value: tag, label: tag })),
  ];

  return (
    <div className="sticky top-20 z-40 bg-background border-b-4 border-foreground py-5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] gap-4 items-end">
          <FilterDropdown
            id="platform-filter"
            label="Platform"
            value={platform}
            options={platformOptions}
            onChange={setPlatform}
          />

          <FilterDropdown
            id="technology-filter"
            label="Technology"
            value={technology}
            options={techOptions}
            onChange={setTechnology}
          />

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
                className="project-filter-search w-full pl-11 pr-4 py-3 font-bold text-sm bg-background border-2 border-foreground text-foreground placeholder:text-muted-foreground placeholder:font-bold placeholder:uppercase placeholder:tracking-wide focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:bg-muted/40 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
