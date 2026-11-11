import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { ProjectMeta } from "~/lib/content.server";

export function FeaturedProject({ project }: { project: ProjectMeta }) {
  return (
    <section className="mt-16" aria-labelledby="spotlight">
      <div className="from-brand/10 to-brand/0 rounded-xl border bg-gradient-to-br p-6 sm:p-8">
        <p className="text-brand text-sm font-medium">Featured project</p>
        <h2 id="spotlight" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.title}
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
          {project.summary}
        </p>
        {project.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to={`/projects/${project.slug}`}>
              Read the case study <ArrowRight />
            </Link>
          </Button>
          {project.demo && (
            <Button asChild variant="outline">
              <a href={project.demo}>
                <ExternalLink /> Try it live
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
