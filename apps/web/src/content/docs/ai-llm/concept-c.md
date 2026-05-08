---
title: Agent Workflows
description: Patterns for using coding agents without losing scope control.
category: AI & LLM
author: Badry
date: 2026-05-08
order: 13
---

# Agent Workflows

Agent work is most reliable when the task has a concrete target and a clear validation step.

## Useful Flow

1. Inspect the repo and plan files.
2. Identify the smallest useful implementation.
3. Patch scoped files.
4. Run type checks and build.
5. Report what changed and what remains.

## Scope Guard

Keep optional work separate from required work. This helps prevent an implementation from drifting into unrelated redesign.
