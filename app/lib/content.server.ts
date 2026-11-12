// Build-time only: reads the markdown in /content, validates frontmatter and
// renders markdown to HTML. Imported by route loaders, which run during prerender.
import { existsSync } from "node:fs";
import fm from "front-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  year: z.number().int().optional(),
  /** "public" = code is open on GitHub; "case-study" = private/client work, write-up only */
  kind: z.enum(["public", "case-study"]),
  tags: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  role: z.string().optional(),
  featured: z.boolean().default(false),
  /** screenshot in /public, e.g. "/screenshots/retrorehab.png"; featured projects show a placeholder until set */
  image: z.string().startsWith("/").optional(),
  imageAlt: z.string().optional(),
  /** shown on the home page under "Problems I've solved" (featured projects only) */
  problem: z.string().optional(),
  solution: z.string().optional(),
  repo: z.url().optional(),
  demo: z.url().optional(),
  draft: z.boolean().default(false),
});

const postSchema = z.object({
  title: z.string(),
  summary: z.string(),
  // YAML turns an unquoted 2026-01-31 into a Date; normalise back to a string
  date: z.preprocess(
    (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  ),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const resumeSchema = z.object({
  name: z.string(),
  headline: z.string(),
  location: z.string(),
  email: z.string(),
  linkedin: z.string(),
  github: z.string(),
});

export type ProjectMeta = z.infer<typeof projectSchema> & { slug: string };
export type PostMeta = z.infer<typeof postSchema> & {
  slug: string;
  readingMinutes: number;
};

const projectFiles = import.meta.glob("../../content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const postFiles = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const resumeFile = Object.values(
  import.meta.glob("../../content/resume.md", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>,
)[0];

const slugOf = (path: string) => path.split("/").pop()!.replace(/\.md$/, "");

function parse<T extends z.ZodType>(path: string, raw: string, schema: T) {
  let parsed: { attributes: unknown; body: string };
  try {
    parsed = fm(raw);
  } catch (err) {
    // quote values containing ": " in the frontmatter
    throw new Error(`Cannot read frontmatter in ${path}: ${(err as Error).message.split("\n")[0]}`);
  }
  const { attributes, body } = parsed;
  const result = schema.safeParse(attributes);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in ${path}:\n${z.prettifyError(result.error)}`,
    );
  }
  return { meta: result.data as z.infer<T>, body };
}

const isProd = import.meta.env.PROD;

export function getProjects(): ProjectMeta[] {
  return Object.entries(projectFiles)
    .map(([path, raw]) => {
      const meta = parse(path, raw, projectSchema).meta;
      if (meta.image) {
        if (!meta.imageAlt) throw new Error(`${path}: "imageAlt" is required when "image" is set`);
        if (!existsSync(`public${meta.image}`)) {
          throw new Error(`${path}: image "${meta.image}" not found in /public`);
        }
      }
      return { ...meta, slug: slugOf(path) };
    })
    .filter((p) => !(isProd && p.draft))
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));
}

/** The order shown on /projects: client and product work first, then open source; featured first within each. */
export function getOrderedProjects(): ProjectMeta[] {
  const rank = (p: ProjectMeta) => (p.kind === "case-study" ? 0 : 1) * 2 + (p.featured ? 0 : 1);
  return getProjects().sort(
    (a, b) => rank(a) - rank(b) || (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title),
  );
}

export function getPosts(): PostMeta[] {
  return Object.entries(postFiles)
    .map(([path, raw]) => {
      const { meta, body } = parse(path, raw, postSchema);
      return {
        ...meta,
        slug: slugOf(path),
        readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
      };
    })
    .filter((p) => !(isProd && p.draft))
    .sort((a, b) => b.date.localeCompare(a.date));
}

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const text = (n: HastNode): string =>
  n.value ?? (n.children ?? []).map(text).join("");

/** In resume.md, a "### Left ::: Right" heading becomes a title with a right-aligned date. */
function rehypeSplitHeadings() {
  return (tree: HastNode) => {
    const walk = (n: HastNode) => {
      if (n.tagName === "h3") {
        const full = text(n);
        if (full.includes(" ::: ")) {
          const [left, right] = full.split(" ::: ");
          n.children = [
            { type: "element", tagName: "span", properties: {}, children: [{ type: "text", value: left }] },
            { type: "element", tagName: "span", properties: { className: ["when"] }, children: [{ type: "text", value: right }] },
          ];
        }
      }
      n.children?.forEach(walk);
    };
    walk(tree);
  };
}

async function render(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSplitHeadings)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

export async function getProject(slug: string) {
  const entry = Object.entries(projectFiles).find(([p]) => slugOf(p) === slug);
  if (!entry) return null;
  const { meta, body } = parse(entry[0], entry[1], projectSchema);
  if (isProd && meta.draft) return null;
  const all = getOrderedProjects();
  const i = all.findIndex((p) => p.slug === slug);
  const next = all.length > 1 ? all[(i + 1) % all.length] : null;
  return {
    meta: { ...meta, slug },
    html: await render(body),
    next: next && { slug: next.slug, title: next.title, summary: next.summary },
  };
}

export async function getPost(slug: string) {
  const entry = Object.entries(postFiles).find(([p]) => slugOf(p) === slug);
  if (!entry) return null;
  const { meta, body } = parse(entry[0], entry[1], postSchema);
  if (isProd && meta.draft) return null;
  return {
    meta: {
      ...meta,
      slug,
      readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
    },
    html: await render(body),
  };
}

export async function getResume() {
  const path = "../../content/resume.md";
  const { meta, body } = parse(path, resumeFile, resumeSchema);
  return { meta, html: await render(body) };
}
