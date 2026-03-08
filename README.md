# Shreyan Dev

Shreyan Dev is a personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS. It uses a single-page layout to present introduction, about, projects, experience, and contact sections, with content organized through reusable components and static data files so updates remain straightforward. This repository contains the source, configuration, and scripts required to develop, build, and preview the site locally.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

## Development

```sh
npm install
npm run dev
```

The local dev server runs on `http://localhost:5173` by default.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run build:dev` creates a development-mode build.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint.

## Structure

```text
src/
  components/   Reusable UI and section components
  data/         Static portfolio content
  lib/          Shared utilities
  pages/        Route-level page components
```
