import { getPosts, getProjects } from "~/lib/content.server";
import { site } from "~/lib/site";

export function loader() {
  const paths = [
    "/",
    "/about",
    "/projects",
    "/blog",
    ...getProjects().map((p) => `/projects/${p.slug}`),
    ...getPosts().map((p) => `/blog/${p.slug}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
