# abdulazeezoj.github.io

Portfolio and blog of Abdulazeez Jimoh. React Router (framework mode, prerendered to static HTML), Tailwind CSS v4 and shadcn/ui, hosted on GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # static site in build/client
npm run preview    # serve the built site locally
```

## Add a project

Create `content/projects/<slug>.md`:

```md
---
title: "My project"
summary: "One sentence shown on cards and in link previews."
year: 2026
kind: public            # public (code on GitHub) or case-study (private work)
tags: [AI, Web]
stack: [Python, React]
role: Author
featured: true          # list under "Selected projects" on the home page
spotlight: true          # optional: the one large "Featured project" card (use on a single project)
repo: https://github.com/you/repo   # optional
demo: https://example.com           # optional
draft: false            # true hides it from the production build
---

Write-up in markdown.
```

## Add a blog post

Create `content/blog/<slug>.md` with `title`, `summary`, `date` (YYYY-MM-DD), `tags` and optional `draft: true`.

Always quote `title` and `summary` if they contain a colon. A bad or missing field fails the build with the file name.

## Edit the About page / résumé

The About page is `content/resume.md`. Contact details live in its frontmatter; the body is normal markdown. A heading written as `### Company | Place ::: Mar 2026 – Present` shows the dates right-aligned.

`npm run build` also generates `build/client/Abdulazeez-Jimoh-Resume.pdf` from that same file with [pdfmake](https://pdfmake.github.io/docs/) (`scripts/make-pdf.mjs`): pure JavaScript, no browser needed, EB Garamond, US Letter, one page. The "Download résumé" button links to it. In `npm run dev` the PDF doesn't exist, so the button only works on a built site (`npm run build && npm run preview`).

The PDF script supports paragraphs, bullet lists, `**bold**`, `*italic*`, links and the two heading levels used in `resume.md`; anything else fails the build with a clear message rather than being dropped. If you change the page's look, the PDF layout is in that script and is styled separately.

Left out on purpose: phone number and GPA. Add them to `resume.md` if you want them on the public page and in the PDF.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. One-time setup: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
