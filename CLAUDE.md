# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build (static export to /out)
npm run lint       # ESLint
npm test           # Jest unit/component tests
npm run test:e2e   # Playwright end-to-end tests (requires running dev server)
```

Run a single Jest test file:
```bash
npx jest __tests__/randomPicker.test.ts
```

## Architecture

**Startspieler** is a Terraforming Mars starting player picker — a two-screen Next.js app configured for static export (`output: 'export'`).

### Data flow

Player state lives entirely in `hooks/usePlayerStore.ts`, a custom hook that hydrates from and persists to `localStorage` (key: `startspieler_players`). There is no server state or API. Both pages consume this hook directly — there is no global context or state manager.

`lib/randomPicker.ts` defines the core types (`Player`, `TmColor`) and the `pickRandom` utility. `TM_COLORS` maps the five Terraforming Mars player colors (`red`, `green`, `blue`, `yellow`, `black`) to hex values used throughout the UI.

### Pages

- `/` (`app/page.tsx`) — main picker screen. Calls `pickRandom(selectedPlayers)` on button click, then passes the winner to `CardFlipReveal`.
- `/settings` (`app/settings/page.tsx`) — player management (add, rename, delete, assign color, toggle selected).

### Card reveal

`components/CardFlipReveal.tsx` orchestrates the flip: it sets `displayedWinner` immediately (so the front face is pre-populated), then waits 300 ms before setting `flipped = true` to trigger the CSS 3D flip animation. `components/PlayerCard.tsx` renders both faces of the card. `components/TmColorPicker.tsx` renders the color swatches in settings.

### Styling

Tailwind v4 with a fully custom design token palette defined in `app/globals.css` under `@theme`. The dark sci-fi aesthetic uses `--color-primary` (amber) for CTA elements and `--color-secondary` (cyan `#48dcc3`) for active/selected states. Card flip 3D is done with plain CSS classes (`.card-scene`, `.card-inner`, `.card-face`, `.card-front`, `.card-back`) in `globals.css` — the front face starts at `rotateY(180deg)` and becomes visible when `.card-flipped` rotates the inner container 180°.

Fonts: Space Grotesk (`font-headline`, `font-label`) and Manrope (`font-body`), loaded via `next/font/google`. Icons: Material Symbols Outlined loaded from Google Fonts CDN.

### Testing

- Unit tests (`__tests__/`) use Jest + jsdom + React Testing Library. Configured in `jest.config.js` via `next/jest`; e2e tests are excluded from Jest runs.
- E2E tests (`e2e/`) use Playwright against the running dev server.
