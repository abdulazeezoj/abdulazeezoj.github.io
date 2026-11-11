---
title: "GridScope (SurplusMap)"
summary: "Finds pylons, substations and power stations in satellite imagery with YOLOv5 and serves detections through a serverless API."
year: 2022
kind: public
tags: [AI, Computer vision, Cloud]
stack: [Python, YOLOv5, AWS Lambda, ECR, SAM, GitHub Actions, Streamlit]
role: Contributor (Omdena challenge)
featured: true
repo: https://github.com/abdulazeezoj/gridscope
---

Mapping a country's power grid by hand is slow. This project, part of an Omdena challenge to speed up the green transition in India, detects grid infrastructure automatically from satellite images.

## Data

Locations scraped from OpenStreetMap and Wikipedia were used to download satellite tiles at several zoom levels. The tiles were split into 768 and 1024 pixel images, stripped of georeferencing, and labelled with three classes: pylon, substation and power station.

## Model

YOLOv5 object detection, trained from pretrained large and extra-large checkpoints. The larger model reached about 74% mAP at IoU 0.5, with roughly 73% precision and 73% recall.

## Deployment

The trained models are served by a serverless API: the model is packaged in a Docker image on AWS ECR, run on AWS Lambda, described as infrastructure-as-code with AWS SAM, and built, tested and deployed by GitHub Actions. A client posts a base64 image, picks a model and a confidence threshold, and receives bounding boxes, confidences and labels. A small Streamlit app was built on top as a demo.
