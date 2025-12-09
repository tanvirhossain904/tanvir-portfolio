## Purpose
This file gives concise, repo-specific instructions for AI coding agents working on this Next.js portfolio.

## Big Picture
- Framework: Next.js (App Router, `next` v16) with TypeScript and Tailwind CSS v4.
- Single-page portfolio app where `app/page.tsx` mounts the main `Portfolio` client component.
- Content/data is maintained in `data/resume.ts` and consumed directly by `components/Portfolio.tsx`.

## Key Files and What They Mean
- `app/page.tsx`: Entry point for the public site; imports `Portfolio` and sets page metadata.
- `components/Portfolio.tsx`: Large client-side UI (contains `"use client"`) — handles nav, modals, contact form, and UI animations.
- `data/resume.ts`: Single source of truth for profile, projects, stats, and articles. Prefer updating content here rather than editing JSX.
- `app/layout.tsx` and `app/globals.css`: Global layout, fonts (via `next/font`) and global styles.
- `next.config.ts`, `tsconfig.json`: Project config; note `paths` maps `@/*` to repo root allowing `@/components/...` imports.
- `package.json`: Scripts: `npm run dev`, `npm run build`, `npm start`, `npm run lint`.

## Project Conventions (do not invent new patterns)
- UI/data separation: content lives in `data/resume.ts`. Code should read from `DATA` rather than duplicating content in components.
- Client vs Server: `components/Portfolio.tsx` is explicitly a client component (`"use client"`). When adding new components, decide boundary first — server components (default in `app/`) are preferred unless interactivity, hooks, or browser APIs are required.
- Absolute imports: use `@/` alias (configured in `tsconfig.json`) for imports (e.g., `import Portfolio from '@/components/Portfolio'`).
- Styling: Tailwind utility classes in JSX; global CSS in `app/globals.css`. Keep component-level styles in Tailwind.
- Icons: `lucide-react` is used across components. Reuse imported icons rather than adding new inline SVGs.

## Developer Workflows & Commands
- Start dev server: `npm run dev` (defaults to localhost:3000).
- Build for production: `npm run build` then `npm start` to run the production server.
- Lint: `npm run lint` runs `eslint` (project uses ESLint + `eslint-config-next`).
- Tailwind/PostCSS: postcss config uses `@tailwindcss/postcss` plugin; no special build steps beyond `next build`.

## Integration & External Dependencies
- External images: project uses external Unsplash URLs in `data/resume.ts`; optimize or proxy via Next Image when needed.
- Simulated external links: project opens external links via `window.open()` in the UI; tests or changes should note these are simulated URLs (see handlers in `Portfolio.tsx`).
- No backend in repo: contact form is local simulation (setTimeout) — do not look for API routes in this repo.

## Safe Editing Rules for AI Agents
- Preserve `"use client"` at top of interactive components. Moving logic between client/server requires careful migration (hooks, window, document usage). 
- When changing `DATA` shape in `data/resume.ts`, update all usages in `Portfolio.tsx` (projects, articles, stats). Search for `DATA.` to find references.
- Keep TypeScript types consistent. `tsconfig.json` enables `strict`; prefer typed props and avoid `any` unless necessary.
- Avoid changing Next.js routing conventions in `app/` unless adjusting metadata or layout intentionally.

## Small Examples (copy-pasteable patterns)
- Read a project title: `import { DATA } from '@/data/resume'; const title = DATA.projects[0].title;`
- Add a server component in `app/` (no `"use client"`) and fetch remote data using the App Router conventions.
- Open a modal: `setSelectedProject(project)` — modal markup is provided in `Portfolio.tsx`.

## PR Guidance
- Keep changes minimal and focused. For content updates, prefer editing `data/resume.ts` and show a quick screenshot of the page.
- If you add interactive behavior, include a short manual test plan (steps to reproduce) in the PR description.

## Where to Look First When Troubleshooting
- Visual bugs: `components/Portfolio.tsx` and `app/globals.css`.
- Missing content: `data/resume.ts`.
- Build or TypeScript issues: `package.json`, `tsconfig.json`, `next.config.ts`.

If anything above is unclear or you'd like more detail on a specific area (data shape, styling conventions, or component boundaries), tell me which part and I'll expand or update this file.
