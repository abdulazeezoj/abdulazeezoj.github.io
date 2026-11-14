import { useState } from "react";
import { ProjectCard } from "~/components/project-card";
import { Button } from "~/components/ui/button";
import { getOrderedProjects } from "~/lib/content.server";
import type { Route } from "./+types/projects";

export function loader() {
  return { projects: getOrderedProjects() };
}

export const meta: Route.MetaFunction = () => [
  { title: "Projects — Abdulazeez Jimoh" },
  {
    name: "description",
    content: "Client and product work written up as case studies, plus open-source projects.",
  },
];

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  const tags = [...new Set(projects.flatMap((p) => p.tags))].sort();
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;
  const groups = [
    { title: "Client and product work", items: shown.filter((p) => p.kind === "case-study") },
    { title: "Open source and personal projects", items: shown.filter((p) => p.kind === "public") },
  ].filter((g) => g.items.length > 0);

  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tight">Projects</h1>
      <p className="text-muted-foreground mt-3 max-w-xl">
        Client and product work is written up as case studies: the problem,
        what I built and how. Open-source projects link to their code.
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

      <div aria-live="polite">
        {groups.map((g) => (
          <section key={g.title} className="mt-10" aria-labelledby={`g-${g.title}`}>
            <h2 id={`g-${g.title}`} className="font-display text-2xl font-medium tracking-tight">
              {g.title}
            </h2>
            <div className="divide-border mt-2 divide-y">
              {g.items.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
