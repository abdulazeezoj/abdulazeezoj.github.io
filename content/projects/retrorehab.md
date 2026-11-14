---
title: "RetroRehab"
summary: "A browser-based rehabilitation platform that tracks body movement in real time through an ordinary camera, with no wearable sensors."
kind: case-study
tags: [AI, Computer vision, Health]
stack: [MediaPipe, AWS EC2, Application Load Balancer]
role: AI engineer (Omdena)
featured: true
image: /screenshots/retrorehab.webp
imageAlt: "RetroRehab's Kangaroo game: the player's webcam image with a kangaroo that follows their movement, a star to collect, and a timer and star score at the top"
problem: "Tracking rehabilitation movement meant wearable sensors."
solution: "A browser-based platform that tracks body movement in real time through an ordinary camera."
demo: https://games.retrorehab.io
---

RetroRehab is a browser-based rehabilitation platform built during my time at Omdena. Patients move, a camera watches, and the game responds. You can try the product at [games.retrorehab.io](https://games.retrorehab.io).

## The problem

Rehabilitation depends on patients repeating exercises correctly and consistently. Measuring movement usually means wearable sensors, which cost around $300 per patient, and exercises that feel like chores are the ones people stop doing.

## What I built

- **Body tracking from a normal camera.** Real-time pose tracking with MediaPipe replaces the wearable sensors entirely.
- **Low latency.** The tracking-to-game loop runs in under 100 ms, which is what makes movement-controlled games feel responsive rather than laggy.
- **Games as the interface.** The tracked movement drives the game, so the exercise is the play.
- **Deployment.** Hosted on AWS EC2 behind an Application Load Balancer.

## Results

Reported figures: under 100 ms latency, and a 60% improvement in patient adherence.
