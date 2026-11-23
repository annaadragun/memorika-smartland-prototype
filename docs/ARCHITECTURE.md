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

The screen names are stable product concepts. The prototype exposes lightweight hash routes for design review; a production implementation should map them to the platform router and analytics conventions.

## Production boundaries

Replace the following prototype data with platform services:

- learner identity and course enrollment;
- teacher-assigned exercise parameters;
- exercise item generation;
- attempt submission and scoring;
- homework stage locking and completion;
- teacher comments and progress reporting;
- localization delivery.

The canonical exercise IDs are `words`, `numbers`, `pictures`, and `grids`. Their public English labels are `Words`, `Numbers`, `Pictures`, and `Grids`. Venue signs are fixed presentation copy: `Story Library`, `Code Lab`, `Visual Gallery`, `Focus Observatory`, and `Mission Center`; they must never replace exercise IDs in data contracts or analytics. Russian venue translations live in the localization layer.

The campus is a scroll-free application surface below the shared compact system header. A centered 16:9 scene preserves all five buildings while a softened cover layer fills non-16:9 viewports. Accessible HTML overlays provide four symmetric glass icon-title-venue trainer cards, the localized curved illuminated academy name, Mindy, and the white bottom AMAtraining dock; no navigation text or controls are baked into the campus bitmap. URL hashes expose safe prototype screens directly for design review.

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
