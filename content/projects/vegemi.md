---
title: "Vegemi"
summary: "A containerised recommendation service for a live iOS and Android app, matching users' food preferences against daily nutritional targets."
kind: case-study
tags: [AI]
stack: [Python, FastAPI, Docker]
role: AI engineer (Omdena)
featured: false
---

Vegemi is a food-tech product with a live iOS and Android app. I built the recommendation service behind it as part of my work with Omdena.

## The idea

Eating well is easier when suggestions fit both your tastes and your nutritional needs. The app needed a backend that could take a user's preferences and recommend foods that also help them reach their daily recommended dietary allowances (RDA).

## What I built

- **A recommendation service.** It matches each user's preferences against daily RDA targets, using the Fineli50 nutritional dataset as the source of nutrient data.
- **A FastAPI backend, packaged in containers.** The mobile apps call it over HTTP, and Docker makes it straightforward to run the same way in development and in production.
- **Designed for a live product.** The service backs an app that real users install on both iOS and Android, so a clear, stable API mattered as much as the matching logic.
