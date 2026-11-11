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
  "AI applications, RAG & agents": ["OpenAI, Claude, Amazon Bedrock", "LangChain, LangGraph", "OpenSearch, Qdrant, Azure AI Search"],
  "Computer vision & ML": ["PyTorch, TensorFlow", "YOLOv5 / YOLOv8, MediaPipe, OpenCV", "ONNX, Roboflow"],
  "Backend & frontend": ["Python, TypeScript", "FastAPI, Node.js", "React, Next.js, Tailwind CSS, shadcn/ui"],
  "Cloud & delivery": ["AWS, Azure, GCP", "Docker, CI/CD (GitHub Actions, GitLab)", "PostgreSQL, MongoDB, Redis, RabbitMQ, Keycloak"],
};

const experience = [
  {
    org: "Vectuan.ai",
    role: "Full-stack AI engineer (contract)",
    period: "Mar 2026 – present",
    summary:
      "Building a self-hostable, multi-tenant document-intelligence platform for enterprise RAG pipelines: connector, ingestion and retrieval plugins, hybrid search, and tenant and document isolation with Keycloak and OpenSearch.",
  },
  {
    org: "Intermediate Data Systems",
    role: "Full-stack AI engineer (contract)",
    period: "May 2024 – Feb 2026",
    summary:
      "Built and deployed SanCopilot, an AWS Bedrock copilot used by 800+ financial consultants, with the supporting infrastructure, guardrails, RAG evaluation, monitoring and an Outlook integration.",
  },
  {
    org: "Omdena",
    role: "AI engineer (contract / project-based)",
    period: "Jul 2021 – Apr 2024",
    summary:
      "Delivered AI products for agriculture, health technology and food tech, including ReproGuide, RetroRehab and Vegemi.",
  },
];

export default function About() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
        <p>
          I'm {site.name}, a full-stack AI engineer based in Abeokuta, Nigeria, with 5+ years of experience building AI-powered applications across financial services, health technology and agriculture. I
          build complete systems: backend APIs and ML pipelines, retrieval over
          private documents, React and Next.js interfaces, and the cloud
          infrastructure and deployment pipelines that keep them running.
        </p>
        <p>
          I started building AI systems in 2021 through Omdena collaborative
          challenges, and have worked on contract ever since. I'm currently
          building a self-hostable document-intelligence platform for enterprise
          RAG pipelines, and I'm completing a BSc in Computer Science at Ahmadu
          Bello University.
        </p>
        <p>
          I'm interested in teams building AI products that real users depend
          on: RAG applications, agentic workflows, LLM evaluation and
          observability, and production computer vision. I write about what I
          learn on the <a href="/blog">blog</a>.
        </p>
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Experience</h2>
      <ol className="mt-4 space-y-6">
        {experience.map((e) => (
          <li key={e.org}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-medium">
                {e.org} <span className="text-muted-foreground font-normal">· {e.role}</span>
              </h3>
              <span className="text-muted-foreground text-sm tabular-nums">{e.period}</span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{e.summary}</p>
          </li>
        ))}
      </ol>

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
