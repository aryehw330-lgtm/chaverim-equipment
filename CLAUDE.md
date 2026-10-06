# COBC Chaverim Equipment Manager

Equipment management PWA for Bergen County Chaverim (COBC).

## Stack
- **Frontend:** a static PWA. `index.html` is the main app, `form.html` is the form app, plus `sw.js` (shift-reminder notifications), `manifest.json`, logos and icons. No build step.
- **Hosting:** GitHub Pages at https://aryehw330-lgtm.github.io/chaverim-equipment/ (manifest scope `/chaverim-equipment/`).
- **Backend:** Google Apps Script bound to a Google Sheet.
  - Apps Script project ID: `1yhZphIf1QVuGiNB6cpiio9vj70_3aPJtWsLHQqA87lM_1s4uxOx239vT`
  - Web app URL (`BASE_URL` in both `index.html` and `form.html`): `https://script.google.com/macros/s/AKfycbwjnEHbt8v1aVKUO7361uc8XTodz5yBWGKoRgQ3H26UFOJeAQarVQAGaEuYj277Ed14rw/exec`
- **Auth:** Firebase Auth on project `cobc-dispatch`, shared with the COBC Dispatch app. The config is `_FB_CONFIG`.
- **Android:** submitted to Google Play through PWABuilder (TWA), package `io.github.aryehw330_lgtm.twa`. Don't change the scope or start URL without updating the TWA.

## Rules
- **Never create a new Apps Script deployment.** Update the existing one so `BASE_URL` stays the same. If the URL ever changes, update it in both `index.html` and `form.html`.
- **Never change the QR/NFC tag URL format.** Printed tags point at it.
- Push backend changes with `clasp push`, then redeploy the existing deployment ID.
- Make targeted edits. `index.html` and `form.html` are large single files (about 4,800 and 3,800 lines), so don't rewrite them.
- Theme: COBC black and yellow.

## Features to preserve
- QR/NFC equipment tracking
- Car booking with overnight shift conflict detection
- Checklist and report event logging
- Car booking note editing
- Shift reminder notifications (`sw.js`)
- User levels 1–3 in `form.html`

## Stickers
- Labels print on a laser printer (Brother HL-L2460DW) using Avery 5520 waterproof labels (1 × 2⅝ in, 30 per sheet).
- **Next task:** match the TVAC tracker's sticker printing, with a sheet mode, a preset picker (Avery 5520 plus a custom size), test fit and start-at-label.

## Workflow
- Test on a phone-sized viewport before pushing.
- Commit straight to `main` with clear messages.
- The sister project is the TVAC tracker (`tvac-ems/equipment`). Keep shared features in step.
