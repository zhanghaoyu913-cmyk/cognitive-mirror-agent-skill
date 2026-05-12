# Cognitive Mirror Agent Skill

A privacy-aware agent skill for understanding user thinking patterns, reducing AI overdependence, and supporting human cognitive growth.

> AI should not replace human thinking.  
> AI should help humans think better.

## 中文简介

Cognitive Mirror 是一个面向长期人机协作的 Agent Skill。它帮助 Agent 理解用户的思考方式、学习习惯、决策风格和 AI 使用方式，同时通过“先思考后求助”、发散思维和反思循环，促使用户保持主动思考，而不是把判断力完全交给 AI。

这个项目不是用户监控系统。它只记录对成长有帮助的高层次认知模式，并强调用户可查看、可修改、可导出、可删除。

## Features

- User thinking pattern profiling.
- AI overdependence detection.
- Thinking-first interaction protocol.
- Divergent thinking support.
- Reflection and growth loop.
- Privacy-aware memory design.
- User-editable cognitive profile structure.
- Offline visual console for mode selection and profile review.

## Repository Layout

```text
cognitive-mirror-agent-skill/
├── README.md
├── LICENSE
├── skills/
│   └── cognitive-mirror/
│       ├── SKILL.md
│       ├── agents/openai.yaml
│       ├── assets/visual-console/
│       └── references/
├── docs/
├── examples/
└── schemas/
```

The installable skill is in `skills/cognitive-mirror/`.

## Install Locally

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.codex\skills"
Copy-Item -Recurse ".\skills\cognitive-mirror" "$env:USERPROFILE\.codex\skills\"
```

macOS/Linux:

```bash
mkdir -p ~/.codex/skills
cp -R ./skills/cognitive-mirror ~/.codex/skills/
```

## Test It

See [docs/usage-and-testing.md](docs/usage-and-testing.md) for installation-free testing, local installation, validation commands, and manual behavior test prompts.

## Cross-Agent Use

The core package follows the `SKILL.md` folder pattern used by Agent Skills compatible tools. It can be installed for Codex, Claude Code, and other compatible agents by copying `skills/cognitive-mirror/` into that tool's skills directory.

See [docs/cross-agent-compatibility.md](docs/cross-agent-compatibility.md).

## Visual Console

Open the bundled offline console:

```text
skills/cognitive-mirror/assets/visual-console/index.html
```

The console lets the user choose response mode, privacy level, intervention strength, draft memory updates, edit a local browser-stored profile, and export profile JSON. See [docs/visual-console.md](docs/visual-console.md).

## Privacy Principles

This skill should record:

- Learning style.
- Reasoning style.
- Decision style.
- Preferred explanation format.
- Recurring blockers.
- AI usage habits.
- Growth goals.

This skill should not store:

- Raw private conversations.
- Passwords, tokens, or credentials.
- Precise location.
- Sensitive identity information.
- Health or mental-health assumptions.
- Unnecessary emotional details.
- Daily surveillance data.

Users should always have the right to review, edit, export, and delete their profile.

## MVP Behavior

After a meaningful conversation, the assistant can produce a short cognitive reflection:

```text
1. Thinking pattern:
The user tends to start from system-level purpose before feature lists.

2. Possible blind spot:
The design emphasizes recording and intervention, so privacy boundaries and user consent need explicit treatment.

3. Next thinking exercise:
Define the five profile fields worth recording and the five fields that must never be recorded.
```

## Project Status

This is an experimental design-first skill. The first version focuses on instructions, interaction protocols, examples, and schemas. Future versions can add demo storage adapters, profile review UIs, and automated evaluation prompts.
