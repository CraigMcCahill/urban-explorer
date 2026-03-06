# Urban Explorer

A choose-your-own-adventure game in the spirit of Fighting Fantasy: you play an urban explorer entering **Willow House**, an abandoned mansion in East London with a dark past. Choose your gear, move through the building, and discover what’s waiting inside.

Built as a front-end-only SPA (React + TypeScript + Vite) that compiles to a static site.

## What it does

- **Introduction** – Backstory for Willow House and your character before you start.
- **Gear selection** – Pick two items from a small set (headlamp, respirator mask, aerosol can, crowbar). Your choices affect which paths and options are available.
- **Room graph** – The house is a graph of rooms (defined in `src/rooms.ts`). Each room has description text and options that can lead to other rooms, grant items, or require items you’re carrying.
- **Collectibles** – Find items (e.g. an iron key) in the world and use them to unlock new areas.
- **Inventory** – View current gear in a modal; “You pick up” feedback when you gain items.
- **Progress** – Current room and inventory are saved in `localStorage` so you can leave and come back later.
- **Restart** – “Restart & repack gear” returns you to gear selection with a fresh loadout (intro is skipped on restart).

## Tech

- **React 19** + **TypeScript**
- **Vite** – dev server and static build
- No backend; all content and logic live in the client.

## Development

```bash
npm install
npm run dev
```

Runs the app at `http://localhost:5173` (or the port Vite reports).

## Build

```bash
npm run build
```

Output is in `dist/`. Serve that folder with any static host (e.g. GitHub Pages, Netlify, Vercel) for a deployable adventure.

## Project layout

| Path | Purpose |
|------|--------|
| `src/rooms.ts` | Room graph, item definitions, option requirements and rewards |
| `src/App.tsx` | Intro, gear picker, room view, inventory modal, option handling |
| `src/App.css` | Layout and styling for cards, options, modal, loot banner |
| `src/index.css` | Global styles and page background |

Edit `rooms.ts` to add rooms, options, items, and story text; the UI will reflect the data.
