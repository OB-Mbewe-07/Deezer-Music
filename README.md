# Not Spotift Music App

A music discovery and playlist management app built with Angular and PrimeNG, powered by the Deezer API. Browse trending charts, search for artists, albums and tracks, manage playlists and listen to 30-second previews — all in a clean, responsive UI.

---

## Features

- **Explore Page** — Browse trending tracks, albums and artists from Deezer's chart endpoint with auto-playing carousels
- **Real-time Search** — Debounced search across tracks, artists and albums simultaneously using `forkJoin`
- **Artist Page** — View artist details, top tracks and discography
- **Album Page** — View album details, tracklist with track positions and release date
- **Now Playing Bar** — Fixed bottom bar with play/pause controls, track info and live timestamp using the browser's native Audio API
- **Playlist Management** — Create, rename and delete playlists, add tracks and albums, persisted to IndexedDB
- **Profile Page** — View your playlists and total listening stats
- **Animated Routing** — Smooth page transitions between routes
- **Snap Scrolling** — Landing page with snap-scroll sections
- **Responsive Design** — Mobile-friendly with adaptive layouts and hidden elements on smaller screens

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Angular 21 | Framework (Standalone Components) |
| PrimeNG | UI component library |
| Tailwind CSS | Utility-first styling |
| Angular Signals Store (`@ngrx/signals`) | Playlist state management |
| IndexedDB (`idb`) | Persistent browser storage |
| RxJS | Reactive API calls and debouncing |
| Deezer API | Music data |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI

### Installation

```bash
npm install
```

### Running the App

```bash
ng serve
```

The app will be available at `http://localhost:4200`.

---

## API

All requests are proxied through a local dev proxy configured in `proxy.conf.json` to avoid CORS issues.

| Endpoint | Description |
|---|---|
| `/deezer-api/search/track?q=` | Search tracks |
| `/deezer-api/search/artist?q=` | Search artists |
| `/deezer-api/search/album?q=` | Search albums |
| `/deezer-api/artist/:id` | Artist details |
| `/deezer-api/artist/:id/top` | Artist top tracks |
| `/deezer-api/artist/:id/albums` | Artist albums |
| `/deezer-api/album/:id` | Album details |
| `/deezer-api/album/:id/tracks` | Album tracklist |

---

## State Management

Playlists are managed using Angular Signals Store (`@ngrx/signals`) and persisted to IndexedDB via the `idb` library. The store is hydrated on app start in `AppComponent` and synced to IndexedDB on every mutation.

---

## Proxy Configuration

The app uses a proxy during development to forward requests to the Deezer API. This is configured in `proxy.conf.json` and wired up under `serve.options` in `angular.json`.

```json
{
  "/deezer-api": {
    "target": "https://api.deezer.com",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": { "^/deezer-api": "" }
  }
}
```