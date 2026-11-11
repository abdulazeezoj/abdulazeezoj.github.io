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
featured: true          # show on the home page
repo: https://github.com/you/repo   # optional
demo: https://example.com           # optional
draft: false            # true hides it from the production build
---

Write-up in markdown.
```

## Add a blog post

Create `content/blog/<slug>.md` with `title`, `summary`, `date` (YYYY-MM-DD), `tags` and optional `draft: true`.

Always quote `title` and `summary` if they contain a colon. A bad or missing field fails the build with the file name.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. One-time setup: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
