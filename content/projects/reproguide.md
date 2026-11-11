---
title: "ReproGuide"
summary: "A conversational assistant that answers pig farmers' reproduction questions from US Pork Center of Excellence manuals, with page-level references."
year: 2024
kind: case-study
tags: [AI, RAG, Agriculture]
stack: [Python, FastAPI, LangChain, Qdrant, React, Vite, PostgreSQL, Docker, GCP]
role: Full-stack engineer
featured: true
---

ReproGuide (built under the name FarrPro) is a chatbot for pig farmers. It lets them ask questions in plain language and get answers with pointers to the exact place in the source documentation.

## The problem

Good guidance on swine reproduction exists, but it is buried in long manuals. A farmer with a question in the middle of the day will not read hundreds of pages, and a vague answer with no source is not good enough when animal health is at stake.

## How it works

- **Retrieval-augmented generation.** The manuals are split, embedded and stored in a Qdrant vector database. A question retrieves the most similar passages, and the language model answers from those passages only, with citations back to the document.
- **Conversation memory.** Follow-up questions keep their context.
- **A proper app around it.** A React and Vite front end with sign-up and login, a FastAPI backend with JWT authentication and stored conversation history, and PostgreSQL for application data.

## Deployment

Four services (nginx, API, web, chatbot) run under Docker Compose on a Google Cloud Compute Engine instance, with nginx handling TLS, Cloud SQL for PostgreSQL and a managed Qdrant for vectors. A GitHub Actions workflow handles deploys.

## Result

The system answers from about 500 pages of USDA-sourced manuals, and retrieval was measured at roughly 90% accuracy during evaluation.
