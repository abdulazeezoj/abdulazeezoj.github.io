import { NotFound } from "~/components/not-found";
import type { Route } from "./+types/not-found";

export const meta: Route.MetaFunction = () => [
  { title: "Page not found — Abdulazeez Jimoh" },
  { name: "robots", content: "noindex" },
];

// Catch-all: also prerendered at /404 and copied to 404.html for GitHub Pages.
export default function NotFoundRoute() {
  return <NotFound />;
}
