---
title: "SanCopilot"
summary: "An enterprise AI copilot for financial-services consultants, built on AWS Bedrock with retrieval, role-based access and compliance guardrails."
year: 2025
kind: case-study
tags: [AI, RAG, Cloud]
stack: [Python, FastAPI, React, TypeScript, PostgreSQL, AWS Bedrock, ECS, Terraform]
role: Full-stack AI engineer (contract)
featured: true
problem: "A financial-services firm needed its consultants to get answers from internal documents and draft content."
solution: "A copilot used by 800+ consultants, with guardrails, evaluation and monitoring, and an Outlook integration."
---

SanCopilot is an AI assistant for consultants at a financial-services company. It answers questions against the firm's own documents and helps draft client-facing content. It is private, client work, so this page describes the problem and the engineering rather than linking to code.

## The problem

Consultants spent a large share of their time searching internal material and rewriting it for clients. In a regulated industry the answers also have to be traceable and the assistant has to stay inside the rules: who can see which documents, and what it may and may not say.

## What I built

- **Chat with retrieval.** Claude models served through AWS Bedrock, grounded with Bedrock Knowledge Bases so answers come from the firm's documents rather than the model's memory.
- **Agentic orchestration.** A ReAct-style loop in the API decides when to search, read or draft, with streaming responses (Server-Sent Events) so answers appear as they are written.
- **Access control and guardrails.** Fine-grained role-based permissions across documents and features, input and output guardrails around regulated content, and RAG evaluation workflows with production monitoring.
- **Document handling.** Multi-format uploads stored in S3 and indexed for search.
- **Outlook add-in.** The assistant is also available inside Microsoft Outlook, where the consultants already work.
- **Infrastructure.** Terraform-managed AWS: containers on ECS behind a load balancer, PostgreSQL on RDS with Alembic migrations, separate dev, pre-production and production environments.

## Results

A 75% reduction in research time and about 30% lower operating costs, serving 800+ financial consultants.
