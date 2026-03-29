---
title: My Claude Code in Action Ship
 date: 2026-03-29
 description: Write up of what I shipped as part of completing Anthropic's Claude Code in Action course.
slug: claude-code-in-action
tags: [claude-code, getting-started]
status: draft-pending-review
---

# My Claude Code in Action Ship

I am working my way through the Claude courses on Anthropic Academy. My current understanding is these courses are free, they prepare you for the Certified Claude Architect exam, but there is some sort of partner thing you have to be a part of in order to sit for the exam. I've decided to do a bit of show, ship,tell as a substitute for sitting for the CCA exam. I wanted a way to demonstrate competency beyond a certificate of completion for LinkedIn so I decided for each course I will:

- **Show**: Complete the course in the Anthropic Academy and post my certificate of completion to LinkedIn.
- **Ship**: Build something while completing the module that I can ship to GitHub to demonstrate I can do the thing.
- **Tell**: Write a companion blog post for each course covering learnings and what I built.

There may be instances where I lump two courses together, such as this one. I will primarily focus on Claude Code in Action in this post but, I will first touch a bit on Claude 101.

## Claude 101 Learnings

I've been using Claude in the browser and Claude Code in VS Code via the TUI for a few weeks now. Like a lot of users, I jumped in and started chatting to get where I needed to go. This starter course gives guidance on building context through conversation, iterating, and using the desktop app to gain access to additional tools like Cowork. If you want to learn more about how to communicate with Claude more effectively, this course is quick and worthwhile.

## Claude Code Beyond Conversation

Like a lot of users, I installed Claude Code in my dev environment, launched a session, and just started chatting when I first started using the tool. This approach was quite a level up on it's own but, I found myself creating checklists of things to ask Code to do like check for opportunities to DRY code, make sure a change to a function signature resulted in scanning the rest of the project and making related edits, or consistently running linters. If this is where you find yourself, this course is for you.

## Customizing CLAUDE.md Layers

The simplest tool for customizing your Claude Code setup is using `CLAUDE.md` files to create a guide to your codebase and personal coding style and create custom instructions you want Code to follow when you work together. These files are passed to Code at the start of a conversation and serve as a sort of ready to go base prompt.

There are currently three flavors of `CLAUDE.MD` files, each with their own location, scope, and intended audience described as follows:

| Naming convention     | Scope          | Create by                                   | Use when                                                                                 |
| --------------------- | -------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `CLAUDE.md`           | repo - shared  | Run the `/init` prompt inside your project. | You want to commit to source control to share with any engineer who works with the code. |
| `CLAUDE.local.md`     | repo - local   | Manually create with custom instructions.   | You want project specific rules that stay on your machine.                               |
| `~/.claude/CLAUDE.md` | global - local | Manually create with custom instructions.   | You want rules that apply to all projects on your machine.                               |

I ran `/init` inside the repo for this site which generated the following `CLAUDE.md` file:

```
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
```

This is a new site I decided to ship and then add features as I go so it's pretty minimal right now. This `CLAUDE.md` file captures the current state but, I was curious as to whether or not it would stay synced with my site as it develops. It turns out unless you set up a hook or instructions requesting it, Claude Code does not update the `CLAUDE.md` file. You can run the `/init` command at any time to generate a new file or ask Code to update it after building a new feature. In the next section, I'll talk about how I set up hooks to automate this process and keep my `CLAUDE.md` up to date as the site changes over time.

## Local CLAUDE.md Files

You can define global rules for Claude to follow across all projects on your machine by placing a file at `~/.claude/CLAUDE.md`. Create a repo specific instruction file that stays on your local machine by naming it `CLAUDE.local.md` and adding information or instructions you want Claude to always have access to but don't want to push to source control. I used this in one repo where I tend to forget to add a version bump when opening PRs to update a plugin package. Now, every time we are in the planning stage of code updates, Code asks me if we need to include a version bump step and I don't have to try to remember or use some external checklist.

## Hooks Make It Happen

Two types of hooks Claude offers to help automate workflows are `PreToolUse` and `PostToolUse` hooks. As you may suspect, these are meant to be used when you want Claude to do something consistently either before or after using a particular tool. If you watch the outputs while Claude Code is thinking or working, you'll see lines similar to the following:

```
Done (3 tool uses · 36.3k tokens · 17s)
```

If you expand one of these entries, you can see the actual tool calls. The following shows the tool calls Claude made during our chat about how to keep `CLAUDE.md` up to date as the code base changes:

```
⏺ claude-code-guide(CLAUDE.md update behavior)
  ⎿  Prompt:
       The user wants to know: Does Claude Code proactively update the CLAUDE.md file as the codebase evolves, or
       does the user need to explicitly request updates? Can it be configured to update automatically (e.g., via
       hooks or tasks)? Explain the current behavior and any options for automation.
  ⎿  Fetch(url: "https://code.claude.com/docs/en/claude_code_docs_map.md", prompt: "How does Claude Code handle
  ⎿  Fetch(url: "https://code.claude.com/docs/en/memory.md", prompt: "Does Claude Code proactively update
  ⎿  Fetch(url: "https://code.claude.com/docs/en/hooks-guide.md", prompt: "What hooks can be configured to update
  ⎿  Response:
       Based on the official Claude Code documentation, here's a comprehensive answer to your question:....
```

In this example, Claude shows it used a tool it called `Fetch` to retrieve three different Claude Code documentation pages to use as reference to answer my questions. It is important to note that Claude may not consistently display the actual name of the tool in these logs and you should make a habit of referring to the [Tools Reference](https://code.claude.com/docs/en/tools-reference) in Claude Code to verify the actual tool name. If your pretool or posttool hook does not refer to the tool by it's correct name, the action will fail to trigger as intended. The actual tool call here is to `WebFetch` which is what I would want to tell a `PreToolUse` or `PostToolUse` hook to watch for as its trigger if I were writing a hook to fire before or after every fetch to a designated web URL.

## How I Hooked It Up

Returning to my questions around keeping my `CLAUDE.md` file in sync as I build out this web site, it was time to have a planning session with Claude to discuss options for making this happen. Claude, being Claude and already knowing all the Claude things, wanted to go all-in with a shell script written into the [`Stop` hook](https://code.claude.com/docs/en/hooks) that fires when Claude is finishing up a response. This was a really smart plan but, a little further than I wanted to take things for this introductory lesson.

I wanted to stick with demonstrating use of `PreToolUse` or `PostToolUse` so, using the tools list, started thinking through which tools get called, in which circumstances, and how often. The `Edit` and `Write` tools were options but, they fire frequently with no smart way to determine if the change being made is a typo update or function refactor. Lots of noise, little signal. Then `AskUserQuestion` caught my eye. I thought about when I see this pop up in my sessions and it does typically align with Claude collecting information if we're making some significant changes or adding something new. What if Claude just got a nudge to consider asking me if I want a `CLAUDE.md` update if the thing I'm asking to do is complex enough that `AskUserQuestion` fires? This resuled in the following hook:

```
"hooks": {
    "PreToolUse": [
      {
        "matcher": "AskUserQuestion",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: If this task introduces new routes, pages, dependencies, or architectural patterns, consider updating CLAUDE.md to reflect the changes.'"
          }
        ]
      }
    ]
  }
```

This hook now lives in this projects `.claude/settings.json` which means it will go up to source control and be available for anyone who might pull the repo down and work on it. I could opt to put it in `.claude/settings.local.json` if I wanted to keep it out of source control to only work for me here locally. This lightweight echo will show up for Claude when `AskUserQuestion` fires and it can roll an ask about updating `CLAUDE.md` right into the interview. This was a lightweight, first step to solving my problem and is working as a nice stop gap measure until I dig into futher courses and am ready to get into modifying built-in Claude hooks with scripts and learn more about the Claude SDK.

If you're still accomplishing everything in Claude Code via chat, take a session or two to idenitfy things you wish Claude would do automatically and experiment with setting up `CLAUDE.md` files and adding a couple of hooks to level up your workflow. You can generate these items manually or have a chat with Claude and ask for help generating and editing them. The small steps I describe in this article already feel like a power up and I know I'm just scratching the surface.
