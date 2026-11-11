---
title: "Let the model suggest, let rules decide"
summary: "A design lesson from MaHanya, my traffic-control project: put a deterministic safety layer between a machine-learning model and anything that matters."
date: 2026-11-10
tags: [machine-learning, safety, simulation]
---

For my final-year project I built a system that recommends traffic-signal phases using a small Transformer model. The model was the fun part. The part I'd defend hardest is the layer that sits after it.

## The temptation

Once a model has learned to predict a good phase from traffic state, it is tempting to wire its output straight to the signal. In simulation, it may even work well. But a traffic light is a safety-critical system, and a model is a statistical thing: usually right, occasionally wrong in ways you didn't predict.

## The rule layer

In MaHanya every recommendation is checked by a deterministic scheduler before it is applied:

- **Minimum and maximum green times**, so a signal can't flicker or hold forever.
- **Transition intervals** between phases.
- **Anti-starvation**, so a quiet approach is not ignored indefinitely.
- **Emergency-vehicle pre-emption**, which is decided by rules, not by a learned guess.

If the model suggests something the rules forbid, the rules win. The model proposes; the rules dispose.

## Why this is a good split

1. **You can reason about the worst case.** The rules are short enough to read and test exhaustively. You can state what the system will never do, regardless of the model.
2. **You can improve the model safely.** A better model changes how often the suggestions are good, not whether the system is allowed to be unsafe.
3. **You can evaluate honestly.** Comparing the combined system with a fixed-time baseline on the same scenarios tells you what you'd actually get, not what the model scores in isolation.

## Beyond traffic

The same shape appears wherever a model's output triggers an action: payments, medical workflows, access control. Let the model do the part that needs flexibility, and put the part that must never go wrong in code you can read in one sitting.
