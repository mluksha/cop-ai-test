# Codebase Map

## Overview
This repository is currently frontend-active (React + TypeScript + Vite), with a scaffolded backend layout under `server/`.

## Frontend (active)
- `index.html`: root HTML shell, mounts `#root`.
- `src/main.tsx`: React entrypoint and root render.
- `src/App.tsx`: task manager behavior (add/delete/toggle, filters, progress, theme toggle).
- `src/App.css`: component styling, theme variables, animations.
- `src/index.css`: global reset/root layout basics.

## Tooling & config
- `package.json`: root scripts and frontend dependencies.
- `vite.config.ts`: Vite + React plugin setup.
- `eslint.config.js`: ESLint flat config for TS + React rules.
- `README.md`: setup and command reference.

## Extra / non-core
- `html-test/index.html`: standalone HTML test page.

## Backend status
- `server/src/`: folder structure exists (`config`, `middleware`, `routes`, `types`) but no source files in this snapshot.
- `server/dist/`: compiled backend artifacts exist.
- `server/node_modules/`: installed backend dependencies.

## Current picture
Small project with one implemented UI app and backend scaffolding/artifacts present, but no active backend source code currently visible under `server/src`.
