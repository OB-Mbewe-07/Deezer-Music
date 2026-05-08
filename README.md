# <img src="https://img.icons8.com/?size=30&id=uEdXEgELNafT&format=png&color=000000" /> <img src="https://img.icons8.com/?size=36&id=zQBiTJTC1Gj0&format=png&color=000000" /> Not Spotify Music App

A music discovery and playlist management app built with Angular and PrimeNG, powered by the Deezer API. Browse trending charts, search for artists, albums and tracks, manage playlists and listen to 30-second previews — all in a clean, responsive UI.

---

## Features

- **Landing Page** — Snap-scroll sections with a hero, debounced search input and trending badge suggestions
- **Explore Page** — Browse trending tracks with pagination, artists with rank badges and albums in horizontal scroll carousels
- **Real-time Search** — Debounced search across tracks, artists and albums simultaneously using `forkJoin`, results passed via route query params
- **Artist Page** — View artist details, top tracks and full discography, data resolved before navigation via route resolver
- **Album Page** — View album details, tracklist with track positions and release date, data resolved before navigation via route resolver
- **Now Playing Bar** — Fixed bottom bar with play/pause controls, track info, live timestamp and close button using the browser's native Audio API and Angular Signals
- **Playlist Management** — Create, rename and delete playlists, add and remove tracks, persisted to IndexedDB across full page refreshes
- **Profile Page** — View playlists, active playlist tracklist, total listening time and delete tracks
- **Drawer Navigation** — Slide-in navigation drawer built with modern Angular signal inputs and outputs
- **Animated Routing** — Smooth fade and slide transitions between routes
- **Lazy Loading** — All routes use `loadComponent` for code splitting
- **Route Resolvers** — Artist and album data fetched before component renders
- **Responsive Design** — Mobile-friendly layouts with adaptive components and hidden elements on smaller screens
- **Custom Scrollbar** — Thin themed scrollbar that appears only on hover, desktop only
- **SEO** — Dynamic meta tags and page titles per route via `SeoService`
- **Dark/Light Theme** — Fully themed using PrimeNG CSS variables throughout

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Angular 21 | Framework (Standalone Components) |
| PrimeNG | UI component library |
| Tailwind CSS | Utility-first styling |
| Angular Signals Store (`@ngrx/signals`) | Playlist state management |
| IndexedDB (`idb`) | Persistent browser storage |
| RxJS | Reactive API calls, debouncing and parallel requests |
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

## Project Structure

```
src
├── app
│   ├── app.config.ts
│   ├── app.css
│   ├── app.html
│   ├── app.routes.ts
│   ├── app.spec.ts
│   ├── app.ts
│   ├── components
│   │   ├── album
│   │   │   ├── album.component.html
│   │   │   └── album.component.ts
│   │   ├── artist
│   │   │   ├── artist.component.html
│   │   │   └── artist.component.ts
│   │   ├── button-playlist
│   │   │   ├── button-playlist.component.html
│   │   │   └── button-playlist.component.ts
│   │   ├── drawer
│   │   │   ├── drawer.component.html
│   │   │   └── drawer.component.ts
│   │   ├── explore
│   │   │   ├── explore.component.html
│   │   │   └── explore.component.ts
│   │   ├── login
│   │   ├── music-player
│   │   │   ├── music-player.component.html
│   │   │   └── music-players.component.ts
│   │   ├── navbar
│   │   │   └── navbar.component.ts
│   │   ├── not-found
│   │   │   ├── not-found.component.html
│   │   │   └── not-found.component.ts
│   │   ├── search
│   │   │   ├── search.component.html
│   │   │   └── search.component.ts
│   │   ├── search-results
│   │   │   ├── search-result.component.html
│   │   │   └── search-results.component.ts
│   │   └── user
│   │       ├── user.component.html
│   │       └── user.component.ts
│   └── shared
│       ├── models
│       │   ├── favourite-music.models.ts
│       │   ├── music-explore.models.ts
│       │   └── user-data.model.ts
│       ├── pipes
│       │   └── release-year.pipe.ts
│       ├── resolver
│       │   └── route-resolver.ts
│       ├── services
│       │   ├── indexedDb
│       │   │   └── indexedDb.service.ts
│       │   ├── music-explore
│       │   │   ├── music-explore-format.service.ts
│       │   │   └── music-expore.service.ts
│       │   ├── music-player
│       │   │   └── music-player.ts
│       │   └── playlist
│       │       └── playlist.service.ts
│       └── store
│           └── store.ts
├── index.html
├── main.ts
└── styles.css
```

---

## API

All requests are proxied through a local dev proxy configured in `proxy.conf.json` to avoid CORS issues.

| Endpoint | Description |
|---|---|
| `/deezer-api/chart` | Trending charts |
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

Playlists are managed using Angular Signals Store (`@ngrx/signals`) and persisted to IndexedDB via the `idb` library. The store is hydrated once on app start in `AppComponent` via `loadPlaylists()` and synced to IndexedDB after every mutation.

---

## Audio Playback

The `NowPlayingService` manages audio using the browser's native `Audio` API with Angular Signals for reactive state. An `effect()` watches the `track` signal and handles loading, playing and event listener cleanup via `AbortController` to prevent stale listener conflicts when switching tracks.

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

## Deployment

The app is deployed on Vercel. Since the Angular dev proxy only works locally, a `vercel.json` file at the root handles API proxying in production:

```json
{
  "rewrites": [
    {
      "source": "/deezer-api/:path*",
      "destination": "https://api.deezer.com/:path*"
    }
  ]
}
```

This rewrites all `/deezer-api/*` requests to `https://api.deezer.com/*` at Vercel's edge, avoiding CORS issues in production.

link: `https://not-spotify-ten.vercel.app/`

![alt text](<Screenshot 2026-05-08 at 12.40.55.png>) ![alt text](<Screenshot 2026-05-08 at 12.40.37.png>)
![alt text](<Screenshot 2026-05-08 at 12.39.06.png>) ![alt text](<Screenshot 2026-05-08 at 12.39.21.png>) ![alt text](<Screenshot 2026-05-08 at 12.40.00.png>) ![alt text](<Screenshot 2026-05-08 at 12.40.12.png>)