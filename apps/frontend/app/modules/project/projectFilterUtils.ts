export type PlatformFilter =
  | "all"
  | "fullstack"
  | "website"
  | "theme"
  | "design"
  | "squarespace"
  | "module";

export const PLATFORM_OPTIONS: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "All Platforms" },
  { value: "fullstack", label: "Full Stack" },
  { value: "website", label: "Websites" },
  { value: "theme", label: "Themes" },
  { value: "design", label: "Design" },
  { value: "squarespace", label: "Squarespace" },
  { value: "module", label: "Modules" },
];

const DESIGN_SLUGS = new Set(["aura-theme-hubspot-marketplace"]);
const THEME_SLUGS = new Set(["euphoria-theme-hubspot-marketplace"]);
const FULLSTACK_SLUGS = new Set([
  "empkhet-organic-farming-e-commerce-platform",
  "iot-smart-farming-dashboard",
]);

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

  if (DESIGN_SLUGS.has(slug) || category.includes("figma design")) {
    return "design";
  }

  if (THEME_SLUGS.has(slug) || category.includes("marketplace theme")) {
    return "theme";
  }

  if (tags.includes("squarespace") || category.includes("squarespace")) {
    return "squarespace";
  }

  if (FULLSTACK_SLUGS.has(slug) || category.includes("full stack")) {
    return "fullstack";
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
