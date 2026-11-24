import { $, $$ } from "./core/dom.js";
import { restoreSettings, saveSettings, state } from "./core/state.js";
import { showScreen, showToast, updateRangeFill } from "./core/ui.js";
import { translations, zones } from "./data/content.js";

function t(key) {
  return translations[state.lang][key] || key;
}

function hideMindyGreeting() {
  $("#mindy-greeting").classList.add("is-hidden");
}

function showMindyGreeting() {
  const greeting = $("#mindy-greeting");
  greeting.classList.remove("is-hidden");
  state.timers.push(setTimeout(hideMindyGreeting, 5000));
}

function itemKey(item) {
  return typeof item === "object" ? item.id : String(item).toLocaleLowerCase();
}

function formatSpeed(value) {
  return state.lang === "ru"
    ? Number(value).toFixed(1).replace(".", ",")
    : Number(value).toFixed(1);
}

function renderGrid(pattern, compact = false) {
  const cells = Array.from({ length: 9 }, (_, slot) => {
    const item = pattern.cells.find((cell) => cell.slot === slot);
    if (!item) return '<span class="memory-cell"></span>';
    return `<span class="memory-cell"><i class="memory-shape ${item.shape}" style="--shape-color:${item.color}"></i></span>`;
  }).join("");
  return `<span class="memory-grid${compact ? " is-compact" : ""}" aria-label="Grid pattern">${cells}</span>`;
}

function renderTrainerMotif() {
  const motif = $("#trainer-motif");
  const items = zones[state.zone].items[state.lang];
  if (state.zone === "grids") {
    motif.innerHTML = items.slice(0, 3).map((item) => `<span class="motif-card">${renderGrid(item, true)}</span>`).join("");
    return;
  }

  const className = state.zone === "pictures"
    ? "motif-card motif-picture"
    : state.zone === "numbers"
      ? "motif-card motif-number"
      : "motif-card motif-word";
  motif.innerHTML = items.slice(0, 3).map((item) => `<span class="${className}">${item}</span>`).join("");
}

function renderPracticeItem(item) {
  const content = $("#practice-content");
  if (state.zone === "grids") {
    content.innerHTML = `<div id="practice-title" role="img" aria-label="Grid pattern">${renderGrid(item)}</div>`;
    return;
  }
  if (state.zone === "pictures") {
    content.innerHTML = `<div class="picture-item" id="practice-title">${item}</div>`;
    return;
  }
  if (state.zone === "numbers") {
    content.innerHTML = `<div class="number-item" id="practice-title">${item}</div>`;
    return;
  }
  content.innerHTML = `<h2 id="practice-title">${item}</h2>`;
}

function updateZoneCopy() {
  const zone = zones[state.zone];
  if (!zone) return;
  $("#zone-kicker").textContent = zone.venue[state.lang];
  $("#zone-title").textContent = zone.title[state.lang];
  $("#zone-instruction").textContent = zone.instruction[state.lang];
  $("#guide-card").style.setProperty("--zone", zone.colors.base);
  $("#guide-card").style.setProperty("--zone-dark", zone.colors.dark);
  renderTrainerMotif();
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.title = lang === "ru"
    ? "Smartland Campus — прототип Memorika"
    : "Smartland Campus — Memorika prototype";

  $$('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[lang][key]) node.textContent = translations[lang][key];
  });

  const parts = $$(".lang-switch span");
  parts[0].classList.toggle("lang-active", lang === "ru");
  parts[1].classList.toggle("lang-active", lang === "en");

  if (state.practiceItems.length) {
    state.practiceItems = zones[state.zone].items[lang].slice(0, state.practiceItems.length);
  }
  updateZoneCopy();
  updateControls(false);
  if (state.screen === "practice" && !$("#recall-form").hidden) updateRecallStep();
}

function loadZoneSettings() {
  const settings = state.settings[state.zone];
  $("#difficulty").value = settings.difficulty;
  $("#speed").value = settings.speed;
  $("#items").value = settings.items;
  updateControls(false);
}

function storeZoneSettings() {
  state.settings[state.zone] = {
    difficulty: Number($("#difficulty").value),
    speed: Number($("#speed").value),
    items: Number($("#items").value)
  };
  saveSettings();
}

function openSettings(zoneName) {
  state.zone = zoneName;
  state.mode = "free";
  updateZoneCopy();
  loadZoneSettings();
  showScreen("settings");
}

function updateControls(persist = true) {
  const difficulty = Number($("#difficulty").value);
  const speed = Number($("#speed").value);
  const count = Number($("#items").value);
  state.demoCount = count;

  $("#difficulty-value").textContent = `${difficulty} / 10`;
  $("#speed-value").innerHTML = `${formatSpeed(speed)} <small>${t("secondsShort")}</small>`;
  $("#items-value").textContent = count;
  $("#summary-items").textContent = count;
  $("#summary-time").textContent = `${Math.round(count * speed + 10)} ${t("secondsShort")}`;

  [$("#difficulty"), $("#speed"), $("#items")].forEach(updateRangeFill);
  if (persist) storeZoneSettings();
}

function startPractice(mode = "free") {
  state.mode = mode;
  if (mode === "homework") {
    state.zone = "words";
    state.demoCount = 5;
  } else {
    storeZoneSettings();
    state.demoCount = Number($("#items").value);
  }

  state.practiceItems = zones[state.zone].items[state.lang].slice(0, state.demoCount);
  state.recallIndex = 0;
  state.correctAnswers = 0;
  state.selectedChoice = "";

  const speedValue = mode === "homework" ? 2 : state.settings[state.zone].speed;
  const speed = Math.max(500, speedValue * 650);
  const stage = $("#practice-stage");
  const recall = $("#recall-form");
  const current = $("#practice-current");
  const total = $("#practice-total");
  const bar = $("#practice-bar");

  recall.hidden = true;
  stage.hidden = false;
  total.textContent = state.practiceItems.length;
  current.textContent = "1";
  bar.style.width = `${100 / state.practiceItems.length}%`;
  $("#practice-content").innerHTML = '<h2 id="practice-title">3</h2>';
  $("#practice-kicker").textContent = t("remember");
  showScreen("practice", false);

  ["2", "1"].forEach((value, index) => {
    state.timers.push(setTimeout(() => {
      $("#practice-content").innerHTML = `<h2 id="practice-title">${value}</h2>`;
    }, 550 * (index + 1)));
  });

  state.practiceItems.forEach((item, index) => {
    state.timers.push(setTimeout(() => {
      renderPracticeItem(item);
      current.textContent = String(index + 1);
      bar.style.width = `${((index + 1) / state.practiceItems.length) * 100}%`;
    }, 1700 + speed * index));
  });

  state.timers.push(setTimeout(beginRecall, 1700 + speed * state.practiceItems.length + 300));
}

function beginRecall() {
  $("#practice-stage").hidden = true;
  $("#recall-form").hidden = false;
  state.recallIndex = 0;
  state.correctAnswers = 0;
  updateRecallStep();
}

function candidateItems() {
  const allItems = zones[state.zone].items[state.lang];
  const correct = state.practiceItems[state.recallIndex];
  const candidates = [correct];
  let cursor = state.practiceItems.length + state.recallIndex;
  while (candidates.length < 6) {
    const next = allItems[cursor % allItems.length];
    if (!candidates.some((item) => itemKey(item) === itemKey(next))) candidates.push(next);
    cursor += 1;
    if (cursor > allItems.length * 3) break;
  }
  const offset = state.recallIndex % candidates.length;
  return [...candidates.slice(offset), ...candidates.slice(0, offset)];
}

function renderHints() {
  const container = $("#hint-options");
  container.innerHTML = "";
  candidateItems().forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hint-option";
    button.dataset.value = itemKey(item);
    if (state.zone === "grids") {
      button.innerHTML = renderGrid(item, true);
    } else {
      button.textContent = item;
      if (state.zone === "pictures") button.classList.add("hint-option--picture");
    }
    button.addEventListener("click", () => {
      state.selectedChoice = button.dataset.value;
      $("#recall-input").value = button.dataset.value;
      $$(".hint-option", container).forEach((option) => option.classList.toggle("is-selected", option === button));
    });
    container.append(button);
  });
}

function updateRecallStep() {
  const total = state.practiceItems.length;
  state.selectedChoice = "";
  $("#recall-current").textContent = String(state.recallIndex + 1);
  $("#recall-total").textContent = String(total);
  $("#recall-input").value = "";
  $("#recall-label").hidden = state.zone === "pictures" || state.zone === "grids";
  $("#answer-hint").textContent = state.zone === "grids" ? t("gridAnswerHint") : t("answerHint");
  $("#recall-submit").textContent = state.recallIndex === total - 1 ? t("finish") : t("nextAnswer");
  renderHints();
  if (!$("#recall-label").hidden) $("#recall-input").focus();
}

function finishRecall() {
  const total = state.practiceItems.length;
  const accuracy = Math.round((state.correctAnswers / total) * 100);
  $("#accuracy").textContent = `${accuracy}%`;
  $("#completed-count").textContent = `${total} / ${total}`;
  $("#result-tempo").textContent = `${formatSpeed(state.mode === "homework" ? 2 : state.settings[state.zone].speed)} ${t("secondsShort")}`;

  if (state.mode === "homework") {
    showScreen("discovery");
    showToast(t("correctToast"));
    return;
  }
  showScreen("result");
  showToast(t("tryToast"));
}

function evaluateRecallStep() {
  const expected = itemKey(state.practiceItems[state.recallIndex]);
  const answer = (state.selectedChoice || $("#recall-input").value.trim().toLocaleLowerCase());
  if (!answer) {
    $("#recall-input").focus();
    return;
  }
  if (answer === expected) state.correctAnswers += 1;

  if (state.recallIndex < state.practiceItems.length - 1) {
    state.recallIndex += 1;
    updateRecallStep();
    return;
  }
  finishRecall();
}

function bindEvents() {
  $$('[data-zone]').forEach((button) => {
    button.addEventListener("click", () => openSettings(button.dataset.zone));
  });

  $$('[data-action]').forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "home") {
        showScreen("campus");
        showMindyGreeting();
      }
      if (action === "back") {
        if (window.history.length > 1) window.history.back();
        else showToast(state.lang === "ru" ? "Возврат на платформу." : "Return to the platform.");
      }
      if (action === "language") setLanguage(state.lang === "ru" ? "en" : "ru");
      if (action === "homework") showScreen("homework");
      if (action === "fact") showScreen("discovery");
      if (action === "mission") showScreen("mission");
      if (action === "close-greeting") hideMindyGreeting();
      if (action === "start-mission") startPractice("homework");
      if (action === "repeat") startPractice("free");
      if (action === "leave-practice") {
        showScreen(state.mode === "homework" ? "mission" : "settings");
        showToast(t("leavePrompt"));
      }
    });
  });

  [$("#difficulty"), $("#speed"), $("#items")].forEach((input) => {
    input.addEventListener("input", () => updateControls(true));
  });

  $("#training-form").addEventListener("submit", (event) => {
    event.preventDefault();
    startPractice("free");
  });
  $("#recall-form").addEventListener("submit", (event) => {
    event.preventDefault();
    evaluateRecallStep();
  });
  $(".avatar-button").addEventListener("click", () => {
    showToast(state.lang === "ru"
      ? "Профиль ученика не входит в этот прототип."
      : "The learner profile is outside this prototype.");
  });
}

function openInitialRoute() {
  const route = window.location.hash.replace(/^#\/?/, "");
  if (route.startsWith("settings/")) {
    const requestedZone = route.split("/")[1];
    const zone = requestedZone === "images" ? "pictures" : requestedZone;
    if (zones[zone]) {
      openSettings(zone);
      return;
    }
  }

  const screenRoutes = {
    campus: "campus",
    amatraining: "homework",
    "amatraining/question": "mission",
    "amatraining/fact": "discovery"
  };
  const screen = screenRoutes[route] || "campus";
  showScreen(screen, false);
  if (screen === "campus") showMindyGreeting();
}

restoreSettings();
bindEvents();
loadZoneSettings();
setLanguage(new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "ru");
openInitialRoute();
window.addEventListener("hashchange", openInitialRoute);
