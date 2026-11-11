import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("projects", "routes/projects.tsx"),
  route("projects/:slug", "routes/project.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/post.tsx"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("rss.xml", "routes/rss.ts"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
