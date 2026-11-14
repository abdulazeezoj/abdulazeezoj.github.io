import { ArrowLeft } from "lucide-react";
import { data, Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { getPost } from "~/lib/content.server";
import { formatDate } from "~/lib/format";
import type { Route } from "./+types/post";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug);
  if (!post) throw data("Not found", { status: 404 });
  return post;
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  loaderData
    ? [
        { title: `${loaderData.meta.title} — Abdulazeez Jimoh` },
        { name: "description", content: loaderData.meta.summary },
        { property: "og:type", content: "article" },
        { property: "og:title", content: loaderData.meta.title },
        { property: "og:description", content: loaderData.meta.summary },
        { property: "article:published_time", content: loaderData.meta.date },
      ]
    : [];

export default function Post({ loaderData }: Route.ComponentProps) {
  const { meta, html } = loaderData;
  return (
    <article>
      <Link
        to="/blog"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="size-4" /> All posts
      </Link>
      <h1 className="font-display mt-6 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
        {meta.title}
      </h1>
      <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <time dateTime={meta.date}>{formatDate(meta.date)}</time>
        <span aria-hidden>·</span>
        <span>{meta.readingMinutes} min read</span>
        {meta.tags.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>
      <div
        className="prose prose-neutral dark:prose-invert mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
