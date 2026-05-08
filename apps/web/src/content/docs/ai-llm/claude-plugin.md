---
title: Claude Code Plugin
description: Guide to creating, installing, and managing Claude Code plugins with a local marketplace.
category: AI & LLM
author: Badry
date: 2026-05-08
order: 13
source: https://docs.bahrul.me/ai-llm/claude-plugin
---

# Claude Code Plugin

This guide covers how to set up a local plugin marketplace, install plugins, and manage your Claude Code plugin development workflow.

## Prerequisites

> **Info:**
Make sure you have Claude Code CLI installed and configured before proceeding.

## Setting Up Local Marketplace

### Create the Marketplace Structure

Create the directory structure for your local plugin marketplace:

```bash
mkdir -p /Users/growthacker/.claude/plugins/.claude-plugin
```

### Create the Marketplace Manifest

Create the manifest file at `/Users/growthacker/.claude/plugins/.claude-plugin/marketplace.json`:

```json title="marketplace.json"
{
  "name": "my-local-marketplace",
  "owner": {
    "name": "Your Name"
  },
  "plugins": [
    {
      "name": "rubot",
      "source": "./rubot",
      "description": "Your rubot plugin"
    }
  ]
}
```

### Add and Install in Claude Code

Register your local marketplace and install the plugin:

```bash
/plugin marketplace add /Users/growthacker/.claude/plugins
/plugin install rubot@my-local-marketplace
```

> **Warn:**
Make sure your plugin folder contains a `.claude-plugin/plugin.json` manifest file.

## Updating Plugins

There are several ways to update your plugins after making changes:

### Restart
### Option 1: Restart Claude Code

Simply restart Claude Code to pick up the changes. When using `--plugin-dir` for development, restart after each change.

### Marketplace Update
### Option 2: Update via Marketplace Command

If your plugin is installed from a marketplace:

```bash
/plugin update rubot@rulisme
```

### Refresh
### Option 3: Refresh the Marketplace

If you updated the plugin source:

```bash
/plugin marketplace update rulisme
```

## Development Workflow

For active plugin development, use the `--plugin-dir` flag to load your plugin directly:

```bash
claude --plugin-dir /Users/growthacker/.claude/plugins/rubot
```

> **Info:**
Restart Claude Code each time you make changes to see updates when using `--plugin-dir`.

## Troubleshooting

### Clear Plugin Cache
If you're experiencing issues with plugin updates, try clearing the cache:

```bash
rm -rf ~/.claude/plugins/cache
```

### Reinstall Plugin
Uninstall and reinstall the plugin:

```bash
claude /plugin uninstall rubot@rulisme
claude /plugin install rubot@rulisme
```

### Sync Plugin Cache
Re-sync the plugin cache:

```bash
claude plugins sync
```

### Remove Broken Plugin
If a plugin is broken, remove it temporarily:

```bash
rm -rf ~/.claude/plugins/cache/claude-plugins-official/security-guidance
```

Then reload with plugin-dir:

```bash
claude --plugin-dir ~/.claude/plugins/rubot
```

## Quick Reference

| Command                                  | Description                          |
| ---------------------------------------- | ------------------------------------ |
| `/plugin marketplace add <path>`         | Add a local marketplace              |
| `/plugin install <name>@<marketplace>`   | Install a plugin                     |
| `/plugin uninstall <name>@<marketplace>` | Uninstall a plugin                   |
| `/plugin update <name>@<marketplace>`    | Update a plugin                      |
| `/plugin marketplace update <name>`      | Refresh marketplace                  |
| `claude plugins sync`                    | Sync plugin cache                    |
| `claude --plugin-dir <path>`             | Load plugin directly for development |

## Next Steps

- [Set Alias](/ai-llm/set-alias)

- [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code)
