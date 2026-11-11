import { useState } from "react";
import { ProjectCard } from "~/components/project-card";
import { Button } from "~/components/ui/button";
import { getProjects } from "~/lib/content.server";
import type { Route } from "./+types/projects";

export function loader() {
  return { projects: getProjects() };
}

export const meta: Route.MetaFunction = () => [
  { title: "Projects — Abdulazeez Jimoh" },
  {
    name: "description",
    content: "Things I've built: open-source projects and private case studies.",
  },
];

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  const tags = [...new Set(projects.flatMap((p) => p.tags))].sort();
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="text-muted-foreground mt-3 max-w-xl">
        Open-source work links to its code. Private and client work is written
        up as a case study: what the problem was, what I built and how.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        <Button
          size="sm"
          variant={tag === null ? "default" : "outline"}
          aria-pressed={tag === null}
          onClick={() => setTag(null)}
        >
          All
        </Button>
        {tags.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={tag === t ? "default" : "outline"}
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="divide-border mt-6 divide-y" aria-live="polite">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
