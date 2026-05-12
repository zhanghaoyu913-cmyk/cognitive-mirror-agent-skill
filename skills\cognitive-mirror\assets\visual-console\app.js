const STORAGE_KEY = "cognitiveMirrorProfile.v1";

const categoryLabels = {
  learning_style: "Learning style",
  reasoning_style: "Reasoning style",
  decision_style: "Decision style",
  common_blockers: "Common blockers",
  ai_usage_patterns: "AI usage patterns",
  growth_goals: "Growth goals",
  assistant_adaptations: "Assistant adaptations",
};

const emptyProfile = () => ({
  profile_version: "0.1",
  user_id: "local-user",
  learning_style: [],
  reasoning_style: [],
  decision_style: [],
  common_blockers: [],
  ai_usage_patterns: [],
  growth_goals: [],
  assistant_adaptations: [],
  last_reviewed: new Date().toISOString().slice(0, 10),
});

let state = {
  mode: "direct",
  privacyLevel: "strict",
  interventionStrength: "balanced",
  profile: loadProfile(),
};

const els = {
  saveStatus: document.querySelector("#saveStatus"),
  modeGrid: document.querySelector("#modeGrid"),
  privacyLevel: document.querySelector("#privacyLevel"),
  interventionStrength: document.querySelector("#interventionStrength"),
  sessionRequest: document.querySelector("#sessionRequest"),
  agentPrompt: document.querySelector("#agentPrompt"),
  copyPrompt: document.querySelector("#copyPrompt"),
  resetConfig: document.querySelector("#resetConfig"),
  profileList: document.querySelector("#profileList"),
  entryForm: document.querySelector("#entryForm"),
  entryCategory: document.querySelector("#entryCategory"),
  entryConfidence: document.querySelector("#entryConfidence"),
  entrySummary: document.querySelector("#entrySummary"),
  entryEvidence: document.querySelector("#entryEvidence"),
  importProfile: document.querySelector("#importProfile"),
  exportProfile: document.querySelector("#exportProfile"),
  clearProfile: document.querySelector("#clearProfile"),
  profileFile: document.querySelector("#profileFile"),
  tabs: document.querySelectorAll(".tab"),
  tabPanels: document.querySelectorAll(".tab-panel"),
  observedPattern: document.querySelector("#observedPattern"),
  updateEvidence: document.querySelector("#updateEvidence"),
  possibleIntervention: document.querySelector("#possibleIntervention"),
  nextGrowthSuggestion: document.querySelector("#nextGrowthSuggestion"),
  updateConfidence: document.querySelector("#updateConfidence"),
  copyMemoryUpdate: document.querySelector("#copyMemoryUpdate"),
  saveMemoryAsEntry: document.querySelector("#saveMemoryAsEntry"),
  memoryPreview: document.querySelector("#memoryPreview"),
};

function loadProfile() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? normalizeProfile(JSON.parse(stored)) : emptyProfile();
  } catch {
    return emptyProfile();
  }
}

function normalizeProfile(profile) {
  const next = emptyProfile();
  Object.keys(next).forEach((key) => {
    if (Array.isArray(next[key])) {
      next[key] = Array.isArray(profile[key]) ? profile[key] : [];
    } else if (profile[key]) {
      next[key] = profile[key];
    }
  });
  next.last_reviewed = new Date().toISOString().slice(0, 10);
  return next;
}

function saveProfile() {
  state.profile.last_reviewed = new Date().toISOString().slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.profile, null, 2));
  setStatus("Saved");
  window.setTimeout(() => setStatus("Local"), 1200);
}

function setStatus(text) {
  els.saveStatus.textContent = text;
}

function generatePrompt() {
  const modeName = state.mode[0].toUpperCase() + state.mode.slice(1);
  const request = els.sessionRequest.value.trim() || "[write your request here]";
  const config = {
    mode: state.mode,
    privacy_level: state.privacyLevel,
    intervention_strength: state.interventionStrength,
    memory_policy: "Ask before saving durable profile updates. Store summaries, not raw private conversations.",
  };

  els.agentPrompt.value = [
    `Use $cognitive-mirror in ${modeName} Mode.`,
    `Privacy level: ${state.privacyLevel}. Intervention strength: ${state.interventionStrength}.`,
    "Follow the Cognitive Mirror rules: preserve user agency, use thinking-first when appropriate, and keep memory updates concise and reviewable.",
    "",
    "Mode configuration JSON:",
    JSON.stringify(config, null, 2),
    "",
    "User request:",
    request,
  ].join("\n");
}

function renderProfile() {
  const cards = [];
  Object.keys(categoryLabels).forEach((category) => {
    state.profile[category].forEach((entry, index) => {
      cards.push({ category, index, entry });
    });
  });

  if (!cards.length) {
    els.profileList.innerHTML = `
      <div class="profile-card">
        <h3>No profile entries yet</h3>
        <p>Add a high-level pattern, or import an existing Cognitive Mirror profile JSON.</p>
      </div>
    `;
    return;
  }

  els.profileList.innerHTML = cards
    .map(({ category, index, entry }) => `
      <article class="profile-card">
        <header>
          <h3>${escapeHtml(categoryLabels[category])}</h3>
          <button type="button" data-remove-category="${category}" data-remove-index="${index}">Remove</button>
        </header>
        <p><strong>Summary:</strong> ${escapeHtml(entry.summary)}</p>
        <p><strong>Evidence:</strong> ${escapeHtml(entry.evidence)}</p>
        <div class="meta-row">
          <span>Confidence: ${escapeHtml(entry.confidence)}</span>
          <span>Updated: ${escapeHtml(entry.updated_at)}</span>
        </div>
      </article>
    `)
    .join("");
}

function getMemoryUpdate() {
  return {
    observed_pattern: els.observedPattern.value.trim(),
    evidence: els.updateEvidence.value.trim(),
    confidence: els.updateConfidence.value,
    possible_intervention: els.possibleIntervention.value.trim(),
    next_growth_suggestion: els.nextGrowthSuggestion.value.trim(),
  };
}

function renderMemoryPreview() {
  els.memoryPreview.textContent = JSON.stringify(getMemoryUpdate(), null, 2);
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const temp = document.createElement("textarea");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.modeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.mode = button.dataset.mode;
  document.querySelectorAll(".mode-option").forEach((option) => {
    option.classList.toggle("is-active", option === button);
  });
  generatePrompt();
});

els.privacyLevel.addEventListener("change", () => {
  state.privacyLevel = els.privacyLevel.value;
  generatePrompt();
});

els.interventionStrength.addEventListener("change", () => {
  state.interventionStrength = els.interventionStrength.value;
  generatePrompt();
});

els.sessionRequest.addEventListener("input", generatePrompt);

els.copyPrompt.addEventListener("click", async () => {
  await copyText(els.agentPrompt.value);
  setStatus("Copied");
  window.setTimeout(() => setStatus("Local"), 1200);
});

els.resetConfig.addEventListener("click", () => {
  state.mode = "direct";
  state.privacyLevel = "strict";
  state.interventionStrength = "balanced";
  els.privacyLevel.value = state.privacyLevel;
  els.interventionStrength.value = state.interventionStrength;
  els.sessionRequest.value = "";
  document.querySelectorAll(".mode-option").forEach((option) => {
    option.classList.toggle("is-active", option.dataset.mode === "direct");
  });
  generatePrompt();
});

els.entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const summary = els.entrySummary.value.trim();
  const evidence = els.entryEvidence.value.trim();
  if (!summary || !evidence) {
    setStatus("Missing fields");
    return;
  }
  const category = els.entryCategory.value;
  state.profile[category].push({
    summary,
    evidence,
    confidence: els.entryConfidence.value,
    updated_at: new Date().toISOString().slice(0, 10),
  });
  els.entrySummary.value = "";
  els.entryEvidence.value = "";
  saveProfile();
  renderProfile();
});

els.profileList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-category]");
  if (!button) return;
  const category = button.dataset.removeCategory;
  const index = Number(button.dataset.removeIndex);
  state.profile[category].splice(index, 1);
  saveProfile();
  renderProfile();
});

els.exportProfile.addEventListener("click", () => {
  downloadJson("cognitive-mirror-profile.json", state.profile);
});

els.importProfile.addEventListener("click", () => {
  els.profileFile.click();
});

els.profileFile.addEventListener("change", async () => {
  const file = els.profileFile.files?.[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    state.profile = normalizeProfile(imported);
    saveProfile();
    renderProfile();
  } catch {
    setStatus("Import failed");
  } finally {
    els.profileFile.value = "";
  }
});

els.clearProfile.addEventListener("click", () => {
  const confirmed = window.confirm("Clear the local Cognitive Mirror profile?");
  if (!confirmed) return;
  state.profile = emptyProfile();
  saveProfile();
  renderProfile();
});

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    els.tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    els.tabPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === `${target}Tab`);
    });
  });
});

[
  els.observedPattern,
  els.updateEvidence,
  els.possibleIntervention,
  els.nextGrowthSuggestion,
  els.updateConfidence,
].forEach((input) => input.addEventListener("input", renderMemoryPreview));

els.copyMemoryUpdate.addEventListener("click", async () => {
  await copyText(JSON.stringify(getMemoryUpdate(), null, 2));
  setStatus("Copied");
  window.setTimeout(() => setStatus("Local"), 1200);
});

els.saveMemoryAsEntry.addEventListener("click", () => {
  const update = getMemoryUpdate();
  if (!update.observed_pattern || !update.evidence) {
    setStatus("Missing fields");
    return;
  }
  state.profile.reasoning_style.push({
    summary: update.observed_pattern,
    evidence: update.evidence,
    confidence: update.confidence,
    updated_at: new Date().toISOString().slice(0, 10),
  });
  saveProfile();
  renderProfile();
});

generatePrompt();
renderProfile();
renderMemoryPreview();
