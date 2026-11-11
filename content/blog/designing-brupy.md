---
title: "Designing brupy for humans and coding agents"
summary: "What I learned building a project scaffolder: one opinionated layout, every prompt as a flag, and documentation an AI agent can use."
date: 2026-11-09
tags: [python, cli, developer-tools]
---

Python's web frameworks are unopinionated, which is a feature until you start your fifth project and write the same folder structure from memory again. `brupy` is my answer: a CLI that scaffolds a FastAPI or Flask project from a short wizard.

## One layout, everywhere

I borrowed the idea of fixed entrypoints from Next.js: one file per resource, shared infrastructure under `core/`, tests split into unit, e2e and integration. The value isn't that this layout is perfect; it's that every project looks the same, so moving between them costs nothing.

## Every prompt is a flag

An interactive wizard is great the first time and annoying the tenth. So every question has a matching flag, and the CLI remembers the last answers as the new defaults. The same tool works at a keyboard and in a CI script, with `--yes` skipping the questions.

## Unopinionated at the framework, opinionated in the extras

Hello World templates stay minimal. The richer templates ask for real decisions (database, ORM, migrations, a background worker, Redis) and wire them up so they work together, which is the hour of fiddling I wanted to skip.

## Agents are users too

Many projects are now written with an AI coding agent beside you. Generated projects therefore include an `AGENTS.md` and a set of library-specific reference notes for the exact stack chosen, so the agent starts with accurate context instead of guessing. There is also a skill that teaches an agent to drive `brupy` itself.

## Lessons

- Write the non-interactive path first; the wizard is a thin layer over it.
- Generate things that run. A scaffold that doesn't start on the first try loses trust immediately.
- Treat documentation as part of the product, for people and for agents.
