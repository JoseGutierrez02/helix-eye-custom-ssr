# AGENTS.md

Helix Eye: hand-rolled React 18 SSR (React + styled-components + Express 5 + webpack/swc) that renders NASA's images API. UI strings and routes are in Spanish (`/galaxias`).

## Commands
- Install: `yarn` (repo uses yarn; `yarn.lock` is source of truth)
- Dev: `yarn dev` (nodemon rebuild + watches; server runs from `dist/index.js`)
- Build: `yarn build` → webpack client (`dist/app.js`) then server (`dist/index.js`)
- Run built app: `yarn start`
- No test/lint/typecheck scripts exist, and **`typescript` is not a dependency**: `npx tsc` and `npx eslint .` both fail (`@typescript-eslint` plugins require typescript). To lint/typecheck, `yarn add -D typescript` first. Build output is the only verification (`yarn build`).
- Must run `node dist/index.js` from the repo root: `src/server/index.ts` serves `express.static('dist')`, which is CWD-relative.

## Architecture / SSR flow
- Two hand-wired webpack builds (`webpack.config.client.js`, `webpack.config.server.js`), both compiled by `swc-loader` — **webpack does not type-check**; `tsconfig.json` is minimal.
- Server `src/server/index.ts`: `/galaxias` calls `https://images-api.nasa.gov/search?q=galaxies` via axios and passes `initialProps` → `src/server/render/index.tsx` (`renderToString` + styled-components `ServerStyleSheet`) → `src/server/render/template.ts` injects `window.__INITIAL_PROPS__` and `app.js`.
- Client `src/app/index.tsx` hydrates with `hydrateRoot` + `BrowserRouter`, reads `window.__INITIAL_PROPS__`.
- `src/server.js` (repo root) is a dead legacy static-only server, not referenced by any script; ignore it.

## Gotchas
- `yarn build` and `yarn start` hardcode `NODE_ENV=development`, so bundles are always dev-mode (eval-source-map). This is intentional; don't "fix" it silently.
- NASA data is fetched **twice**: server axios (`/galaxias`) and again client-side via `useFetchGalaxiesInfo` (`src/app/api/index.ts` uses `fetch`). `Galaxies.tsx` renders from SSR `props.galaxies` (default `[]`) while the hook's destructured values are unused.
- No Express error middleware: `/galaxias` throws on API failure, and `render()` swallows errors (returns `undefined`). The application expects the API to be reachable.
- Overriding route `/galaxias` exists; the catch-all `app.get('/*path', ...)` handles all other URLs (Express 5 wildcard syntax).
- Port comes from `.env` (`PORT`, cf. `.env.example`); server config defaults to 3000. `dotenv.config()` runs in webpack configs and server config.
- Component convention: each `src/app/components/<Name>/` has `index.tsx`, `styles.ts` (styled-components), optionally `types.ts`.
- `src/mocks/mockResponse.json` contains a NASA API fixture but is not referenced by any code yet.
- Deps note: `react`/`react-dom` are 18 while `@types/react-dom` is 19 (package.json mismatch).