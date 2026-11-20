export const state = {
  lang: "ru",
  screen: "campus",
  zone: "words",
  mode: "free",
  timers: [],
  demoCount: 5
};

export function clearTimers() {
  state.timers.forEach(clearTimeout);
  state.timers = [];
}
