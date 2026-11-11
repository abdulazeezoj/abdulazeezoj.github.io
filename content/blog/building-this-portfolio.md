---
title: "Building this portfolio with React Router, shadcn/ui and GitHub Pages"
summary: "How the site works, why projects and posts are plain markdown files, and what I'd do the same way again."
date: 2026-11-11
tags: [react-router, shadcn, github-pages]
---

I wanted a portfolio I could share as a single link, update without ceremony, and host for free. Here is how this one is put together.

## The shape of it

- **React Router in framework mode, prerendered.** The site has no server. At build time React Router renders every route to a plain HTML file, so pages load fast, work for link previews and search engines, and sit happily on GitHub Pages. Once loaded, navigation is client-side like any single-page app.
- **Tailwind CSS and shadcn/ui.** shadcn/ui copies components into the repo instead of hiding them in a package, so the header, buttons and menus are my code and I can change them freely.
- **Light, dark and system themes.** A tiny inline script sets the theme before the first paint, so there is no white flash for dark-mode visitors.

## Content is just markdown

Every project and every post is a `.md` file with a few lines of frontmatter:

```md
---
title: brupy
summary: A CLI that scaffolds FastAPI and Flask projects.
year: 2026
kind: public
tags: [CLI, Python]
repo: https://github.com/abdulazeezoj/brupy
---

The write-up goes here, in ordinary markdown.
```

At build time those files are read, validated and rendered to HTML. Adding a project means adding a file; the lists, tag filters, RSS feed and sitemap pick it up automatically.

The validation matters more than it sounds. A typo in a date or a missing summary fails the build, with a message naming the file, instead of quietly shipping a broken page.

## Why not a CMS?

A CMS adds an account, a database and a login to a site that changes a few times a month. Markdown in git gives me version history, review through pull requests, and the freedom to move to any other tool later. If a post one day needs an interactive chart, switching that file to MDX is a small step.

## Deploying

A GitHub Actions workflow installs dependencies, builds, and publishes the result to Pages. GitHub serves a `404.html` for unknown URLs, so the build copies the prerendered not-found page to that name.

## What I'd keep

Prerendering instead of a hash router, validated frontmatter, and keeping the design deliberately plain. The work is the point; the site should get out of its way.
