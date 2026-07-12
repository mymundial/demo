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
