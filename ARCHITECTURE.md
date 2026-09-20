# Architecture

## Phase 1

```text
Browser
  ├─ index.html + styles.css
  ├─ app.js
  │   ├─ mock listings
  │   ├─ in-memory navigation/filtering
  │   └─ localStorage persistence
  └─ service worker cache
```

The app is a dependency-free static PWA. Views are rendered from one local state object, while watchlist, comparison, and alert preferences persist in `localStorage`. The service worker caches only the application shell.

## Security boundary

The browser contains no credentials and connects to no backend. External listing ingestion, database access, AI calls, and notification delivery belong to later server-side phases.
