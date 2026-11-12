import { Mail } from "lucide-react";
import { Link } from "react-router";
import { PostCard } from "~/components/post-card";
import { ProblemCard } from "~/components/problem-card";
import { Button } from "~/components/ui/button";
import { getPosts, getProjects } from "~/lib/content.server";
import { contactHref, site } from "~/lib/site";
import type { Route } from "./+types/home";

export function loader() {
  return {
    solved: getProjects().filter((p) => p.featured && p.problem && p.solution),
    posts: getPosts().slice(0, 3),
  };
}

export const meta: Route.MetaFunction = () => [{ title: site.title }];

export default function Home({ loaderData }: Route.ComponentProps) {
  const { solved, posts } = loaderData;
  return (
    <>
      <section aria-labelledby="intro">
        <h1
          id="intro"
          className="font-display text-5xl font-medium tracking-tight text-balance sm:text-6xl"
        >
          Got a problem to solve, or an idea to build?
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty">
          Whether you're a business with something that needs fixing or a
          startup with an idea that needs building, I design, build and launch
          the software, using AI where it genuinely helps. From the first
          conversation to live in production.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={contactHref}>
              <Mail /> Tell me about your project
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/projects">See what I've built</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Available for remote contract work
        </p>
      </section>

      <section className="mt-24" aria-labelledby="solved">
        <div className="flex items-baseline justify-between">
          <h2 id="solved" className="font-display text-3xl font-medium tracking-tight">
            Problems I've solved
          </h2>
          <Link to="/projects" className="text-muted-foreground hover:text-foreground text-sm">
            All projects
          </Link>
        </div>
        <ul className="divide-border mt-6 divide-y">
          {solved.map((p) => (
            <ProblemCard key={p.slug} project={p} />
          ))}
        </ul>
      </section>

      {posts.length > 0 && (
        <section className="mt-24" aria-labelledby="writing">
          <div className="flex items-baseline justify-between">
            <h2 id="writing" className="font-display text-3xl font-medium tracking-tight">
              Writing
            </h2>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground text-sm">
              All posts
            </Link>
          </div>
          <div className="divide-border mt-4 divide-y">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
