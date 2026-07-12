# The Stone Oracle — V2.2 Priority B

Priority B rebuilds the ceremonial smoke sequence so the monster appears to breathe the fortune into existence.

## What changed

- The bowl inside the mouth now ignites before the smoke appears.
- Smoke gathers and thickens inside the mouth cavity.
- The gathered smoke contracts upward as the stone draws breath.
- Two category-coloured streams pull toward the nostrils during the inhale.
- The oracle exhales coloured smoke downward from both nostrils.
- The exhale leads directly into the bottom parchment reveal.
- Eye brightness now escalates across the gathering, inhale, and exhale phases.
- Added separate gathering, inhale, and exhale sound envelopes.
- Added reduced-motion and low-power fallbacks for the new breath sequence.
- Retained the V2.2 Priority A Renaissance parchment and export styling.

## Ceremony timing

```text
Bowl ignition
→ smoke gathers in the mouth
→ the stone inhales
→ smoke exhales from the nostrils
→ parchment reveals below
```

The full-motion ritual takes approximately 4.4 seconds before the result is complete.

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/` from this folder.

## Preview states

- `?preview=gathering&category=relationships`
- `?preview=inhale&category=reflection`
- `?preview=exhale&category=change`
- `?preview=smoke&category=warning` — alias for the exhale state
- `?preview=relationships` — revealed relationship fortune

## Release note

This is an independent concept prototype and is not presented as an official Sacro Bosco or Parco dei Mostri product.
