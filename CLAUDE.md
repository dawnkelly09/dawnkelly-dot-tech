# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start local dev server (Vite)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally
- `npm run lint` — ESLint across all JS/JSX files

## Architecture

React 19 SPA with React Router v7, styled with Tailwind CSS v4, built with Vite 8. Deployed to Vercel (SPA catch-all rewrite in `vercel.json`).

**Visual theme:** Retro terminal aesthetic — green-on-black monospace, scanline overlay, blinking cursor, text glow effects. Custom terminal color tokens defined in `src/index.css` via `@theme` (e.g. `terminal-green`, `terminal-yellow`, `terminal-black`). All UI should maintain this terminal look.

**Routing:** `src/App.jsx` defines all routes inside a shared `Layout` (Nav + Terminal footer + `<Outlet />`). Pages live in `src/pages/`.

**Blog system:** Markdown files in `content/blog/` with YAML frontmatter (`title`, `date`, `description`, `slug`). Draft posts go in `content/drafts/` and are not loaded by the app. `src/data/blog.js` uses Vite's `import.meta.glob` to eagerly import all `content/blog/*.md` files at build time, parses frontmatter, computes read time, and exports `getAllPosts()` / `getPostBySlug()`. Posts render via `react-markdown` + `remark-gfm` with terminal-styled component overrides in `BlogPost.jsx`.

**To add a new draft blog post:** Create a `.md` file in `content/drafts/` with frontmatter.

**To add a new published blog post:** When the draft blog post is ready to publish, move the file to `blog/content`. When changes are next merged to main, the post will appear on the live site.
