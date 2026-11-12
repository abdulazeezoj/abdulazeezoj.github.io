import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import type { ProjectMeta } from "~/lib/content.server";

export function ProblemCard({ project }: { project: ProjectMeta }) {
  return (
    <li className="py-6 first:pt-2">
      <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
      <dl className="mt-3 space-y-3 text-[0.95rem] leading-relaxed">
        <div>
          <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">The problem</dt>
          <dd>{project.problem}</dd>
        </div>
        <div>
          <dt className="text-brand text-xs font-medium tracking-wide uppercase">What I built</dt>
          <dd>{project.solution}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <Link
          to={`/projects/${project.slug}`}
          className="text-foreground hover:text-brand inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
        >
          Read the case study <ArrowRight className="size-4" />
        </Link>
        {project.demo && (
          <a
            href={project.demo}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 underline-offset-4 hover:underline"
          >
            Try it live <ExternalLink className="size-4" />
          </a>
        )}
      </div>
    </li>
  );
}
