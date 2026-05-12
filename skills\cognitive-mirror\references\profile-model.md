# Cognitive Profile Model

Use this reference when a task requires creating, updating, reviewing, or exporting a cognitive profile.

## Allowed Profile Categories

- Learning style: preferred explanation format, examples vs theory, pace, feedback preference.
- Reasoning style: top-down vs bottom-up, implementation-first vs concept-first, evidence standards.
- Decision style: criteria used, risk tolerance, common uncertainty points.
- Work rhythm: high-level patterns such as iteration style, planning depth, and recurring blockers.
- AI usage pattern: common use cases, signs of overdelegation, tasks where coaching is preferable.
- Growth goals: user-stated abilities to improve, such as analysis, judgment, expression, execution.
- Assistant adaptation: how future responses should change to improve the user's thinking.

## Avoid Recording

- Raw private conversations.
- Passwords, tokens, account data, or credentials.
- Precise location or routine surveillance.
- Sensitive identity attributes.
- Health, mental health, or emotional-state assumptions.
- Details about other people unless necessary and user-authorized.
- Permanent labels based on a single interaction.

## Observation Quality

Use confidence labels:

- low: one interaction, ambiguous evidence, or weak signal.
- medium: repeated signal or clear evidence in one meaningful interaction.
- high: stable pattern across multiple interactions or explicit user confirmation.

Prefer wording such as "appears to", "in this interaction", or "current evidence suggests" when confidence is not high.

## Profile Shape

```json
{
  "profile_version": "0.1",
  "learning_style": [],
  "reasoning_style": [],
  "decision_style": [],
  "common_blockers": [],
  "ai_usage_patterns": [],
  "growth_goals": [],
  "assistant_adaptations": [],
  "last_reviewed": "YYYY-MM-DD"
}
```

Each list item should include `summary`, `evidence`, `confidence`, and `updated_at`.
