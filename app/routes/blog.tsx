import { PostCard } from "~/components/post-card";
import { getPosts } from "~/lib/content.server";
import type { Route } from "./+types/blog";

export function loader() {
  return { posts: getPosts() };
}

export const meta: Route.MetaFunction = () => [
  { title: "Blog — Abdulazeez Jimoh" },
  { name: "description", content: "Notes on building software, and what I learn along the way." },
];

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tight">Blog</h1>
      <p className="text-muted-foreground mt-3 max-w-xl">
        Notes on building software, and what I learn along the way.{" "}
        <a className="text-brand underline underline-offset-4" href="/rss.xml">
          RSS
        </a>
      </p>
      <div className="divide-border mt-8 divide-y">
        {loaderData.posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </>
  );
}
