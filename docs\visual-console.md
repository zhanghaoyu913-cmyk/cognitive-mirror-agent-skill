# Visual Console

Cognitive Mirror can be paired with a local visual console:

```text
skills/cognitive-mirror/assets/visual-console/index.html
```

The console is a static offline page. It does not need a server and does not send data anywhere.

## What It Does

- Select response mode: Direct, Coaching, Challenge, Divergent, Reflection.
- Select privacy level.
- Select intervention strength.
- Draft a user request.
- Generate an agent prompt that invokes `$cognitive-mirror`.
- Edit a local cognitive profile.
- Draft a memory update before saving it.
- Import and export profile JSON.
- Clear local profile data.

## What It Cannot Guarantee

An agent skill cannot universally force every host to automatically open a custom page. Skills are primarily instruction and resource bundles. Automatic UI launch depends on whether the host environment gives the agent browser or app-control tools.

The practical integration model is:

1. The user or agent opens `visual-ui/index.html`.
2. The user selects mode, privacy, and intervention settings.
3. The console generates an agent prompt.
4. The agent follows the prompt and the installed `$cognitive-mirror` skill.
5. Any durable memory update remains reviewable before saving.

## Recommended Host Behavior

When the user asks for mode selection, visual configuration, profile review, or a dedicated Cognitive Mirror page, the agent should offer to open or point to the local visual console.

## Privacy Model

The current console stores profile entries in browser `localStorage`. This is local to the browser profile and can be cleared with the Clear button. For portable or auditable storage, use Export and keep the JSON file under user control.
