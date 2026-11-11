import { Mail } from "lucide-react";
import { GithubIcon } from "~/components/github-icon";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";
import type { Route } from "./+types/about";

export const meta: Route.MetaFunction = () => [
  { title: "About — Abdulazeez Jimoh" },
  { name: "description", content: "Who I am, what I work with, and how to reach me." },
];

const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript / JavaScript", "R", "SQL"],
  "AI & ML": ["LangChain", "LangGraph", "Claude, OpenAI, Bedrock", "PyTorch", "YOLO / computer vision"],
  "Backend & frontend": ["FastAPI", "Node.js", "React, React Router, Next.js", "Tailwind CSS, shadcn/ui"],
  "Cloud & data": ["AWS (ECS, Bedrock, RDS, Lambda)", "GCP, Azure", "PostgreSQL, Qdrant", "Docker, Terraform, GitHub Actions"],
};

export default function About() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
        <p>
          I'm {site.name}, a full-stack AI engineer based in Lagos, Nigeria. I
          build complete systems: backend APIs and ML pipelines, retrieval over
          private documents, React and Next.js interfaces, and the cloud
          infrastructure and deployment pipelines that keep them running.
        </p>
        <p>
          I started building AI systems in 2021 through Omdena collaborative
          challenges, turned open-source work into paid contracts, and now build
          an enterprise AI assistant for financial-services consultants. I'm also
          completing a BSc in Computer Science at Ahmadu Bello University.
        </p>
        <p>
          I'm interested in teams building AI products that real users depend
          on: RAG applications, agentic workflows, LLM evaluation and
          observability, and production computer vision. I write about what I
          learn on the <a href="/blog">blog</a>.
        </p>
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">What I work with</h2>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="rounded-lg border p-4">
            <dt className="text-sm font-medium">{group}</dt>
            <dd className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Get in touch</h2>
      <p className="text-muted-foreground mt-3">
        Open to contract or full-time remote roles with teams shipping AI
        products. Email is the best way to reach me.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${site.email}`}>
            <Mail /> {site.email}
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={site.github}>
            <GithubIcon /> github.com/{site.handle}
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={site.linkedin}>LinkedIn</a>
        </Button>
      </div>
    </>
  );
}
