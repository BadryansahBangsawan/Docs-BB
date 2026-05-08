---
title: MCP Server Setup
description: Configure Model Context Protocol servers for Claude Code and shadcn registries.
category: AI & LLM
author: Badry
date: 2026-05-08
order: 12
source: https://docs.bahrul.me/ai-llm/mcp-server
---

# MCP Server Setup

This guide covers how to configure MCP (Model Context Protocol) servers for Claude Code by editing `~/.claude.json`.

## What is MCP?

> **Info:**
MCP (Model Context Protocol) allows Claude Code to connect to external services and tools, extending its capabilities with web search, database access, UI components, and more.

## Configuration

Edit your Claude Code configuration file:

```bash
# Open with your preferred editor
zed ~/.claude.json
# or
code ~/.claude.json
# or
nano ~/.claude.json
```

## MCP Servers

Add the following `mcpServers` configuration to your `~/.claude.json`:

```json title="~/.claude.json"
{
  "mcpServers": {
"exa": {
  "command": "bunx",
  "args": [
    "--bun",
    "mcp-remote",
    "https://mcp.exa.ai/mcp?tools=web_search_exa,get_code_context_exa,crawling_exa,company_research_exa,linkedin_search_exa,deep_researcher_start,deep_researcher_check&exaApiKey=YOUR_API_KEY"
  ]
},
"neon": {
  "type": "http",
  "url": "https://mcp.neon.tech/mcp"
},
"shadcn": {
  "command": "bunx",
  "args": [
    "--bun",
    "shadcn@latest",
    "mcp"
  ]
},
"context7": {
  "type": "http",
  "url": "https://mcp.context7.com/mcp",
  "headers": {
    "CONTEXT7_API_KEY": "YOUR_API_KEY"
  }
},
"filesystem-mcp": {
  "command": "bunx",
  "args": [
    "--bun",
    "@sylphlab/filesystem-mcp"
  ],
  "name": "Filesystem (bunx)"
},
"kibo-ui": {
  "command": "bunx",
  "args": [
    "--bun",
    "mcp-remote",
    "https://www.kibo-ui.com/api/mcp/mcp"
  ]
},
"chrome-devtools": {
  "command": "bunx",
  "args": [
    "--bun",
    "chrome-devtools-mcp@latest"
  ]
},
"Astro docs": {
  "type": "http",
  "url": "https://mcp.docs.astro.build/mcp"
}
  }
}
```

> **Warn:**
Replace `YOUR_API_KEY` with your actual API keys for Exa and Context7 services.

## MCP Server Reference

| Server              | Type        | Description                                                           |
| ------------------- | ----------- | --------------------------------------------------------------------- |
| **exa**             | bunx/remote | Web search, code context, crawling, company research, LinkedIn search |
| **neon**            | http        | Neon PostgreSQL database integration                                  |
| **shadcn**          | bunx        | shadcn/ui component installation                                      |
| **context7**        | http        | Context7 documentation search                                         |
| **filesystem-mcp**  | bunx        | Filesystem operations                                                 |
| **kibo-ui**         | bunx/remote | Kibo UI component library                                             |
| **chrome-devtools** | bunx        | Chrome DevTools integration for debugging                             |
| **Astro docs**      | http        | Astro framework documentation                                         |

## Server Types

### HTTP
### HTTP Type

Direct HTTP connection to MCP server:

```json
{
  "neon": {
    "type": "http",
    "url": "https://mcp.neon.tech/mcp"
  }
}
```

With authentication headers:

```json
{
  "context7": {
    "type": "http",
    "url": "https://mcp.context7.com/mcp",
    "headers": {
      "CONTEXT7_API_KEY": "YOUR_API_KEY"
    }
  }
}
```

### Bunx Command
### Bunx Command Type

Run a local Bunx package:

```json
{
  "shadcn": {
    "command": "bunx",
    "args": [
      "--bun",
      "shadcn@latest",
      "mcp"
    ]
  }
}
```

### Bunx Remote
### Bunx Remote Type

Use `mcp-remote` to connect to remote MCP servers:

```json
{
  "kibo-ui": {
    "command": "bunx",
    "args": [
      "--bun",
      "mcp-remote",
      "https://www.kibo-ui.com/api/mcp/mcp"
    ]
  }
}
```

## Shadcn Registries

For projects using shadcn/ui, you can configure additional component registries in your `components.json`:

```json title="components.json"
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-lyra",
  "rsc": false,
  "tsx": true,
  "tailwind": {
"config": "",
"css": "src/index.css",
"baseColor": "neutral",
"cssVariables": true,
"prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
"components": "@/components",
"utils": "@/lib/utils",
"ui": "@/components/ui",
"lib": "@/lib",
"hooks": "@/hooks"
  },
  "registries": {
"@reui": "https://reui.io/r/{name}.json",
"@formcn": "https://formcn.dev/r/{name}.json",
"@abui": "https://abui.io/r/{name}.json",
"@better-upload": "https://better-upload.com/r/{name}.json",
"@assistant-ui": "https://r.assistant-ui.com/{name}.json",
"@billingsdk": "https://billingsdk.com/r/{name}.json",
"@coss": "https://coss.com/ui/r/{name}.json",
"@diceui": "https://diceui.com/r/{name}.json",
"@hextaui": "https://hextaui.com/r/{name}.json",
"@kibo-ui": "https://www.kibo-ui.com/r/{name}.json",
"@kokonutui": "https://kokonutui.com/r/{name}.json",
"@lucide-animated": "https://lucide-animated.com/r/{name}.json",
"@magicui": "https://magicui.design/r/{name}",
"@manifest": "https://ui.manifest.build/r/{name}.json",
"@plate": "https://platejs.org/r/{name}.json",
"@react-bits": "https://reactbits.dev/r/{name}.json",
"@shadcn-editor": "https://shadcn-editor.vercel.app/r/{name}.json",
"@tour": "https://onboarding-tour.vercel.app/r/{name}.json",
"@uitripled": "https://ui.tripled.work/r/{name}.json",
"@wandry-ui": "https://ui.wandry.com.ua/r/{name}.json"
  }
}
```

## Registry Reference

| Registry             | URL                 | Description            |
| -------------------- | ------------------- | ---------------------- |
| **@reui**            | reui.io             | ReUI components        |
| **@formcn**          | formcn.dev          | Form components        |
| **@abui**            | abui.io             | AB UI components       |
| **@better-upload**   | better-upload.com   | File upload components |
| **@assistant-ui**    | assistant-ui.com    | AI assistant UI        |
| **@billingsdk**      | billingsdk.com      | Billing components     |
| **@coss**            | coss.com            | COSS UI                |
| **@diceui**          | diceui.com          | Dice UI components     |
| **@hextaui**         | hextaui.com         | Hexta UI components    |
| **@kibo-ui**         | kibo-ui.com         | Kibo UI components     |
| **@kokonutui**       | kokonutui.com       | Kokonut UI             |
| **@lucide-animated** | lucide-animated.com | Animated Lucide icons  |
| **@magicui**         | magicui.design      | Magic UI effects       |
| **@manifest**        | manifest.build      | Manifest UI            |
| **@plate**           | platejs.org         | Rich text editor       |
| **@react-bits**      | reactbits.dev       | React components       |
| **@shadcn-editor**   | shadcn-editor       | Code editor            |
| **@tour**            | onboarding-tour     | Onboarding tours       |
| **@uitripled**       | tripled.work        | Tripled UI             |
| **@wandry-ui**       | wandry.com.ua       | Wandry UI              |

## Installing from Registries

Use the shadcn CLI to install components from registries:

```bash
# Install from default registry
bunx shadcn@latest add button

# Install from custom registry
bunx shadcn@latest add @kibo-ui/kanban
bunx shadcn@latest add @magicui/bento-grid
bunx shadcn@latest add @plate/editor
```

## Troubleshooting

### MCP server not connecting
1. Check if the server URL is correct
2. Verify your API keys are valid
3. Restart Claude Code after configuration changes

### Bunx command failing
Make sure you have Bun installed:

```bash
bun --version
```

If not installed, run:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Registry component not found
1. Check the registry URL is correct in `components.json`
2. Verify the component name exists in the registry
3. Try updating shadcn CLI: `bun add -g shadcn@latest`

## Next Steps

- [Set Alias](/ai-llm/set-alias)

- [Claude Plugin Development](/ai-llm/claude-plugin)
