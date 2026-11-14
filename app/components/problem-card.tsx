import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { Screenshot } from "~/components/screenshot";
import type { ProjectMeta } from "~/lib/content.server";
import { cn } from "~/lib/utils";

export function ProblemCard({ project }: { project: ProjectMeta }) {
  return (
    <li className="py-8 first:pt-2">
      <div className="grid gap-5 sm:grid-cols-5 sm:gap-8">
        <div className="sm:col-span-3">
          <h3 className="font-display text-2xl font-medium tracking-tight">{project.title}</h3>
          <dl className="mt-3 space-y-3 leading-relaxed">
            <div>
              <dt className="text-muted-foreground text-sm font-medium">The problem</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt className="text-brand text-sm font-medium">What I built</dt>
              <dd>{project.solution}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link
              to={`/projects/${project.slug}`}
              className="text-foreground hover:text-brand font-medium underline underline-offset-4"
            >
              Read the case study
            </Link>
            {project.demo && (
              <a
                href={project.demo}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 underline-offset-4 hover:underline"
              >
                Try it live <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        <Screenshot
          project={project}
          className={cn(
            "order-first sm:order-last sm:col-span-2",
            project.image ? "aspect-video" : "aspect-[4/3]",
          )}
        />
      </div>
    </li>
  );
}
