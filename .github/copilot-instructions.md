# GitHub Copilot Instructions

This repository is a React + Vite frontend for a digital wallet platform. The app is currently a UI-focused client with placeholder state and routing; backend integration is not yet implemented.

## Architecture Overview
- `src/App.jsx` defines the top-level routes with `react-router-dom@7`.
- `MainLayout.jsx` is the authenticated dashboard shell. It uses `Outlet` to render nested pages for `/dashboard`, `/wallet`, `/bills`, and `/profile`.
- Pages are implemented under `src/pages/` and are primarily page-level React components, not shared UI library components.
- Styling is done with Tailwind CSS and custom theme colors in `tailwind.config.js` (`primary`, `secondary`, `dark`, `light`).
- UI icons are from `lucide-react`; note some pages import `Link as RouterLink` to avoid naming collisions with icon components.
- The app uses RTL layout in many pages, with explicit `dir="rtl"` and `text-right` utility classes.

## Developer Workflows
- Install dependencies: `npm install`
- Run development server: `npm run dev`
- Build production assets: `npm run build`
- Preview production build locally: `npm run preview`
- Run linting: `npm run lint`

## Key Files
- `src/main.jsx` — application entry point
- `src/App.jsx` — router setup and route list
- `src/layouts/MainLayout.jsx` — authenticated dashboard layout and sidebar
- `src/pages/ProfilePage.jsx` — example of editable form state and localized RTL UI
- `tailwind.config.js` — custom Tailwind theme and content paths
- `eslint.config.js` — ESLint config for React + Vite

## Project-Specific Patterns
- Pages are currently self-contained and use local component state (`useState`) instead of a global store.
- Placeholder pages like `/dashboard`, `/wallet`, and `/bills` are rendered directly in `App.jsx` as temporary components.
- Form fields and inputs are styled with Tailwind utility classes and often include custom icon-position wrapper markup.
- The current login/register flow is UI-only and simulated via local state transitions, not actual API auth.
- There is no existing test suite in the repository.

## Integration Points
- `axios` is installed and available for future HTTP work, although current pages do not yet call an API.
- The codebase is prepared for a Laravel backend, but backend integration is not present in this repo.
- Routing uses browser history with `BrowserRouter`.

## When Updating the UI
- Keep page components in `src/pages/` and preserve the RTL direction when UI text is Arabic.
- Use the shared `MainLayout` wrapper for authenticated routes.
- Prefer Tailwind utility classes and the custom color palette over hardcoded CSS values.
- Add new pages to `App.jsx` and route them through `MainLayout` if they should appear inside the dashboard shell.

If any section is unclear or missing details, I can refine the instructions with more examples from the repo.