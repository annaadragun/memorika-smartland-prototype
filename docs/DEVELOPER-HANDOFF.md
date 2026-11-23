# Developer handoff

## What is production-ready

- responsive information architecture for desktop, tablet and mobile;
- Russian and English UI terminology;
- stable exercise IDs and labels: `Words`, `Numbers`, `Pictures`, `Grids`;
- separation between free training and assigned `AMAtraining`;
- the complete demonstration loop: setup, item-by-item display, ordered recall with hints, result;
- a dedicated `Grids` representation for position, shape and color;
- the AMAtraining loop: route, fixed teacher assignment, exercise, completion;
- accessibility basics: semantic buttons, labels, keyboard focus and reduced motion.

## What remains conceptual

- character and campus artwork;
- exercise content and scoring rules;
- progress values and stage locks;
- user profile;
- teacher comments;
- persistence and analytics.

## Character constraints

- Maximus is a human boy and an intelligent teacher/mentor. Preserve his large brown eyes, dark hair, blue academic cap and blue/yellow clothing.
- Mindy is the panda from the Memorika textbook. Preserve her familiar panda face, warm brown eyes, magenta bow and soft swept white fringe. Her current academic preppy outfit replaces the preschool-style dress: knitted raglan sweater, white shirt collar, structured skirt and discreet AMAKids diamond patch.
- Both characters may be rendered in one polished visual style, but neither identity may be replaced or radically redesigned.
- Mindy belongs on trainer settings screens and must be shown full-body. Maximus belongs on the AMAtraining question and post-task fact screens, not on the campus or route overview.
- Campus venue mapping is fixed: `Visual Gallery → Pictures`, `Code Lab → Numbers`, `Story Library → Words`, `Focus Observatory → Grids`, and `Mission Center → AMAtraining`. Venue flags and trainer buttons are separate elements.
- The current combined PNG is a prototype asset; production illustration should be approved against the official source artwork.

## Suggested API contracts

```text
GET  /courses/:courseId/campus
GET  /courses/:courseId/trainers
POST /training-sessions
POST /training-sessions/:sessionId/attempts
GET  /amatraining/current
POST /amatraining/:assignmentId/stages/:stageId/complete
```

The backend should return IDs and localization keys for exercise types. Presentation labels belong to the client localization layer.

## Exercise model

```json
{
  "type": "words",
  "mode": "amatraining",
  "difficulty": 5,
  "displayTimeMs": 2000,
  "itemCount": 5,
  "items": ["lighthouse", "watermelon", "rocket", "violin", "cloud"]
}
```

Use only the canonical exercise IDs `words`, `numbers`, `pictures`, and `grids`. Never expose answer order before an attempt is submitted. Hint candidates should be returned independently from the answer sequence. The prototype keeps items in browser code only because it has no backend.

## Acceptance checklist

- one visual component library across all exercise types;
- no duplicate RU/EN strings inside screen components;
- keyboard and touch interaction for every control;
- layouts verified at 360, 768, 1024 and 1440 px;
- exercise state survives a safe page reload when required by product rules;
- analytics events use stable names independent of translated UI copy;
- no credentials or student personal data in the repository.
