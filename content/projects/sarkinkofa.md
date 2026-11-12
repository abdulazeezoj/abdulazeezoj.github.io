---
title: "SARKINkofa"
summary: "A vehicle and number-plate recognition system built on YOLOv8 and OpenCV, installable as a command-line tool."
year: 2023
kind: public
tags: [AI, Computer vision]
stack: [Python, YOLOv8, OpenCV, Poetry]
role: Author
featured: false
repo: https://github.com/abdulazeezoj/sarkinkofa
---

*Sarkin kofa* is Hausa for "gatekeeper". The project detects vehicles and recognises their number plates, with checkpoints, toll gates and parking lots in mind.

Point the `sarkinkofa-fs` command at a folder of images and it writes the recognised results to another, with a verbose mode and shell completion. It installs with `pip` or Poetry straight from the repository, and the repo includes demo material for both folder and stream input, plus the notebooks used to train the plate-detection and recognition models.
