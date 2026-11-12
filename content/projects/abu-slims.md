---
title: "SLIMS"
summary: "A web platform that replaces handwritten SIWES internship logbooks with a verifiable digital workflow at Ahmadu Bello University."
year: 2026
kind: public
tags: ["Web & mobile", Education]
stack: [Next.js, React, Prisma, Better Auth, BullMQ, Tailwind CSS, shadcn/ui]
role: Author
featured: false
repo: https://github.com/abdulazeezoj/abu-slims
---

SIWES (the Students' Industrial Work Experience Scheme) requires 24 weeks of industrial training, recorded in a handwritten logbook that supervisors then sign. SLIMS digitises the whole process.

## Who it serves

- **Students** record daily activities, attach diagrams, and generate a print-ready physical logbook on demand.
- **Industry supervisors** give feedback through an email link, with no account to create.
- **School supervisors** follow progress remotely, and every review is timestamped and kept permanently.
- **The SIWES unit** gets a central, searchable record of all training activity and less paperwork, while keeping the compliance trail.

## Under the hood

A Next.js and React application with Prisma for data, Better Auth for sign-in, BullMQ for background jobs such as document export and cleanup, and a shadcn/ui interface. The repo includes a written product idea, feature list, database schema and architecture document.
