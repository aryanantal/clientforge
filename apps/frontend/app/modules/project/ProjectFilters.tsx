import { Filter } from "lucide-react";

interface ProjectFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters: string[];
}

export default function ProjectFilters({ activeFilter, setActiveFilter, filters }: ProjectFiltersProps) {
  return (
    <div className="sticky top-20 z-40 bg-background border-b-4 border-foreground py-4">
      <div className="container w-full mx-full px-6 lg:px-12">
        {/* Mobile Dropdown */}
        <div className="md:hidden flex items-center gap-3">
          <Filter className="w-5 h-5 flex-shrink-0 text-foreground" />
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-2 font-black uppercase w-full tracking-wider text-sm bg-background border-2 border-foreground text-foreground focus:bg-foreground focus:text-background transition-all"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <Filter className="w-5 h-5 flex-shrink-0 text-foreground" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 font-black uppercase tracking-wider whitespace-nowrap transition-all text-sm ${
                activeFilter === filter
                  ? "bg-foreground text-background"
                  : "border-2 border-foreground text-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}