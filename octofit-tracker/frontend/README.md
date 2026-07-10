# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# OctoFit Frontend

React 19 + Vite presentation tier for OctoFit Tracker.

## API base URL

The app supports both Codespaces and localhost API hosts.

- When `VITE_CODESPACE_NAME` is set, requests use:
	`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[resource]/`
- When `VITE_CODESPACE_NAME` is not set, requests safely fall back to:
	`http://localhost:8000/api/[resource]/`

This prevents invalid URLs such as `https://undefined-8000...`.

## Local environment setup

Create `octofit-tracker/frontend/.env.local` with:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If you run locally without Codespaces, you can omit this variable.

## Run

```bash
npm run dev --prefix octofit-tracker/frontend
```
