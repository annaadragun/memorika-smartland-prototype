# Visual assets

## Campus map

`src/assets/images/smartland-campus-v3.png` is the current runtime campus background. It preserves the five-building composition from `v0.4.0`, consolidates the architecture into blue, violet, magenta, white and restrained yellow, removes the bright flower clutter, and uses sparse desaturated sage landscaping.

The map was produced with the built-in image-generation tool in a composition-preserving edit. No text, signs, characters or UI controls are baked into the bitmap; all trainer controls remain accessible HTML layers.

## Campus Mindy

`src/assets/images/mindy-welcome-v2.png` is the current transparent, full-body campus cutout. It preserves Mindy's approved face, hairstyle and welcoming gesture while moving her into a brighter uniform: white collared shirt, magenta knitted vest and deep navy pleated skirt. The campus character remains independent from the background so placement and scale can respond to the viewport.

Trainer settings use a dedicated pose variant while keeping Mindy's face, proportions and preppy uniform consistent across the free-training flow.

`src/assets/images/mindy-settings-v1.png` is the settings-specific full-body variant. It preserves that exact face and uniform while restoring the approved calm crossed-arm pose and leaves additional transparent margin so no ears, elbows or shoes are clipped.

## AMAtraining Maximus

`src/assets/images/maximus-amatraining-v2.png` is the current transparent, full-body mentor cutout used on the AMAtraining route. It preserves the approved Maximus identity, academic cap, welcoming tablet pose and white shoes, while using a brighter royal-indigo robe with restrained magenta trim. The preceding `v1` remains as the darker comparison variant.

The asset was produced with the built-in image-generation tool in identity-preserving edit mode and has no baked-in text, speech bubble or background. The existing `mindy-maximus-v4.png` remains the approved source for the dedicated question and fact screens.

## Brand mark

`src/assets/images/amakids-logo-banner.png` is the supplied transparent AMAkids logo used in the shared white header. The adjacent `MEMORIKA` course badge remains live HTML text, so the product label stays sharp and editable. The campus crest uses a CSS crop of the same supplied asset, ensuring that the magenta diamond is the exact brand mark rather than a redrawn approximation.

## Campus interface layers

Trainer navigation, the architectural crest, Mindy's timed localized greeting, her rim light and the AMAtraining dock are HTML/CSS overlays. They remain independent of the campus bitmap, can be localized, and can be replaced by production components without redrawing the environment.

## Screen backgrounds

All prototype screens use the same soft lavender surface family. Dark blue-violet panels are reserved for character-led instruction and AMAtraining question/fact moments.
