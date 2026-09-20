# AI Deal Hunter Agent Guide

## Current phase

Phase 1: static, mobile-first PWA with mock data and local persistence.

## Stack and structure

- `index.html`: app shell
- `styles.css`: responsive visual system
- `app.js`: mock data, views, and interactions
- `manifest.webmanifest`, `sw.js`, `icon.svg`: PWA shell

No build step or external dependency is required. Run locally with `python3 -m http.server 4173`.

## Rules

- Read `AI_Deal_Hunter_Project_Plan.md` before changing behavior.
- Keep Phase 1 deployable as static files.
- Prefer native browser features and the smallest correct change.
- Never add secrets or claim mock analysis is real market data.
- Preserve mobile accessibility and offline shell behavior.

## Verification

Check JavaScript syntax, manifest JSON, service-worker assets, static HTTP responses, mobile layout, search, sorting, detail, watchlist, compare, and alerts.
