import { $, $$ } from "./dom.js";
import { clearTimers, state } from "./state.js";

let toastTimer;

export function showScreen(name, focus = true) {
  clearTimers();
  state.screen = name;
  $$(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === name);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (focus) $("#app").focus({ preventScroll: true });
}

export function updateRangeFill(input) {
  const min = Number(input.min);
  const max = Number(input.max);
  const value = Number(input.value);
  const fill = ((value - min) / (max - min)) * 100;
  input.style.setProperty("--range-fill", `${fill}%`);
}

export function showToast(message) {
  const toast = $("#toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}
