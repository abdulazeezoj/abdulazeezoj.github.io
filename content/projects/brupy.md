---
title: "brupy"
summary: "A CLI that scaffolds FastAPI and Flask projects from a short wizard, including database, migrations and a background worker."
year: 2026
kind: public
tags: [CLI, Python, Developer tools]
stack: [Python, uv, FastAPI, Flask, Jinja2, HTMX]
role: Author
featured: false
repo: https://github.com/abdulazeezoj/brupy
demo: https://abdulazeezoj.github.io/brupy/
---

`brupy` strikes a spark and gives you a running project. Python's web frameworks are unopinionated, so every new project begins with the same hour of boilerplate. Run one command, answer a short wizard, and you have a project that starts.

```bash
uvx brupy
```

## What you can choose

- **Framework:** FastAPI or Flask.
- **Template:** a Hello World starter, a REST API, or a full-stack app rendered on the server with Jinja2 and HTMX (optionally styled with Tailwind CSS).
- **Extras for the richer templates:** a database, an ORM, Alembic migrations, a background worker and Redis.
- **Project hygiene:** optional Dockerfile, git initialisation and dependency install with `uv`.

Every prompt has a matching flag, so the same command runs non-interactively in scripts and CI. It also remembers your last choices as the next defaults.

## Details I care about

- **One opinionated layout.** Fixed entrypoints, one file per resource, shared infrastructure under `core/`, borrowed from Next.js, so every generated project looks familiar.
- **Ready for AI coding agents.** Generated projects include `AGENTS.md` and a catalogue of library-specific agent skills for exactly the stack that was chosen, and a `brupy` skill that teaches an agent to drive the CLI.
- **Tested and documented.** CI, a documentation site, and a changelog; published on PyPI.
