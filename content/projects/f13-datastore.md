---
title: "F13 Datastore"
summary: "A self-hostable, multi-tenant document-intelligence platform that feeds enterprise RAG pipelines, with strict tenant and document isolation."
year: 2026
kind: case-study
tags: [AI, RAG, Backend, Security]
stack: [FastAPI, OpenSearch, RabbitMQ, Celery, RustFS, Keycloak]
role: Full-stack AI engineer (contract)
featured: true
problem: "A company's documents sit in many different systems, and an AI assistant must only ever find and return what each person is allowed to see."
solution: "A self-hostable, multi-tenant document platform with hybrid search and strict tenant and document-level access control."
---

F13 Datastore is the document layer behind enterprise RAG pipelines, built for an enterprise AI software company. A company points it at its documents, and applications and AI agents can then search and retrieve the right ones, only the ones each user is allowed to see. It is private, client work, so this page covers the design rather than linking to code.

## The problem

A retrieval pipeline is only as trustworthy as the store behind it. Enterprise customers have documents in many systems, many tenants share the same platform, and one leaked document across a tenant boundary is a serious incident. The platform has to ingest from external sources, make content searchable several ways, and enforce access control on every request, and it has to be something a customer can host themselves.

## What I built

- **A modular plugin architecture.** Connector, ingestion and retrieval plugins keep external-source synchronisation, custom document processing and search strategies separate and replaceable.
- **Flexible search.** Text, keyword, vector and hybrid search over OpenSearch, so retrieval can be tuned to the kind of content and question.
- **Asynchronous ingestion.** Synchronisation and processing run as background work through RabbitMQ and Celery, with RustFS for object storage.
- **Authorization-scoped access.** Every API and search operation runs within the caller's permissions.

## Tenant and document isolation

Isolation is enforced in layers rather than in one place:

- Keycloak issues identities; the API validates JWTs over OIDC.
- Role-based access control decides what a caller may do.
- Cross-tenant reference checks stop a request in one tenant from pointing at another tenant's data.
- Document-level access control lists decide which documents a caller may see.
- OpenSearch document-level security applies the same rules inside the search engine, so a query cannot return what the caller is not allowed to read.

## Why it matters

Putting the rules in the API *and* in the search engine means a bug in one layer does not silently expose data. The same design principle runs through my other work: keep the part that must never go wrong simple, explicit and separately testable.
