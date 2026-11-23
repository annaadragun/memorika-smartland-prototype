export const state = {
  lang: "ru",
  screen: "campus",
  zone: "words",
  mode: "free",
  timers: [],
  demoCount: 5,
  practiceItems: [],
  recallIndex: 0,
  correctAnswers: 0,
  selectedChoice: "",
  settings: {
    words: { difficulty: 5, speed: 2, items: 5 },
    numbers: { difficulty: 5, speed: 2, items: 5 },
    pictures: { difficulty: 5, speed: 2, items: 5 },
    grids: { difficulty: 5, speed: 2, items: 5 }
  }
};

const storageKey = "memorika-smartland-training-settings-v2";

export function restoreSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || typeof saved !== "object") return;
    Object.keys(state.settings).forEach((zone) => {
      if (!saved[zone]) return;
      state.settings[zone] = { ...state.settings[zone], ...saved[zone] };
    });
  } catch {
    localStorage.removeItem(storageKey);
  }
}

export function saveSettings() {
  localStorage.setItem(storageKey, JSON.stringify(state.settings));
}

export function clearTimers() {
  state.timers.forEach(clearTimeout);
  state.timers = [];
}
