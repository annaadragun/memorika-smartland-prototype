# Developer handoff

## What is production-ready

- responsive information architecture for desktop, tablet and mobile;
- Russian and English UI terminology;
- separation between free training and assigned homework;
- the complete demonstration loop: setup, display, recall, result;
- the homework loop: route, mission, exercise, discovery card;
- accessibility basics: semantic buttons, labels, keyboard focus and reduced motion.

## What remains conceptual

- character and campus artwork;
- exercise content and scoring rules;
- progress values and stage locks;
- user profile;
- teacher comments;
- persistence and analytics.

## Suggested API contracts

```text
GET  /courses/:courseId/campus
GET  /courses/:courseId/trainers
POST /training-sessions
POST /training-sessions/:sessionId/attempts
GET  /homework/current
POST /homework/:assignmentId/stages/:stageId/complete
GET  /discoveries/:discoveryId
```

The backend should return IDs and localization keys for exercise types. Presentation labels belong to the client localization layer.

## Exercise model

```json
{
  "type": "words",
  "mode": "homework",
  "difficulty": 2,
  "displayTimeMs": 2000,
  "itemCount": 5,
  "items": ["lighthouse", "watermelon", "rocket", "violin", "cloud"]
}
```

Never expose answers before an attempt is submitted. The prototype keeps items in browser code only because it has no backend.

## Acceptance checklist

- one visual component library across all exercise types;
- no duplicate RU/EN strings inside screen components;
- keyboard and touch interaction for every control;
- layouts verified at 360, 768, 1024 and 1440 px;
- exercise state survives a safe page reload when required by product rules;
- analytics events use stable names independent of translated UI copy;
- no credentials or student personal data in the repository.
