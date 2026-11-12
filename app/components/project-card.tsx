import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import type { ProjectMeta } from "~/lib/content.server";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <div>
      <Link
        to={`/projects/${project.slug}`}
        className="group hover:bg-accent/60 focus-visible:ring-ring -mx-3 block rounded-lg px-3 py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="group-hover:text-brand font-medium tracking-tight">{project.title}</h3>
          {project.year && (
            <span className="text-muted-foreground shrink-0 text-sm tabular-nums">{project.year}</span>
          )}
        </div>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{project.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {project.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </Link>
    </div>
  );
}
