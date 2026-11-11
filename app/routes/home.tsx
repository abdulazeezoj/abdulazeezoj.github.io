import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router";
import { PostCard } from "~/components/post-card";
import { ProjectCard } from "~/components/project-card";
import { GithubIcon } from "~/components/github-icon";
import { Button } from "~/components/ui/button";
import { getPosts, getProjects } from "~/lib/content.server";
import { site } from "~/lib/site";
import type { Route } from "./+types/home";

export function loader() {
  return {
    projects: getProjects().filter((p) => p.featured).slice(0, 5),
    posts: getPosts().slice(0, 3),
  };
}

export const meta: Route.MetaFunction = () => [{ title: site.title }];

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects, posts } = loaderData;
  return (
    <>
      <section aria-labelledby="intro">
        <p className="text-brand text-sm font-medium">Hi, I'm {site.name}</p>
        <h1
          id="intro"
          className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        >
          I build AI products, from model to deployment.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed text-pretty">
          Full-stack AI engineer working across backend APIs, retrieval and
          ML pipelines, React interfaces and cloud infrastructure. This is where
          I keep what I've built and what I've learned along the way.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/projects">
              See my work <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={site.github}>
              <GithubIcon /> GitHub
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={`mailto:${site.email}`}>
              <Mail /> Get in touch
            </a>
          </Button>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="featured">
        <div className="flex items-baseline justify-between">
          <h2 id="featured" className="text-xl font-semibold tracking-tight">
            Selected projects
          </h2>
          <Link to="/projects" className="text-muted-foreground hover:text-foreground text-sm">
            All projects →
          </Link>
        </div>
        <div className="divide-border mt-4 divide-y">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {posts.length > 0 && (
        <section className="mt-20" aria-labelledby="writing">
          <div className="flex items-baseline justify-between">
            <h2 id="writing" className="text-xl font-semibold tracking-tight">
              Writing
            </h2>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground text-sm">
              All posts →
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
