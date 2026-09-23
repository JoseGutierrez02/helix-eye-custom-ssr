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
- Server `src/server/index.ts`: `/galaxias` calls `https://images-api.nasa.gov/search?q=galaxies` via axios and passes `initialProps` (`{ status: 'ready', galaxies }` on success, `{ status: 'error', galaxies: [] }` on catch — it **catches and responds**, it does not throw) → `src/server/render/index.tsx` (`renderToString` + styled-components `ServerStyleSheet`) → `src/server/render/template.ts` injects `window.__INITIAL_PROPS__` and `app.js`.
- Client `src/app/index.tsx` hydrates with `hydrateRoot` + `BrowserRouter`, reads `window.__INITIAL_PROPS__`.
- `src/server.js` was a dead legacy static-only server; it was deleted (not referenced by any script).
- `src/public/index.html` was deleted too (no `HtmlWebpackPlugin`/template in use; HTML comes from `src/server/render/template.ts`).

## Gotchas
- `yarn build` and `yarn start` hardcode `NODE_ENV=development`, so bundles are always dev-mode (eval-source-map). This is intentional; don't "fix" it silently.
- NASA data is fetched **once** (server-side): `/galaxias` fetches via axios and injects `props.galaxies`. `Galaxies.tsx` renders off `status`: `'error'` → `ErrorState`, `'loading'` → `LoadingSpinner`, `'ready'` + empty array → `EmptyState`, otherwise → `GalaxiesLayout`. It destructures `const { galaxies = [], status = 'loading' } = props` (no `defaultProps`). There are **no client-side fetches and no client-side fetch code**: `src/app/api/index.ts` and `src/app/hooks/useFetchGalaxiesInfo.ts` were deleted. Do not reintroduce client-side fetching; the SSR `initialProps` flow is the only data path.
- No catch-all route: server only has `app.get('/galaxias', ...)` and `app.get('/', ...)`; unknown URLs get Express's default 404. (The Express 5 `/*path` catch-all was removed.)
- `openBrowser` from `react-dev-utils` lives **inside `webpackMiddleware()`** (dev only), so every `yarn dev` restart opens a new browser tab. This is the current intended behavior.
- Footer is pinned to the bottom on short pages: `#app` (GlobalStyles) is `display: flex; flex-direction: column; min-height: 100vh` and `Footer/styles.ts` uses `margin-top: auto`.
- `yarn dev` runs `nodemon --ext ts --exec "npm run build-dev"` (`build-dev` = `build-server` + `node --inspect dist/index.js`), so **every `.ts`/`.tsx` change rebuilds and restarts the whole node process**. HMR is therefore never state-preserving: there is no react-refresh, and `webpack.config.client.js` builds an `entries` array (with `webpack-hot-middleware/client?...reload=true` + `HotModuleReplacementPlugin`) but the exported config **hardcodes `entry: './src/app/index.tsx'`, so the `entries` array is dead code** and the HMR client is never bundled → manual refresh required to see changes. Known; treat as informational.
- Port comes from `.env` (`PORT`, cf. `.env.example`); server config defaults to 3000. `dotenv.config()` runs in webpack configs and server config.
- Component convention: each `src/app/components/<Name>/` has `index.tsx`, `styles.ts` (styled-components), optionally `types.ts`.
- `src/mocks/mockResponse.json` contains a NASA API fixture but is not referenced by any code yet.
- Deps note: `react`/`react-dom` are 18 while `@types/react-dom` is 19 (package.json mismatch).