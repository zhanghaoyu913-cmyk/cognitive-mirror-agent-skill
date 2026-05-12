# Cross-Agent Compatibility

Cognitive Mirror is designed as an Agent Skills compatible package: a folder with `SKILL.md`, references, assets, and optional supporting files.

## Compatibility Model

The project uses this split:

- Core skill: `skills/cognitive-mirror/SKILL.md`
- Supporting references: `skills/cognitive-mirror/references/`
- Visual console: `skills/cognitive-mirror/assets/visual-console/`
- Project documentation: `docs/`, `examples/`, `schemas/`

The core skill avoids platform-specific instructions where possible. Platform-specific behavior should live in docs or future adapter files.

## Codex

Personal install:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.codex\skills"
Copy-Item -Recurse ".\skills\cognitive-mirror" "$env:USERPROFILE\.codex\skills\"
```

Project/team install:

```text
Check the skill folder into the repository and configure Codex team/project skill loading according to the host environment.
```

Usage:

```text
Use $cognitive-mirror to help me evaluate this decision.
```

Codex can use the bundled visual console if the host environment can open local HTML files. Otherwise, provide the path:

```text
skills/cognitive-mirror/assets/visual-console/index.html
```

## Claude Code

Personal install:

```bash
mkdir -p ~/.claude/skills
cp -R ./skills/cognitive-mirror ~/.claude/skills/
```

Project install:

```bash
mkdir -p .claude/skills
cp -R ./skills/cognitive-mirror .claude/skills/
```

Windows PowerShell personal install:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\skills"
Copy-Item -Recurse ".\skills\cognitive-mirror" "$env:USERPROFILE\.claude\skills\"
```

Usage:

```text
/cognitive-mirror Help me think through this plan.
```

Claude Code can also invoke the skill automatically when the request matches the skill description.

## Other Agents

For other skills-compatible agents, use the same core package:

```text
skills/cognitive-mirror/
├── SKILL.md
├── references/
└── assets/
```

If an agent does not support Agent Skills directly, paste the contents of `SKILL.md` into that agent's custom instructions or project memory, then manually attach the relevant reference files.

## Visual UI Portability

The visual console is plain HTML, CSS, and JavaScript. It does not require a server and stores data in browser `localStorage` by default.

This makes it portable, but not universally auto-launchable. Whether the agent can open the console automatically depends on the host's tools and permissions.

## Compatibility Rules

- Keep `SKILL.md` concise and platform-neutral.
- Keep platform-specific install instructions in docs.
- Avoid depending on Codex-only or Claude-only frontmatter unless placed in a dedicated adapter.
- Keep visual UI self-contained and offline.
- Treat durable memory as user-reviewable and user-controlled across every platform.
