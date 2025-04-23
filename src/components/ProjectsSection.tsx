
import React, { useState, useMemo } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft } from "lucide-react";

const ALL_TAG = "All";

function uniqueTags(projects: any[]) {
  const set = new Set<string>();
  projects.forEach(p => p.tags.forEach((tag: string) => set.add(tag)));
  return [ALL_TAG, ...Array.from(set)];
}

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "title", label: "Title A-Z" },
  { value: "status", label: "Status" }
];

export const ProjectsSection: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filterTag, setFilterTag] = useState<string>(ALL_TAG);
  const [sortBy, setSortBy] = useState<string>("default");

  // Filtering & sorting logic
  const filtered = useMemo(() => {
    let arr = [...projectsData];
    if (filterTag !== ALL_TAG) {
      arr = arr.filter((p) => p.tags.includes(filterTag));
    }
    if (query) {
      arr = arr.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (sortBy === "title") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "status") {
      arr.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortBy === "default") {
      arr.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    return arr;
  }, [query, filterTag, sortBy]);

  const tags = uniqueTags(projectsData);

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <h2 className="text-3xl font-bold mb-1">Projects</h2>
          <p className="text-gray-400 text-lg">Showcase your real estate projects, share updates in real time, and collaborate across teams with ease.</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Input
            type="text"
            placeholder="Search projects..."
            className="max-w-xs bg-background/70 border border-white/8 text-gray-200 focus:border-blue-400 focus:ring-blue-500"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select
            className="rounded-md py-2 px-3 bg-background/80 text-gray-200 border border-white/10 focus:border-blue-400 focus:ring-2"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            {sortOptions.map(opt => <option value={opt.value} key={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>
      <div className="pb-6">
        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <Button
              key={tag}
              variant={filterTag === tag ? "default" : "secondary"}
              size="sm"
              className={`rounded-full transition-all border-none ${filterTag === tag ? "shadow-[0_0_10px_2px_rgba(51,195,240,0.26)] bg-blue-700 text-white" : "bg-background/70 text-blue-200 hover:bg-blue-950/70"}`}
              onClick={() => setFilterTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">No projects found.</p>
          ) : (
            filtered.map(project => <ProjectCard key={project.id} project={project} />)
          )}
        </div>
      </div>
    </section>
  );
};
