# Character asset direction

## Runtime assets

- `src/assets/images/mindy-welcome-v2.png` is the shared full-body Mindy cutout for the campus and all trainer settings screens. Her white shirt, magenta vest and navy pleated skirt must remain consistent between those surfaces.
- `src/assets/images/maximus-amatraining-v1.png` is the full-body Maximus cutout for the discovery-route overview, with an approved tablet pose and navy/magenta academic robe.
- `src/assets/images/mindy-maximus-v4.png` remains the transparent prototype source used for Maximus on the dedicated AMAtraining question/fact screens.

Characters are intentionally absent from the campus background bitmap. The previous `v2` asset remains as a comparison source but is no longer referenced at runtime.

## Identity references

- Maximus: official 3D boy artwork supplied by the user (`Maximus_klass.png`, `Максимус_1.png`).
- Mindy: textbook panda artwork supplied by the user (`img36.jpg`, `img54.jpg`) plus the newer hairstyle reference supplied on 2026-11-23.

The high-resolution source references remain outside this repository. The runtime cutout is a generated prototype, not a replacement for the official character masters.

## Generation method

The character assets were created with the built-in image-generation tool in identity-preserving edit mode, using transparent backgrounds.

Final prompt summary:

> Edit only Mindy's clothing in the existing full-body duo. Preserve her familiar panda face, warm brown eyes, magenta bow, soft swept layered white fringe and folded-arm pose; preserve Maximus completely. Replace the sporty outfit with a deep navy-violet knitted raglan sweater over a crisp white shirt collar, a structured dark pleated skirt with restrained magenta piping, white knee socks and polished navy loafers. Add one small embroidered AMAKids magenta diamond with the white A on the upper sleeve. Match the polished 3D universe and retain a transparent background. No text, extra props or facial redesign.

Do not use the previous two-panda concept. Maximus is never represented as a panda.

The AMAtraining Maximus edit preserved the exact approved face, hair, eyes, cap, pose, tablet, shoes and polished 2.5D rendering; only the robe palette was updated to deep navy and magenta. No text, panda, watermark or background was added.
