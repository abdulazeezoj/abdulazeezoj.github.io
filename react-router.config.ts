import { readdirSync, readFileSync } from "node:fs";
import type { Config } from "@react-router/dev/config";

const slugs = (dir: string) =>
  readdirSync(new URL(`./content/${dir}`, import.meta.url))
    .filter((f) => f.endsWith(".md"))
    // drafts are not published, so they are not prerendered either
    .filter(
      (f) =>
        !/^draft:\s*true\s*$/m.test(
          readFileSync(new URL(`./content/${dir}/${f}`, import.meta.url), "utf8")
            .split(/^---\s*$/m)[1] ?? "",
        ),
    )
    .map((f) => f.replace(/\.md$/, ""));

export default {
  // Static site for GitHub Pages: no server, every route is prerendered to HTML.
  ssr: false,
  async prerender() {
    return [
      "/",
      "/about",
      "/projects",
      "/blog",
      "/404",
      "/sitemap.xml",
      "/rss.xml",
      ...slugs("projects").map((s) => `/projects/${s}`),
      ...slugs("blog").map((s) => `/blog/${s}`),
    ];
  },
} satisfies Config;
