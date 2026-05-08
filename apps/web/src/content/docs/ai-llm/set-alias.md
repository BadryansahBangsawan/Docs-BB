---
title: Setup Alias on macOS
description: A step-by-step guide to configure custom shell aliases for Claude CLI and other tools on macOS.
category: AI & LLM
author: Badry
date: 2026-05-08
order: 11
source: https://docs.bahrul.me/ai-llm/set-alias
---

# Setup Alias on macOS

## Prerequisites

Before setting up aliases, ensure you have the following installed:

> **Info:**
macOS ships with Zsh as the default shell since Catalina (10.15). This guide assumes you're using Zsh.

### Required Tools

| Tool       | Purpose                       | Installation                                                            |      |
| ---------- | ----------------------------- | ----------------------------------------------------------------------- | ---- |
| Homebrew   | Package manager for macOS     | [brew.sh](https://brew.sh)                                              |      |
| Zsh        | Default shell (pre-installed) | Included in macOS                                                       |      |
| Claude CLI | Anthropic's CLI tool          | curl -fsSL [https://claude.ai/install.sh](https://claude.ai/install.sh) | bash |

### Install Homebrew

If you don't have Homebrew installed, run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install Claude CLI

### Native Install (Recommended)
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Homebrew
```bash
brew install --cask claude-code
```

### Bun
```bash
bun add -g @anthropic-ai/claude-code
```

## Understanding Shell Configuration Files

> **Warn:**
Always backup your shell configuration before making changes: `cp ~/.zshrc ~/.zshrc.backup`

On macOS with Zsh, aliases are typically stored in:

* `~/.zshrc` - Main Zsh configuration file
* `~/.zsh_aliases` - Dedicated file for aliases (optional)

## Setting Up Aliases

### Open Your Zsh Configuration

Open your `.zshrc` file in your preferred editor:

```bash
# Using nano (built-in)
nano ~/.zshrc

# Using VS Code
code ~/.zshrc

# Using Zed
zed ~/.zshrc
```

### Add Your Aliases

Add the following aliases at the end of the file:

```bash title="~/.zshrc"
# Claude CLI Aliases
# ------------------

# Claude with Z.AI API
alias zai='ANTHROPIC_API_KEY="YOUR_API_KEY" \
ANTHROPIC_BASE_URL="https://api.z.ai/api/anthropic" \
API_TIMEOUT_MS="3000000" \
ANTHROPIC_MODEL="glm-4.7" \
ANTHROPIC_SMALL_FAST_MODEL="glm-4.6" \
ANTHROPIC_DEFAULT_HAIKU_MODEL="glm-4.6" \
ANTHROPIC_DEFAULT_SONNET_MODEL="glm-4.7" \
ANTHROPIC_DEFAULT_OPUS_MODEL="glm-4.7" \
claude --dangerously-skip-permissions'

# Claude with MiniMax API
alias minimax='ANTHROPIC_API_KEY="YOUR_API_KEY" \
ANTHROPIC_BASE_URL="https://api.minimax.io/anthropic" \
API_TIMEOUT_MS="3000000" \
ANTHROPIC_MODEL="MiniMax-M2.1" \
ANTHROPIC_SMALL_FAST_MODEL="MiniMax-M2.1" \
ANTHROPIC_DEFAULT_OPUS_MODEL="MiniMax-M2.1" \
ANTHROPIC_DEFAULT_SONNET_MODEL="MiniMax-M2.1" \
ANTHROPIC_DEFAULT_HAIKU_MODEL="MiniMax-M2.1" \
claude --dangerously-skip-permissions'

# Claude Skip Permissions
alias claude-skip='claude --dangerously-skip-permissions'

# Editor Shortcuts
# ----------------
alias edit-alias='zed ~/.zshrc'
alias edit-claude='zed ~/.claude.json'
alias edit-claude-skills='zed ~/.claude/skills/'
alias edit-claude-agents='zed ~/.claude/agents/'
alias edit-claude-commands='zed ~/.claude/commands/'
alias edit-claude-plugins='zed ~/.claude/plugins'
alias edit-sh='zed ~/.zsh_functions/'
```

### Replace API Keys

> **Error:**
Never commit API keys to version control. Replace `YOUR_API_KEY` with your actual API key.

Replace `YOUR_API_KEY` with your actual API keys from:

* Z.AI: Get your key from the Z.AI dashboard
* MiniMax: Get your key from the MiniMax console

### Apply Changes

Save the file and reload your shell configuration:

```bash
source ~/.zshrc
```

Or simply open a new terminal window.

## Verifying Your Aliases

Check if your aliases are set up correctly:

```bash
# List all aliases
alias

# Test a specific alias
which claude-skip
```

## Usage Examples

### Claude Skip
```bash
# Run Claude CLI skipping permission prompts
claude-skip
```

### Z.AI
```bash
# Run Claude with Z.AI backend
zai
```

### MiniMax
```bash
# Run Claude with MiniMax backend
minimax
```

## Editor Aliases Quick Reference

| Alias                  | Opens                 |
| ---------------------- | --------------------- |
| `edit-alias`           | `~/.zshrc`            |
| `edit-claude`          | `~/.claude.json`      |
| `edit-claude-skills`   | `~/.claude/skills/`   |
| `edit-claude-agents`   | `~/.claude/agents/`   |
| `edit-claude-commands` | `~/.claude/commands/` |
| `edit-claude-plugins`  | `~/.claude/plugins`   |
| `edit-sh`              | `~/.zsh_functions/`   |

## Troubleshooting

### Alias not found after adding
Make sure you've reloaded your shell configuration:

```bash
source ~/.zshrc
```

Or open a new terminal window.

### Command not found: claude
Ensure Claude CLI is installed globally:

```bash
bun add -g @anthropic-ai/claude-code
```

Verify installation:

```bash
which claude
```

### API authentication errors
Double-check that:

1. Your API key is correct and active
2. The API key is properly quoted in the alias
3. No extra spaces exist around the `=` signs
