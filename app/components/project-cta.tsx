import { Mail } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { contactHref } from "~/lib/site";

export function ProjectCta({ next }: { next: { slug: string; title: string; summary: string } | null }) {
  return (
    <aside className="mt-16 rounded-xl border p-6 sm:p-8" aria-labelledby="cta-title">
      <h2 id="cta-title" className="font-display text-2xl font-medium tracking-tight">
        Have a similar problem?
      </h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        Tell me what you're trying to solve, or the idea you want built.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button asChild>
          <a href={contactHref}>
            <Mail /> Tell me about your project
          </a>
        </Button>
        <span className="text-muted-foreground flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Available for remote contract work
        </span>
      </div>
      {next && (
        <div className="mt-8 border-t pt-5">
          <p className="text-muted-foreground text-sm">Next project</p>
          <Link to={`/projects/${next.slug}`} className="group mt-1 block">
            <span className="group-hover:text-brand font-medium underline-offset-4 group-hover:underline">
              {next.title}
            </span>
            <span className="text-muted-foreground block text-sm">{next.summary}</span>
          </Link>
        </div>
      )}
    </aside>
  );
}
