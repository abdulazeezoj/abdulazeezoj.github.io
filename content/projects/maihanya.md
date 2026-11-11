---
title: "MaHanya"
summary: "Priority-aware traffic signal control, simulated on real junction data, where a model suggests and a rule layer decides."
year: 2026
kind: public
tags: [AI, Simulation, Full-stack]
stack: [Python, SUMO, PyTorch, FastAPI, Next.js, shadcn/ui, uv]
role: Author (final-year project)
featured: false
repo: https://github.com/abdulazeezoj/maihanya
---

Most junctions in growing Nigerian cities run on fixed-time signal plans: green time is split on a schedule, whatever the traffic is actually doing. That wastes green on empty approaches, adds delay on busy ones, and gives ambulances no way to claim priority. MaHanya is my Ahmadu Bello University final-year project exploring an alternative.

## The approach

1. Fit real vehicle-count data (peak and off-peak) to a statistical arrival distribution.
2. Use it to calibrate a SUMO microscopic simulation of the junction.
3. Train a lightweight Transformer encoder on simulated traffic states to recommend the next signal phase.
4. Pass **every** recommendation through a deterministic rule-based scheduler (minimum and maximum green, transition intervals, anti-starvation, emergency-vehicle pre-emption) before it is applied.
5. Compare against a fixed-time baseline on the same scenarios: waiting time, queue length, throughput and emergency response.
6. Show the junction, phase and priority events on a live dashboard.

The design principle is that a model output is never trusted directly for a safety-relevant decision.

## What's in the repo

A Python package with a CLI (fit, calibrate, generate, train, serve) and a FastAPI relay, a Next.js dashboard with shadcn/ui, and full specification and architecture documents. The field data in the repo is a synthetic placeholder; swapping in a real junction survey is a file replacement.
