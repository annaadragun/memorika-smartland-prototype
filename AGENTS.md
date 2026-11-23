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

- Use the canonical exercise IDs and English labels `Words`, `Numbers`, `Pictures`, and `Grids`. Russian UI labels are `Слова`, `Числа`, `Картинки`, and `Таблицы`.
- Use `AMAtraining` as the product name for the teacher-assigned homework flow in both languages.
- Venue names are secondary decorative signs only; never use them instead of canonical exercise names in data or analytics.
- Maximus is a human boy and mentor, never a panda. Preserve his official face, dark hair, large brown eyes, blue academic cap, and blue/yellow clothing.
- Mindy is the textbook panda with a white hair tuft, magenta bow, and magenta dress. Keep both characters recognizable when adapting their rendering style.
- Preserve the task structure and input method when refreshing visuals. Do not add repeated instructions inside the display phase.

## Before finishing a change

- Confirm every referenced image, stylesheet, script, and ES module exists.
- Preview `src/` through a local static server when browser verification is needed.
- Update `README.md` and relevant files in `docs/` when architecture, flows, or handoff expectations change.
- Push to `main`; GitHub Actions deploys `src/` automatically.
- Create milestone releases with annotated `v*` tags. The release workflow publishes the matching GitHub Release, and the Pages workflow exposes the snapshot at `versions/<tag>/`.
- `.github/published-version-tags.txt` is the release registry used to trigger a unique `main` deployment after each new tag. Do not remove published versions from it.
