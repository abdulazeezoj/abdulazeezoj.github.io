---
title: "Honeypot"
summary: "An SSH and web honeypot that records attackers' attempts, enriches source IPs with geolocation, and charts it all on a live dashboard."
year: 2026
kind: public
tags: [Security]
stack: [Python, Paramiko, Flask, SQLite, httpx, Chart.js, uv]
role: Author
featured: false
repo: https://github.com/abdulazeezoj/alaba-honeypot
---

Internet-facing servers are probed constantly. This honeypot pretends to be an easy target so you can see who is knocking, and what they try.

- **SSH decoy.** A Paramiko server presenting a fake interactive shell that records connection attempts, credentials and the commands typed.
- **Web decoy.** A Flask login portal that logs submitted credentials.
- **Enrichment.** Source IPs are geolocated in the background so attempts can be mapped.
- **Dashboard.** A live Chart.js dashboard backed by SQLite and a small JSON API.

It is meant for infrastructure you own or are authorised to monitor, and the README says so up front.
