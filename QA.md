# Stone Oracle V2.3 bilingual QA

## Automated checks completed

- JavaScript syntax validated with `node --check`.
- Runtime language-switch logic validated in a mocked browser DOM.
- 8 categories confirmed.
- 12 fortunes per category confirmed.
- 96 English fortunes confirmed.
- 96 Italian translations confirmed.
- English and Italian interface dictionaries contain matching keys.
- HTML element IDs are unique.
- EN and IT language buttons are present and accessible.
- Service-worker cache version updated to `v2-3-bilingual`.

## Behaviour included

- Browser language chooses the initial language when no preference exists.
- Selection is stored locally.
- Language can be changed while a fortune is visible.
- The existing fortune changes language without drawing a new fortune.
- Dates, status messages, dialog text, share copy and exported image text follow the selected language.
- `?lang=en` and `?lang=it` may be used for direct-language links.

## Release checks still recommended

- Review Italian tone with a native Italian copy editor before an official park deployment.
- Test Safari on iPhone and Chrome on Android.
- Verify the longest Italian fortunes on small screens and in exported PNG files.
- Test installed-PWA language persistence and offline reload on a physical device.
