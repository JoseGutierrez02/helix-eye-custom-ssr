# Helix Eye

Aplicación de **Server Side Rendering** hecha a mano con React 18 + styled-components + Express 5 + webpack/swc que consume la API de imágenes de la NASA y muestra registros de galaxias. Toda la UI está en español (`/galaxias`).

La data se obtiene **una sola vez en el servidor** (vía axios) y se inyecta con `window.__INITIAL_PROPS__` para que el cliente hidrate sin fetches adicionales.

## Requisitos

- Node y yarn
- Un archivo `.env` con `PORT` (opcional; ver `.env.example`)

## Instalación

```
yarn
```

## Desarrollo

```
yarn dev
```

Levanta el server con nodemon en `http://localhost:3000` (o el puerto del `.env`).

## Build y producción local

```
yarn build
yarn start
```

## Scripts

| Script | Descripción |
| --- | --- |
| `yarn dev` | Dev: nodemon rebuildea y reinicia el server en cada cambio |
| `yarn build` | Compila cliente (`dist/app.js`) y server (`dist/index.js`) |
| `yarn start` | Compila y corre el server en modo dev (`NODE_ENV=development`) |

> Nota: no hay scripts de test/lint/typecheck y `typescript` no es dependencia; `yarn build` es la única verificación.