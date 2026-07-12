# Stone Oracle V2.2 Priority B — QA

## Automated checks

- JavaScript syntax checked with `node --check`.
- Full ritual executed in Chromium through an isolated test harness.
- No browser console errors or uncaught page errors during the tested ritual.
- Verified state order: `idle → awakening → gathering → inhaling → exhaling → revealing → revealed`.
- Verified parchment remains hidden through gathering, inhale, and exhale.
- Verified category colour is inherited by eyes, bowl, mouth smoke, nostril glow, and exhaled smoke.
- Verified reduced-motion rules hide travelling smoke and retain static ceremony cues.
- Verified low-power rendering removes secondary smoke layers rather than disabling the ritual.
- Service-worker cache version advanced to `v2-2-priorityB`.

## Visual checks

Tested at a representative 430 × 932 mobile viewport:

- Smoke originates around the interior bowl.
- The mouth cloud contracts toward the nose during the inhale.
- Exhaled smoke travels downward from two nostril origins.
- The parchment remains below the mouth and appears after the exhale.
- The V2.2 Priority A parchment styling remains intact.

## Known scope boundary

Priority B does not redesign the Save, Share, or Try Again controls. Those remain reserved for Priority C.
