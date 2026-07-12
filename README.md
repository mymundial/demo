# Stone Oracle V2.3 — English / Italian

Bilingual release based on V2.2 Priority B.

## Included

- 96 original fortunes in English
- 96 manually written Italian translations
- Persistent EN/IT flag selector
- Automatic first-language choice from the browser
- Live language switching before or after a reading
- Localised ritual messages, parchment, dates, dialogs, sharing and exported images
- Existing bowl → mouth gathering → inhale → nostril exhale sequence
- Offline PWA support

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`.

## Preview parameters

- English reveal: `?preview=revealed&category=relationships`
- Italian reveal: set Italian in the selector, then reload; the preference persists

No account, backend, AI or personal-data collection is used.

The file `fortunes-bilingual.json` contains all 96 paired English/Italian fortunes for editorial review.

Direct links can select a language with `?lang=en` or `?lang=it`.


## Build note
This confirmed pass bumps the service-worker cache version so previous category-coloured controls and export artwork cannot remain cached.


## V2.3.1 corrections
- Removed the in-game parchment star/circle emblem.
- Removed the export star/circle emblem.
- Removed all footer wording from the export parchment.
- Locked Save, Share and Try Again controls to dark neutral ink.
- Uses versioned CSS/JS filenames and unregisters old service workers to prevent stale builds.
