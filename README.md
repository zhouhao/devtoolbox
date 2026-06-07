# DevToolbox

Fast, no-login developer utilities. This repo is the engineering foundation (milestone **M0**): a web app that builds, tests, and deploys a live placeholder. Real tools land in later milestones (first up: a JSON formatter + validator).

**Live:** https://zhouhao.github.io/devtoolbox/

---

## Stack & why

Boring, well-supported, fast to deploy. Every choice optimizes for shipping speed and reversibility.

| Concern      | Choice                   | Why                                                                                   |
| ------------ | ------------------------ | ------------------------------------------------------------------------------------- |
| Language     | TypeScript               | Type safety with near-zero ceremony; the default for serious web work.                |
| UI framework | React 18                 | Ubiquitous, well-documented, huge ecosystem. No exotic bets for a v0.                 |
| Build tool   | Vite 6                   | Instant dev server, fast static builds, first-class TS/React support.                 |
| Tests        | Vitest + Testing Library | Shares Vite config, near-zero setup, Jest-compatible API.                             |
| Lint         | ESLint 9 (flat config)   | Standard. Catches bugs and enforces React hooks rules.                                |
| Format       | Prettier 3               | Opinionated, ends formatting debates.                                                 |
| CI           | GitHub Actions           | Already where the code lives; no extra service.                                       |
| Hosting      | GitHub Pages             | Free static hosting with **zero secret management** — deploys via the built-in token. |

**Why GitHub Pages over Cloudflare/Vercel for v0:** the product thesis is a static, no-login, no-backend app. Pages serves that perfectly and the deploy needs no API tokens stored as repo secrets (it uses the Actions `GITHUB_TOKEN`). That keeps the foundation simple and secret-free.

**The pivot path (documented, not built):** if we later need edge compute, an API, or server-side logic, the move is **Cloudflare Workers** — `wrangler` is already set up in this environment. The Vite build output drops into a Worker/Pages project with minimal change. This is a two-way door.

## Project layout

```
.
├── .github/workflows/ci.yml   # CI (lint + format + test + build) and Pages deploy
├── src/
│   ├── App.tsx                # Placeholder "it's alive" page
│   ├── App.test.tsx           # Smoke test
│   ├── main.tsx               # React entry
│   └── test/setup.ts          # Testing Library matchers
├── index.html                 # Vite HTML entry
├── vite.config.ts             # Build + Vitest config (sets Pages base path)
├── eslint.config.js           # ESLint flat config
└── .prettierrc.json           # Prettier config
```

## Run locally

Requires Node 20+ (CI uses 22).

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm test         # run tests once
npm run lint     # lint
npm run format   # auto-format (or `npm run format:check` to verify)
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## How CI works

On every push and pull request, `.github/workflows/ci.yml` runs lint → format check → tests → build. The `main` branch must stay green.

## How deploy works

Pushing to `main` runs the same CI, then a `deploy` job publishes `dist/` to GitHub Pages using the official `actions/deploy-pages` flow (no stored secrets). The live URL is above.

- **Pages source** is set to "GitHub Actions" (not a branch).
- The Vite `base` is `/devtoolbox/` in production so asset URLs resolve under the project subpath. If the repo is renamed, set `VITE_BASE_PATH` accordingly or update `vite.config.ts`.

## Conventions

- Small, focused files; immutable data; explicit error handling.
- Every change keeps `main` green: it must build, lint clean, and pass tests.
- Commits follow `type: description` (feat, fix, refactor, docs, test, chore, ci).
