export type PlatformFilter =
  | "all"
  | "hubspot"
  | "module"
  | "theme"
  | "squarespace"
  | "website";

export const PLATFORM_OPTIONS: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "All Platforms" },
  { value: "hubspot", label: "HubSpot" },
  { value: "module", label: "Modules" },
  { value: "theme", label: "Themes" },
  { value: "squarespace", label: "Squarespace" },
  { value: "website", label: "Websites" },
];

interface FilterableProject {
  slug?: string;
  title: string;
  category: string;
  before: string;
  after: string;
  problem: string;
  solution: string;
  tags: string[];
}

export function getProjectPlatform(project: FilterableProject): PlatformFilter {
  const category = project.category.toLowerCase();
  const slug = (project.slug ?? "").toLowerCase();
  const tags = project.tags.map((tag) => tag.toLowerCase());

  if (
    category.includes("marketplace module") ||
    slug.includes("hubspot-module") ||
    project.title.toLowerCase().includes("marketplace module")
  ) {
    return "module";
  }

  if (
    category.includes("theme") ||
    slug.includes("theme") ||
    project.title.toLowerCase().includes("theme")
  ) {
    return "theme";
  }

  if (tags.includes("squarespace") || category.includes("squarespace")) {
    return "squarespace";
  }

  if (tags.includes("hubspot") || category.includes("hubspot")) {
    return "hubspot";
  }

  return "website";
}

export function filterProjects<T extends FilterableProject>(
  projects: T[],
  platform: PlatformFilter,
  technology: string,
  search: string,
): T[] {
  const query = search.trim().toLowerCase();

  return projects.filter((project) => {
    if (platform !== "all" && getProjectPlatform(project) !== platform) {
      return false;
    }

    if (
      technology !== "all" &&
      !project.tags.some((tag) => tag.toLowerCase() === technology.toLowerCase())
    ) {
      return false;
    }

    if (!query) return true;

    const haystack = [
      project.title,
      project.category,
      project.before,
      project.after,
      project.problem,
      project.solution,
      ...project.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function collectTechnologyOptions(projects: FilterableProject[]): string[] {
  const tags = new Set<string>();
  for (const project of projects) {
    for (const tag of project.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}
