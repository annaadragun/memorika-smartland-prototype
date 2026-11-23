# Visual assets

## Campus map

`src/assets/images/smartland-campus-v3.png` is the current runtime campus background. It preserves the five-building composition from `v0.4.0`, consolidates the architecture into blue, violet, magenta, white and restrained yellow, removes the bright flower clutter, and uses sparse desaturated sage landscaping.

The map was produced with the built-in image-generation tool in a composition-preserving edit. No text, signs, characters or UI controls are baked into the bitmap; all trainer controls remain accessible HTML layers.

## Campus Mindy

`src/assets/images/mindy-welcome-v2.png` is the current transparent, full-body campus cutout. It preserves Mindy's approved face, hairstyle and welcoming gesture while moving her into a brighter uniform: white collared shirt, magenta knitted vest and deep navy pleated skirt. The campus character remains independent from the background so placement and scale can respond to the viewport.

## Brand mark

`src/assets/images/amakids-logo-banner.png` is the supplied transparent AMAkids logo used in the shared white header. The adjacent `MEMORIKA` course badge remains live HTML text, so the product label stays sharp and editable.

## Campus interface layers

Trainer navigation, the `Smartland Academy` architectural sign, Mindy's rim light and the AMAtraining dock are HTML/CSS overlays. They remain independent of the campus bitmap, can be localized, and can be replaced by production components without redrawing the environment.

## Screen backgrounds

All prototype screens use the same soft lavender surface family. Dark blue-violet panels are reserved for character-led instruction and AMAtraining question/fact moments.
