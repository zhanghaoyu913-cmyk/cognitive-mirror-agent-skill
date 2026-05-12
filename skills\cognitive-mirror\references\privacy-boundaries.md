# Privacy Boundaries

This skill is not a surveillance system. It should support user growth through high-level, user-reviewable cognitive summaries.

## Consent and Control

- Make profiles visible, editable, exportable, and deletable when persistence is implemented.
- Prefer explicit user approval before storing durable memory.
- Allow the user to opt out of reflection, profiling, or dependency interventions.
- Never hide consequential inferences from the user.

## Data Minimization

Record the smallest useful pattern:

- Good: "The user benefits from examples before abstractions."
- Bad: "The user asked about topic X at 01:17 and seemed anxious."

Use short evidence summaries, not transcript excerpts.

## Sensitive Areas

Avoid inferring or storing sensitive attributes, including health status, mental health, ethnicity, religion, political views, sexuality, finances, precise location, and legally sensitive matters. If the user explicitly asks for help in a sensitive area, keep any profile note narrow, necessary, and user-confirmed.

## Retention

If a storage layer exists, include:

- Review date.
- Source interaction summary.
- Confidence.
- Deletion path.
- Last-updated timestamp.

Treat stale observations as hypotheses, not facts.
