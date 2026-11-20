import { $, $$ } from "./core/dom.js";
import { state } from "./core/state.js";
import { showScreen, showToast, updateRangeFill } from "./core/ui.js";
import { translations, zones } from "./data/content.js";

function t(key) {
  return translations[state.lang][key] || key;
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.title = lang === "ru"
    ? "Smartland Academy — прототип Memorika"
    : "Smartland Academy — Memorika prototype";

  $$('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[lang][key]) node.textContent = translations[lang][key];
  });

  const parts = $$(".lang-switch span");
  parts[0].classList.toggle("lang-active", lang === "ru");
  parts[1].classList.toggle("lang-active", lang === "en");
  updateZoneCopy();
  updateControls();
}

function updateZoneCopy() {
  const zone = zones[state.zone];
  if (!zone) return;
  $("#zone-kicker").textContent = zone.venue[state.lang];
  $("#zone-title").textContent = zone.title[state.lang];
}

function openSettings(zoneName) {
  state.zone = zoneName;
  state.mode = "free";
  updateZoneCopy();
  showScreen("settings");
}

function updateControls() {
  const speed = Number($("#speed").value);
  const count = Number($("#items").value);
  state.demoCount = count;
  const formatted = state.lang === "ru"
    ? speed.toFixed(1).replace(".", ",")
    : speed.toFixed(1);

  $("#speed-value").innerHTML = `${formatted} <small>${t("secondsShort")}</small>`;
  $("#items-value").textContent = count;
  $("#summary-items").textContent = count;
  $("#summary-time").textContent = `${Math.round(count * speed + 25)} ${t("secondsShort")}`;
  updateRangeFill($("#speed"));
  updateRangeFill($("#items"));
}

function startPractice(mode = "free") {
  state.mode = mode;
  if (mode === "homework") {
    state.zone = "words";
    state.demoCount = 5;
  } else {
    state.demoCount = Number($("#items").value);
  }

  const items = zones[state.zone].items[state.lang]
    .slice(0, Math.min(state.demoCount, 5));
  const speed = mode === "homework"
    ? 1300
    : Math.max(650, Number($("#speed").value) * 700);
  const stage = $("#practice-stage");
  const recall = $("#recall-form");
  const title = $("#practice-title");
  const current = $("#practice-current");
  const total = $("#practice-total");
  const bar = $("#practice-bar");

  recall.hidden = true;
  stage.hidden = false;
  total.textContent = items.length;
  current.textContent = "1";
  bar.style.width = `${100 / items.length}%`;
  title.textContent = "3";
  $("#practice-kicker").textContent = t("remember");
  showScreen("practice", false);

  ["2", "1"].forEach((value, index) => {
    state.timers.push(setTimeout(() => {
      title.textContent = value;
    }, 600 * (index + 1)));
  });

  items.forEach((item, index) => {
    state.timers.push(setTimeout(() => {
      title.textContent = item;
      current.textContent = String(index + 1);
      bar.style.width = `${((index + 1) / items.length) * 100}%`;
    }, 1900 + speed * index));
  });

  state.timers.push(setTimeout(() => {
    stage.hidden = true;
    recall.hidden = false;
    $("#recall-input").value = "";
    $("#recall-input").focus();
  }, 1900 + speed * items.length + 400));
}

function evaluateRecall() {
  const expected = zones[state.zone].items[state.lang][0].toLocaleLowerCase();
  const answer = $("#recall-input").value.trim().toLocaleLowerCase();
  const correct = answer === expected || (state.zone === "images" && answer.length > 0);

  if (state.mode === "homework") {
    showScreen("discovery");
    showToast(correct ? t("correctToast") : t("tryToast"));
    return;
  }

  $("#accuracy").textContent = correct ? "100%" : "80%";
  showScreen("result");
  showToast(correct ? t("correctToast") : t("tryToast"));
}

function bindEvents() {
  $$('[data-zone]').forEach((button) => {
    button.addEventListener("click", () => openSettings(button.dataset.zone));
  });

  $$('[data-action]').forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "home") showScreen("campus");
      if (action === "language") setLanguage(state.lang === "ru" ? "en" : "ru");
      if (action === "homework") showScreen("homework");
      if (action === "mission") showScreen("mission");
      if (action === "start-mission") startPractice("homework");
      if (action === "repeat") startPractice("free");
      if (action === "leave-practice") {
        showScreen(state.mode === "homework" ? "mission" : "settings");
        showToast(t("leavePrompt"));
      }
    });
  });

  $$(".segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".segmented button").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
    });
  });

  $("#speed").addEventListener("input", updateControls);
  $("#items").addEventListener("input", updateControls);
  $("#training-form").addEventListener("submit", (event) => {
    event.preventDefault();
    startPractice("free");
  });
  $("#recall-form").addEventListener("submit", (event) => {
    event.preventDefault();
    evaluateRecall();
  });
  $(".avatar-button").addEventListener("click", () => {
    showToast(state.lang === "ru"
      ? "Профиль ученика не входит в этот прототип."
      : "The learner profile is outside this prototype.");
  });
}

bindEvents();
setLanguage("ru");
updateControls();
