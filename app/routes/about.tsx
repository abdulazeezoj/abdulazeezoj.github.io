import "@fontsource/eb-garamond/latin-400.css";
import "@fontsource/eb-garamond/latin-400-italic.css";
import "@fontsource/eb-garamond/latin-700.css";
import { Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import { getResume } from "~/lib/content.server";
import { site } from "~/lib/site";
import type { Route } from "./+types/about";

export async function loader() {
  return getResume();
}

export const meta: Route.MetaFunction = () => [
  { title: "About — Abdulazeez Jimoh" },
  {
    name: "description",
    content: "Experience, skills and education of Abdulazeez Jimoh, full-stack AI engineer.",
  },
];

const PDF_PATH = "/Abdulazeez-Jimoh-Resume.pdf";

export default function About({ loaderData }: Route.ComponentProps) {
  const { meta, html } = loaderData;
  return (
    <article className="resume">
      <div className="mb-6 flex justify-end print:hidden">
        <Button asChild variant="outline" size="sm" className="font-sans">
          <a href={PDF_PATH} download>
            <Download /> Download résumé (PDF)
          </a>
        </Button>
      </div>

      <header className="resume-header">
        <h1>{meta.name}</h1>
        <p className="headline">{meta.headline}</p>
        <p className="contact">
          {meta.location} | <a href={`mailto:${meta.email}`}>{meta.email}</a> |{" "}
          <a href={`https://${meta.linkedin}`}>{meta.linkedin}</a> |{" "}
          <a href={`https://${meta.github}`}>{meta.github}</a>
        </p>
      </header>

      <div className="resume-body" dangerouslySetInnerHTML={{ __html: html }} />

      <p className="text-muted-foreground mt-10 text-sm print:hidden" style={{ fontFamily: "var(--font-sans)" }}>
        Want the detail behind any of this? See the <a className="text-brand underline underline-offset-4" href="/projects">projects</a> and{" "}
        <a className="text-brand underline underline-offset-4" href="/blog">blog</a>, or{" "}
        <a className="text-brand underline underline-offset-4" href={`mailto:${site.email}`}>get in touch</a>.
      </p>
    </article>
  );
}
