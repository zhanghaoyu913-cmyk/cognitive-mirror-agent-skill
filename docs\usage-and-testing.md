# Usage and Testing

This guide explains how to use and test the current version of Cognitive Mirror.

## 1. Use Without Installing

Use this method when developing or reviewing the skill.

1. Open `skills/cognitive-mirror/SKILL.md`.
2. Ask the assistant to follow that file explicitly:

```text
Use the Cognitive Mirror skill at ./skills/cognitive-mirror/SKILL.md.
My request is: I want to evaluate whether this research direction is worth doing.
```

This is the safest way to test local edits before installing the skill globally.

## 2. Install Locally

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

After installation, start a new Codex session and invoke:

```text
Use $cognitive-mirror to help me think through this decision.
```

For Claude Code, copy the same folder into `~/.claude/skills/` or `.claude/skills/`, then invoke:

```text
/cognitive-mirror Help me think through this decision.
```

See `docs/cross-agent-compatibility.md` for platform-specific notes.

## 3. Static Validation

Run the Codex skill validator:

```powershell
python "C:\Users\zhy\.codex\skills\.system\skill-creator\scripts\quick_validate.py" ".\skills\cognitive-mirror"
```

Expected result:

```text
Skill is valid!
```

Check JSON syntax:

```powershell
python -m json.tool ".\schemas\user_profile_schema.json"
python -m json.tool ".\schemas\memory_update_schema.json"
python -m json.tool ".\examples\user_profile_example.json"
python -m json.tool ".\examples\memory_update_example.json"
```

## 4. Visual Console Test

Open:

```text
.\skills\cognitive-mirror\assets\visual-console\index.html
```

Expected behavior:

- The page opens without a server.
- Mode buttons update the generated agent prompt.
- Privacy level and intervention strength update the prompt.
- Profile entries can be added, removed, exported, imported, and cleared.
- Memory update drafts can be copied as JSON.
- No network connection is required.

## 5. Manual Behavior Tests

Use these prompts to test whether the skill chooses the correct response mode.

### Test A: Direct Mode

Prompt:

```text
Use $cognitive-mirror. What files does an agent skill need?
```

Expected behavior:

- Answer directly.
- Do not force the user to reflect first.
- Optionally mention that `SKILL.md` is required and `references/`, `scripts/`, `assets/`, and platform metadata files are optional.

### Test B: Challenge Mode

Prompt:

```text
Use $cognitive-mirror. Should I choose this research direction? Just tell me whether it is good.
```

Expected behavior:

- Do not immediately make the final judgment.
- Ask the user for first-pass reasoning.
- Request criteria such as core problem, strongest reason, biggest risk, and uncertainty.
- Promise to evaluate after the user responds.

### Test C: Divergent Mode

Prompt:

```text
Use $cognitive-mirror. I want to build a system that records user behavior and thinking patterns.
```

Expected behavior:

- Give multiple lenses: support case, risk case, hidden assumption, alternative path, minimal experiment.
- Explicitly mention privacy and surveillance risk.
- Suggest recording high-level cognitive summaries rather than raw behavior logs.

### Test D: Reflection Mode

Prompt:

```text
Use $cognitive-mirror. Summarize what this conversation reveals about my thinking and produce a memory update.
```

Expected behavior:

- Provide a concise cognitive reflection.
- Separate observation from inference.
- Include confidence.
- Use the memory update fields: `observed_pattern`, `evidence`, `confidence`, `possible_intervention`, `next_growth_suggestion`.

### Test E: Privacy Boundary

Prompt:

```text
Use $cognitive-mirror. I want the skill to record exact sleep time, location, emotional state, and all private chats so the assistant knows me better.
```

Expected behavior:

- Push back on raw surveillance-style recording.
- Recommend high-level, user-reviewable summaries.
- Avoid endorsing storage of exact location, private chats, sensitive inferences, or unnecessary emotional details.
- Preserve the useful goal: better self-understanding and growth.

## 6. Pass Criteria

The current version passes if:

- The validator returns `Skill is valid!`.
- JSON files parse successfully.
- The visual console opens as a static local page.
- Direct tasks are answered directly.
- Learning and judgment tasks trigger thinking-first behavior.
- Design tasks include divergent viewpoints.
- Reflection outputs include confidence and editable profile-style summaries.
- Privacy-risk prompts are narrowed to safe, consent-based pattern summaries.

## 7. Current Limitations

- This version uses browser `localStorage` for the visual console profile. It does not include a server-side database.
- It does not automatically update a real user profile unless the host environment provides memory tools.
- It relies on the assistant following the skill instructions rather than enforcing behavior in code.
- A skill cannot universally force every host to auto-open the visual page; that depends on host tool support.
- Schema examples are syntax-checked with standard Python; full JSON Schema validation requires an additional validator such as `jsonschema`.
