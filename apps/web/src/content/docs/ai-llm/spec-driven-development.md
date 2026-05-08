---
title: Spec-Driven Dev Tools
description: Guide to OpenSpec, Spec Kit, and BMAD-METHOD for structured AI-assisted development.
category: AI & LLM
author: Badry
date: 2026-05-08
order: 14
source: https://docs.bahrul.me/ai-llm/spec-driven-development
---

# Spec-Driven Dev Tools

Spec-Driven Development is a methodology where specifications become the source of truth, guiding AI assistants to produce predictable, well-structured implementations. This guide covers three popular tools in this space.

## Overview

> **Info:**
All three tools work with popular AI coding assistants including Claude Code, Cursor, GitHub Copilot, and others.

| Tool        | Focus                              | Best For                                   |
| ----------- | ---------------------------------- | ------------------------------------------ |
| OpenSpec    | Change proposals and spec tracking | Brownfield projects, feature modifications |
| Spec Kit    | Executable specifications          | New projects, scenario-driven development  |
| BMAD-METHOD | Full agile workflow with agents    | Teams, enterprise projects                 |

## OpenSpec

OpenSpec is a lightweight framework that enables humans and AI assistants to agree on specifications before implementation begins. It uses a two-folder model to track current specs and proposed changes.

### Installation

> **Warn:**
Requires Bun or Node.js 20.19.0 or higher.

```bash
bun add -g @fission-ai/openspec@latest
openspec --version
```

### Quick Start

### Initialize in Your Project

```bash
cd my-project
openspec init
```

This creates the `openspec/` folder with `specs/` and `changes/` directories.

### Create a Change Proposal

Using the native slash command in Claude Code:

```
/openspec:proposal Add user authentication with OAuth
```

Or via CLI:

```bash
openspec new "Add user authentication"
```

### Review and Implement

After refining the spec, implement the changes:

```
/openspec:apply auth-feature
```

### Archive When Complete

```bash
openspec archive auth-feature --yes
```

### Commands Reference

| Command                      | Description                              |
| ---------------------------- | ---------------------------------------- |
| `openspec init`              | Initialize OpenSpec in current project   |
| `openspec list`              | View active changes                      |
| `openspec view`              | Interactive dashboard                    |
| `openspec show <change>`     | Display change details                   |
| `openspec validate <change>` | Check formatting                         |
| `openspec archive <change>`  | Move completed change to archive         |
| `/openspec:proposal`         | Create new proposal (Claude Code)        |
| `/openspec:apply`            | Implement approved changes (Claude Code) |
| `/openspec:archive`          | Archive completed changes (Claude Code)  |

- [OpenSpec GitHub](https://github.com/Fission-AI/OpenSpec)

## Spec Kit

Spec Kit is GitHub's open-source toolkit for Spec-Driven Development. It transforms specifications into executable implementations through a structured workflow of clarification, planning, and task generation.

### Installation

### Persistent Install
Install globally with uv:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

### One-Time Use
Run directly without installing:

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init my-project
```

> **Info:**
Requires Python 3.11+ and Git installed on your system.

### Quick Start

### Initialize a New Project

```bash
specify init my-project
cd my-project
```

### Define Project Constitution

Use the slash command to establish governing principles:

```
/speckit.constitution
```

### Create Specifications

Describe requirements and user stories:

```
/speckit.specify
```

### Plan and Generate Tasks

```
/speckit.plan
/speckit.tasks
```

### Implement

Execute tasks to build features:

```
/speckit.implement
```

### Commands Reference

| Command                 | Description                          |
| ----------------------- | ------------------------------------ |
| `specify init <name>`   | Create new Spec Kit project          |
| `specify check`         | Verify system requirements           |
| `/speckit.constitution` | Define project principles            |
| `/speckit.specify`      | Create requirements and user stories |
| `/speckit.plan`         | Generate implementation strategy     |
| `/speckit.tasks`        | Create actionable task list          |
| `/speckit.implement`    | Execute tasks to build features      |
| `/speckit.clarify`      | Clarify ambiguous requirements       |
| `/speckit.analyze`      | Analyze existing code/specs          |
| `/speckit.checklist`    | Generate verification checklist      |

- [Spec Kit GitHub](https://github.com/github/spec-kit)

## BMAD-METHOD

BMAD-METHOD is an AI-driven agile development framework with 12 specialized agents and 34 workflows. It adapts from quick bug fixes to enterprise-scale projects with compliance requirements.

### Installation

```bash
bunx bmad-method@alpha install
```

> **Info:**
The `@alpha` version is recommended. For legacy v4, use `bunx bmad-method install`.

### Quick Start

### Initialize Your Project

After installation, run the workflow initialization:

```
*workflow-init
```

This analyzes your project and recommends a development track.

### Choose Your Track

BMAD-METHOD offers three tracks based on project complexity:

| Track       | Use Case                  | Setup Time    |
| ----------- | ------------------------- | ------------- |
| Quick Flow  | Bug fixes, small changes  | \< 5 minutes  |
| BMad Method | Products and platforms    | \< 15 minutes |
| Enterprise  | Compliance-heavy projects | \< 30 minutes |

### Work Through Phases

The framework operates in four phases:

1. **Analysis** - Research and solution exploration
2. **Planning** - Requirements and specifications
3. **Solutioning** - Architecture and design
4. **Implementation** - Development with validation

### Specialized Agents

BMAD-METHOD includes 12 specialized agents:

### Core Development Agents
* **Developer** - Code implementation and testing
* **Architect** - System design and technical decisions
* **Product Manager** - Requirements and prioritization

### Design & Quality Agents
* **UX Designer** - User experience and interface design
* **Test Architect** - Testing strategy and automation
* **Scrum Master** - Process facilitation and workflow

### Additional Agents
* **Analyst** - Research and data analysis
* **DevOps** - Infrastructure and deployment
* **Security** - Security review and compliance
* **Documentation** - Technical writing
* **Reviewer** - Code review and quality gates
* **Integration** - API and system integration

### Key Features

* **Scale-Adaptive Intelligence** - Adjusts planning depth automatically
* **Multi-Language Support** - Works with any programming language
* **Token Optimization** - 90% savings via document sharding
* **Customizable Agents** - Create domain-specific agents with BMad Builder

- [BMAD-METHOD GitHub](https://github.com/bmad-code-org/BMAD-METHOD)

## Comparison

### When to Use OpenSpec
* Modifying existing codebases (brownfield)
* Need lightweight change tracking
* Want spec versioning and history
* Prefer file-based workflow

### When to Use Spec Kit
* Starting new projects (greenfield)
* Want scenario-driven development
* Need executable specifications
* Prefer structured slash commands

### When to Use BMAD-METHOD
* Team-based development
* Need specialized agent roles
* Enterprise or compliance requirements
* Want full agile workflow support

## Next Steps

- [Claude Code Plugin](/ai-llm/claude-plugin)

- [MCP Server Setup](/ai-llm/mcp-server)
