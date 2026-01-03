# Gullak — Micro Savings (updated)

What
- Simple client-only micro-savings demo. Invest ₹10 at a time, app stores savings in browser storage.
- Lightweight, mobile-first, localized (English / Hindi / Marathi), and PWA-ready.

Files added/updated
- index.html (updated, fixed layout)
- script.js (replaces the broken script file; safe paisa math, localization, toast)
- sw.js (simple service worker for offline)
- manifest.json
- README.md (this file)

How to use locally
1. Place the files in the project root (index.html, script.js, sw.js, manifest.json).
2. Serve with a static server (recommended) — some browsers restrict service worker on file://:
   - Python 3: `python -m http.server 8000`
   - Or use `npx http-server` if you have Node.js installed
3. Open http://localhost:8000 on mobile or desktop browser.
4. Click "Invest ₹10 Now" to add ₹10 to your Gullak. The amount is stored in localStorage (paisa integer).

Notes and next steps
- This is a front-end demo only. For a hackathon you can:
  - Add IndexedDB + offline queue for networked transactions.
  - Connect a minimal backend (Node + SQLite) to store server-side state.
  - Add UPI/payment or mock payment flow for add/withdraw.
  - Add micro-lessons and a glossary for first-time investors.
  - Improve visuals and add icons in manifest.json for installable PWA.

If you want I can:
- Create a small Node/Express backend that stores user state and syncs queued ops.
- Generate a 3–5 slide pitch deck.
- Add a second language refinement or audio TTS for lessons.

Enjoy!
