---
title: Local Models
description: Notes for evaluating private local LLMs and choosing when they are useful.
category: AI & LLM
author: Badry
date: 2026-05-08
order: 12
---

# Local Models

Local models are useful when privacy, offline work, or repeatable low-cost experiments matter more than frontier accuracy.

## Good Uses

- Summarizing local notes
- Drafting repetitive internal content
- Testing retrieval flows without sending data to a hosted provider

## Constraints

- Smaller models can miss subtle requirements
- Context limits still shape the workflow
- Hardware determines latency more than model branding

## Evaluation

Use the same sample tasks for every model. Keep scoring simple: accuracy, latency, cost, and failure behavior.
