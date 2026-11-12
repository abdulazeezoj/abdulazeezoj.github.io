---
title: "Monovella"
summary: "A connected-care platform that follows a patient from specialist consultation to a fulfilled prescription or completed lab test in one traceable journey."
year: 2026
kind: case-study
tags: [Health, "Web & mobile"]
stack: [Python, FastAPI, React Router, Expo, PostgreSQL, Redis, Docker]
role: Product and engineering
featured: false
---

Monovella is an early-stage health product, still in active development.

## The idea

Most telemedicine tools stop at the consultation. Afterwards the patient is left to carry a prescription to a pharmacy or a lab request to a laboratory, and the clinical context gets lost along the way. Monovella keeps the consultation, the request, the booking, the payment, the fulfilment, the result and the notification in one care journey, all tied to the originating consultation and the patient's ID.

## The first release

A vertical slice for gynecology and GP care, with a curated network of verified providers:

- **Patients** find a specialist, book and pay for a consultation, then complete a prescription or lab request.
- **Specialists** manage schedules, notes, prescriptions and the lab requests they raised, and see the results.
- **Laboratories** manage tests, slots and capacity, and upload results.
- **Pharmacies** manage opening hours and availability, and handle pickup or delivery.
- **Admins** verify licences and credentials before a provider can serve patients.

## Engineering

- A FastAPI backend, a React Router web app and an Expo (React Native) mobile app that share one product version.
- Postgres and Redis, with uploaded files scanned for malware before they are accepted.
- Local, test, staging and production stacks defined with Docker Compose, with the common tasks wrapped in one task runner so any contributor can start the whole stack with a few commands.
