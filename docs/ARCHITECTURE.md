# Architecture

## Purpose

This repository is an interaction and visual-direction prototype for the Memorika course shell. It is deliberately backend-free, but its boundaries mirror a future production application.

## Layers

```text
src/index.html              Semantic screens and accessible controls
src/styles/app.css          Prototype design system and responsive layout
src/scripts/core/           DOM, state, navigation and UI primitives
src/scripts/data/           Localized copy and exercise fixtures
src/scripts/features/       Reserved for independently owned product flows
src/assets/images/          Runtime image assets
```

`src/` is both the source of truth and the deployable static site. No generated copy is kept in the repository.

## Screen model

```text
campus
├── settings → practice → result → campus
└── AMAtraining → mission → practice → completion → AMAtraining
```

The screen names are stable product concepts, not URLs. A production implementation should introduce routing only when deep links, browser history, or analytics require it.

## Production boundaries

Replace the following prototype data with platform services:

- learner identity and course enrollment;
- teacher-assigned exercise parameters;
- exercise item generation;
- attempt submission and scoring;
- homework stage locking and completion;
- teacher comments and progress reporting;
- localization delivery.

The canonical public exercise names are `Words`, `Numbers`, `Pictures`, and `Grids`. Venue names such as `Story Studio` or `Pattern Lab` are secondary presentation copy and must never replace those exercise names in data contracts or analytics.

Free-training settings are stored per exercise type in browser `localStorage` for prototype continuity. Production persistence should be defined by the learner/settings service. `Grids` uses a dedicated shape/color/position view model rather than treating a grid as a text sequence.

Keep the visual components independent of those services. UI should consume typed view models rather than raw API responses.

## Recommended future feature modules

```text
features/
├── campus/       Academy navigation and course progress
├── training/     Settings, presentation, recall and scoring cycle
├── amatraining/  Stage route, locks and teacher assignment
├── completion/   Attempt outcome and next-stage state
└── profile/      Learner information, settings and achievements
```

Each module should own its tests, view components, state adapter and API contract.
