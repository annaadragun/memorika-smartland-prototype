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

## Before finishing a change

- Confirm every referenced image, stylesheet, script, and ES module exists.
- Preview `src/` through a local static server when browser verification is needed.
- Update `README.md` and relevant files in `docs/` when architecture, flows, or handoff expectations change.
- Push to `main`; GitHub Actions deploys `src/` automatically.
- Create milestone releases with annotated `v*` tags; the release workflow publishes the matching GitHub Release automatically.
