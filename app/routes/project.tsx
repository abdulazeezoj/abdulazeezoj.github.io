import { ArrowLeft, ExternalLink } from "lucide-react";
import { data, Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { GithubIcon } from "~/components/github-icon";
import { Button } from "~/components/ui/button";
import { getProject } from "~/lib/content.server";
import type { Route } from "./+types/project";

export async function loader({ params }: Route.LoaderArgs) {
  const project = await getProject(params.slug);
  if (!project) throw data("Not found", { status: 404 });
  return project;
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  loaderData
    ? [
        { title: `${loaderData.meta.title} — Abdulazeez Jimoh` },
        { name: "description", content: loaderData.meta.summary },
        { property: "og:title", content: loaderData.meta.title },
        { property: "og:description", content: loaderData.meta.summary },
      ]
    : [];

export default function Project({ loaderData }: Route.ComponentProps) {
  const { meta, html } = loaderData;
  return (
    <article>
      <Link
        to="/projects"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        {meta.title}
      </h1>
      <p className="text-muted-foreground mt-3 text-lg">{meta.summary}</p>

      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="text-muted-foreground">Year</dt>
        <dd>{meta.year}</dd>
        {meta.role && (
          <>
            <dt className="text-muted-foreground">Role</dt>
            <dd>{meta.role}</dd>
          </>
        )}
        {meta.stack.length > 0 && (
          <>
            <dt className="text-muted-foreground">Stack</dt>
            <dd className="flex flex-wrap gap-1.5">
              {meta.stack.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </dd>
          </>
        )}
        <dt className="text-muted-foreground">Code</dt>
        <dd>{meta.kind === "public" ? "Open source" : "Private — case study only"}</dd>
      </dl>

      {(meta.repo || meta.demo) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {meta.repo && (
            <Button asChild>
              <a href={meta.repo}>
                <GithubIcon /> View source
              </a>
            </Button>
          )}
          {meta.demo && (
            <Button asChild variant="outline">
              <a href={meta.demo}>
                <ExternalLink /> Live demo
              </a>
            </Button>
          )}
        </div>
      )}

      <div
        className="prose prose-neutral dark:prose-invert mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
