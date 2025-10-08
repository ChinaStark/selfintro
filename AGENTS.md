# Repository Guidelines

This repository is currently minimal. Use the conventions below to keep structure, tooling, and contributions consistent as it grows.

## Project Structure & Module Organization
- Place application code in `src/` grouped by feature (e.g., `src/profile/`, `src/ui/`).
- Keep static assets in `public/` (images, fonts, icons). Built files go to `dist/` (do not commit).
- Tests live in `tests/`, mirroring `src/` (e.g., `src/profile/card.ts` → `tests/profile/card.test.ts`).
- Put maintenance helpers in `scripts/` and docs in `docs/`.

## Build, Test, and Development Commands
- Node: `npm ci`, `npm run dev` (local server), `npm test`, `npm run build` (outputs to `dist/`).
- Python: `python -m venv .venv && .venv\\Scripts\\Activate.ps1; pip install -r requirements.txt; pytest`.
- Static preview: `python -m http.server -d public 8000`.
Adopt these names if you add tooling to the repo.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for JS/TS/JSON; 4 spaces for Python; max line length 100.
- Naming: folders/files kebab-case (`profile-card.ts`); Python modules snake_case; Classes PascalCase; constants UPPER_SNAKE_CASE.
- Formatting/linting: Prefer Prettier + ESLint (Node) or Black + Ruff (Python). Add `npm run format` / `npm run lint` or equivalent.

## Testing Guidelines
- Frameworks: Vitest/Jest for Node; Pytest for Python.
- File names: `*.test.ts` / `*.spec.ts` or `test_*.py`.
- Coverage target: ≥ 80% lines; test new logic and regressions.

## Commit & Pull Request Guidelines
- Use Conventional Commits (e.g., `feat: add bio section`, `fix(ui): correct avatar scaling`).
- PRs: clear description, linked issues (`#123`), screenshots for UI changes, updated docs, and passing checks.

## Security & Configuration
- Do not commit secrets. Use `.env.local`; provide `.env.example` with placeholders.
- Review and prune dependencies; keep builds reproducible.

Agent note: When editing, keep patches focused, follow this structure, and update this file if conventions evolve.

