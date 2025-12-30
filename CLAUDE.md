# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HookHub is a Next.js 16 application built with TypeScript, React 19, and Tailwind CSS v4. It uses the App Router architecture (not Pages Router).

## Common Commands

### Development
```bash
npm run dev       # Start development server on http://localhost:3000
npm run build     # Build production bundle
npm run start     # Start production server
npm run lint      # Run ESLint
```

### Linting
- ESLint is configured with Next.js recommended settings (core-web-vitals + TypeScript)
- Config file: `eslint.config.mjs` (using flat config format)

## Architecture

### Directory Structure
- `app/` - Next.js App Router directory
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind imports
- `public/` - Static assets

### Styling System
- **Tailwind CSS v4** with PostCSS integration
- CSS variables defined in `globals.css` with dark mode support
- Uses `@theme inline` directive (Tailwind v4 feature)
- Two Geist fonts loaded via `next/font/google`:
  - `Geist` (sans-serif, stored in `--font-geist-sans`)
  - `Geist Mono` (monospace, stored in `--font-geist-mono`)

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to root directory
- Target: ES2017
- Module resolution: bundler

### Key Technology Versions
- Next.js: 16.1.1
- React: 19.2.3
- Tailwind CSS: v4 (major version upgrade - uses new PostCSS plugin)
- TypeScript: v5

## Important Notes

### Tailwind CSS v4 Differences
This project uses Tailwind CSS v4, which has significant changes from v3:
- No `tailwind.config.js` file - configuration is done via CSS using `@theme`
- PostCSS plugin is `@tailwindcss/postcss` (not `tailwindcss`)
- Import in CSS is `@import "tailwindcss"` (not individual layers)

### App Router Patterns
- All components in `app/` directory are Server Components by default
- Add `"use client"` directive for client-side interactivity
- Metadata is exported from `layout.tsx` and `page.tsx` files