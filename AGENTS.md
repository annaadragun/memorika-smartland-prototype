# Project instructions

## Source of truth

- `src/` is the canonical editable prototype. Make UI, copy, localization, interaction, and asset changes there.
- GitHub Pages publishes `src/` directly. There is no build directory or build step.
- Keep all runtime assets local and use relative paths so the project works on GitHub Pages and other static hosting.
- Do not commit credentials, student access data, `.env` files, analytics keys, or production API endpoints.

## Architecture

- Put reusable browser utilities in `src/scripts/core/`.
- Put translatable content and exercise fixtures in `src/scripts/data/`.
- Add substantial new product flows as feature modules under `src/scripts/features/<feature>/`.
- Keep visual tokens and page styles in `src/styles/`; split `app.css` by responsibility when a production framework is selected.
- Treat generated character and campus images as prototype-only assets until the final art direction is approved.

## Memorika product constraints

- Use the canonical exercise IDs `words`, `numbers`, `pictures`, and `grids`. Their English UI labels are `Words`, `Numbers`, `Pictures`, and `Grids`; Russian labels are `Слова`, `Числа`, `Картинки`, and `Таблицы`.
- Use `AMAtraining` as the product name for the teacher-assigned homework flow in both languages.
- Venue names are fixed secondary signs: `Story Library`, `Code Lab`, `Visual Gallery`, `Focus Observatory`, and `Mission Center`. Russian UI translations are `Библиотека историй`, `Лаборатория кодов`, `Визуальная галерея`, `Обсерватория внимания`, and `Центр миссий`. Never use them instead of exercise IDs in data or analytics.
- Maximus is a human boy and mentor, never a panda. Preserve his official face, dark hair, large brown eyes, blue academic cap, and blue/yellow clothing.
- Mindy is the textbook panda with a soft swept white fringe, magenta bow, warm brown eyes, and familiar panda face. Keep her recognizable and use an academic preppy wardrobe rather than preschool or sportswear styling.
- Keep Mindy on trainer settings screens. Use Maximus only for the AMAtraining question and post-task fact screens.
- Keep the `v0.1.0` campus composition: full map, venue flags on buildings, large icon-free trainer buttons in nearby negative space, and the AMAtraining dock on the foreground lawn. Do not replace the map with a card grid or add instructions to it.
- Use the unified campus palette: blue, violet, magenta, white and restrained yellow on buildings; keep sky and landscaping softer than the architecture.
- Preserve the task structure and input method when refreshing visuals. Do not add repeated instructions inside the display phase.

## Before finishing a change

- Confirm every referenced image, stylesheet, script, and ES module exists.
- Preview `src/` through a local static server when browser verification is needed.
- Update `README.md` and relevant files in `docs/` when architecture, flows, or handoff expectations change.
- Push to `main`; GitHub Actions deploys `src/` automatically.
- Create milestone releases with annotated `v*` tags. The release workflow publishes the matching GitHub Release, and the Pages workflow exposes the snapshot at `versions/<tag>/`.
- `.github/published-version-tags.txt` is the release registry used to trigger a unique `main` deployment after each new tag. Do not remove published versions from it.
