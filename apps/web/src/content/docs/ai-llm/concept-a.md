---
title: Prompt Engineering
description: A compact reference for turning vague instructions into precise, testable prompts.
category: AI & LLM
author: Badry
date: 2026-05-08
order: 11
---

# Prompt Engineering

Good prompts make the output shape clear and remove ambiguity from the task.

## Prompt Anatomy

- Goal: the result that must exist at the end
- Context: files, audience, constraints, and current state
- Output: the exact format expected
- Quality gate: tests, examples, or acceptance criteria

## Working Pattern

Start with the real user goal, then add constraints only when they change the implementation decision.

```text
Build the app shell from the plan, keep the design consistent with the docs UI, and verify with a production build.
```

## Review Checklist

1. Does the prompt define success?
2. Does it mention real constraints?
3. Does it avoid asking for unrelated polish?
