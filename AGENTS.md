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
- Keep Mindy on trainer settings screens and as the welcoming guide on the campus. Use Maximus only for the AMAtraining question and post-task fact screens.
- Keep the campus as a scroll-free app view with all five buildings visible below the compact white system header shared with the settings screen. Do not add a separate marketing header or instructions to the campus.
- Campus trainer controls use four large, symmetrical glassmorphism cards with a vivid icon tile and an opaque light text backing for the bold trainer name and secondary venue name. Keep the central entrance visible and align the left/right card pairs. AMAtraining remains a centered white bottom dock with a blue action button.
- Use the supplied transparent AMAkids logo asset in the shared white header and pair it with the `MEMORIKA` course badge. Keep the curved illuminated academy name as a localized SVG/HTML overlay on the central building so it remains editable; use `Smartland Academy` in English and `Академия Амакидс` in Russian.
- Use the unified campus palette: blue, violet, magenta, white and restrained yellow on buildings; keep sky and landscaping softer than the architecture. Landscaping is sparse sage green without bright flower clutter.
- Preserve the task structure and input method when refreshing visuals. Do not add repeated instructions inside the display phase.

## Before finishing a change

- Confirm every referenced image, stylesheet, script, and ES module exists.
- Preview `src/` through a local static server when browser verification is needed.
- Update `README.md` and relevant files in `docs/` when architecture, flows, or handoff expectations change.
- Push to `main`; GitHub Actions deploys `src/` automatically.
- Create milestone releases with annotated `v*` tags. The release workflow publishes the matching GitHub Release, and the Pages workflow exposes the snapshot at `versions/<tag>/`.
- `.github/published-version-tags.txt` is the release registry used to trigger a unique `main` deployment after each new tag. Do not remove published versions from it.
