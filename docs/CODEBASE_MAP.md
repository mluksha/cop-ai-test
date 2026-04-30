# Codebase Map

## Overview
This repository is frontend-active (React + TypeScript + Vite) and now follows a minimal Feature-Sliced Design structure.

## Frontend (active)
- `index.html`: root HTML shell, mounts `#root`.
- `src/main.tsx`: React entrypoint and root render.
- `src/app/styles/global.css`: global reset/root layout basics.
- `src/app/styles/app.css`: shared app styling used by the composed task page.

### FSD layers in `src`
- `app/`: app-level composition and providers.
	- `app/App.tsx`: root app shell composing pages.
	- `app/providers/ErrorBoundary.tsx`: global error boundary.
- `pages/`: screen-level composition.
	- `pages/task-page/ui/TaskPage.tsx`: task manager page orchestration.
- `features/`: user actions and interaction logic.
	- `add-task`: add-task validation and form UI.
	- `delete-task`: task deletion logic.
	- `toggle-task`: task completion toggle logic.
	- `filter-tasks`: filter controls UI.
	- `toggle-theme`: theme toggle UI.
- `entities/`: domain model and entity UI.
	- `entities/task/model`: `Task` types and pure task helpers.
	- `entities/task/ui`: `TaskItem` and `TaskList`.
- `shared/`: cross-cutting reusable modules.
	- `shared/config`: app constants (`STORAGE_KEY`, `MAX_TASK_LENGTH`).
	- `shared/lib/storage`: localStorage adapter helpers.
	- `shared/ui`: reusable UI (`ProgressBar`).
	- `shared/api`: placeholder for future API layer.

## Tooling & config
- `package.json`: root scripts and frontend dependencies.
- `vite.config.ts`: Vite + React plugin setup.
- `eslint.config.js`: ESLint flat config for TS + React rules.
- `README.md`: setup and command reference.

## Extra / non-core
- `html-test/index.html`: standalone HTML test page.

## Current picture
Single-page task manager composed with minimal FSD layers (`app + pages + features + entities + shared`) and no widgets layer.
