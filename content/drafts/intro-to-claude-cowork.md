---
title: My Intro to Claude Cowork
 date: 2026-03-31  
 description: Write up of what I shipped as part of completing Anthropic's Intro to Claude Cowork course.
slug: intro-to-claude-cowork
tags: [claude-cowork, getting-started]
status: draft-pending-review
---

# My Intro to Claude Cowork

This is the second article in my show, ship, tell series to demonstrate understanding and competency of the materials covered in the Anthropic Academy courses. I want to show my work beyond posting certificate on LinkedIn. In Introduction to Claude Cowork, I learned what Cowork is, how it compares to working with Chat or Code, and got my first exposure to creating tasks and using Cowork Plugins.

Claude Cowork is part of the desktop app and is best summed up as being Claude Code for knowledge work. You give Cowork access to the files and folders you want it to work with and it can help with tasks like analysis, writing, research and document production. If you regularly complete work around things like building presentation decks, generating reports, or market analysis, you want to tune in to this tool.

## Meet Tasks

The Cowork tab is all about getting things done via tasks. When creating a task, you want to point Claude toward a folder where your files and work live and describe what you want to accomplish. The best prompts in this situation tell Claude where reference materials are, describe the end state or output you want to acheive, and where the resulting work should be output. Claude will review the files alongside your request, ask clarifying questions where needed, and then provide you with a proposed plan for completing the work. Once you approve the plan, Claude goes to work on implementation. 

As long as you leave your desktop session open, you can work on something else or you can watch as Claude works through the task and provide redirection or feedback if needed. The final artifacts are output to the location you designated while defining the task. Currently, these seem to be pretty solid first drafts that you can then tweak to a submission-ready state.

## Scheduled Tasks

You can set tasks up to run automatically on a schedule you define. This is especially powerful once you've defined a task, know you are satisfied with the output work product, and will need those outputs on a regular basis. I decide to try a link health checker task for this website. I wanted something to run once a week to check all of the links across my pages and blog posts and alert me to anything that wasn't working so I can apply a fix.

This was fairly straightforward to accomplish. I started by selecting **New task** from the sidebar inside Cowork and then describing what I wanted the task to do and how often. Claude asked some questions, took a look at the file structure for the site to make sure the prompt covered everything, generated a prompt for the task, and wrote a summary for me of what the task would do and how often.

What happened next is key to making sure your new scheduled tasks works the way you intend so make sure you don't skip this part. Claude suggested opening the task and triggering a manual run to make sure the task completes successfully and I was happy with the output. This doubles as an opportunity for Claude to request approval for tool calls to run the task that will carry over to the automated runs. 

I was so glad I listened to Claude here because the test run surfaced an issue in the original planned tool call. The agent was attempting to check the URLs using raw HTTP requests which were failing due to being inside the desktop app sandbox. The task was updated to use the `WebFetch` tool which allowed the task to complete successfully. The takeaway: it's worth the test run to make sure the right tools are called, the agent has all of the approvals it needs, and the outputs are as you intended before you miss an expected scheduled output and have to debug in the moment. I'm happy to report the link checker ran it's first scheduled run on time with successful outputs.

You can see the prompt my link health checker tasks runs every Monday morning in the following code block:

```
You are a site health checker for the personal website repo located at the user's selected workspace folder. The site is a React + Vite SPA with content in Markdown files.

## Objective
Find every external URL across the site's source files and published blog posts, check each one for availability, and produce a clear report of any broken or problematic links.

## Steps

### 1. Collect all external URLs
Scan these locations for URLs (http:// and https://):
- All `.jsx` files in `src/pages/` (page components containing hardcoded links)
- All `.md` files in `content/blog/` (published blog posts with inline links)
- `index.html` in the project root (analytics scripts, CDN references, etc.)

For each URL found, record:
- The source file path
- The line number or context where it appears
- The full URL

Exclude:
- localhost / 127.0.0.1 URLs
- Relative paths (no protocol)
- `mailto:` links
- JavaScript CDN imports (e.g., cdnjs.cloudflare.com) — these are dev dependencies, not content links

### 2. Check each URL
IMPORTANT: You MUST use the WebFetch tool to check each URL. Do NOT use curl, wget, Python requests, or any other bash-based HTTP tool — those are blocked by the sandbox. The WebFetch tool is your only way to make outbound HTTP requests.

For each collected URL, use WebFetch to request the page. Record:
- Whether the fetch succeeded or failed
- Any error messages returned
- Whether the URL redirected (and to where, if visible)

To keep things efficient, you can check multiple URLs in parallel by issuing multiple WebFetch calls in a single response.

### 3. Categorize results
Group URLs into:
- **Broken** (fetch failures, errors, page not found indicators)
- **Redirected** (if the final URL differs from the original — suggests the link should be updated)
- **Healthy** (successful fetch with expected content)

### 4. Produce the report
Write a summary report as a Markdown file saved to the workspace folder as `link-check-report.md`. The report should include:
- Date of the check
- Total links checked, broken count, redirect count
- A table of broken links with: source file, URL, status/error
- A table of redirected links with: source file, URL, redirect destination
- A note that all other links are healthy (no need to list every healthy link individually)

If there are zero broken or redirected links, say so clearly — that's a good outcome.

### 5. Notify
End your run with a brief conversational summary: how many links were checked, how many issues found, and whether any action is needed. If there are broken links, call them out specifically so the user knows what to fix.
```

Tip: Your desktop app must be open for a scheduled task to run. If the desktop app is closed when a scheduled task is due, the task will run when you next open the app.

## Power Up with Plugins

Cowork offers a plugin feature which bundles together a collection of skills, connectors, and subagents to create an agentic version of a domain expert. The **Customize** section of Cowork opens to an interface where you can connect apps, upload or create skills, and open the library of single-click installable plugins. Currently, your options include a number of roles such as Marketing, Finance, and Sales and few partner plugins like a Slack integration.

I decided to experiment with a plugin to complement my link health checker and do something useful for this site. I opted for Anthropic's Marketing plugin with the hope of getting help with things like planning content series options for blog posts, SEO, nudging me on publishing cadence, drafting blog post outlines I can use as a scaffold, and a research assistant to help me keep up with the pace of new AI developments.

## Plugin Customization

The real unlock comes from the ability to customize plugins to fit the needs of your business or project. I shared my wish list as outlined in the preceding section with Claude inside a Cowork session, answered some clarifying questions, and Claude updated existing skills in the plugin to work the way I want them to for my project's goals. The whole thing took about ten minutes and now I have a built-in marketer who knows my blog, audience, desired brand voice, and target publishing cadence who can help keep me on track and shorten time to ship for blog posts.

One thing I want to flag is that I ended up with two active Marketing plugins once I saved the customized version -- mine and the default plugin from Anthropic. I suspected having both of these active would cause problems because they shared the same set of command names attached to two completely different sets of instructions. Chat with Claude confirmed my instinct to deactivate the default Marketing plugin to avoid any confusion as to which set of instructions was correct for a given plugin command. Be sure to watch for this scenario when customizing your own plugins.

## Customization Deep Dive

Stay tuned for a post where I take a deeper dive into what the file structure of a plugin looks like, how the out of the box version compares to my custom plugin, how I work with the plugin to improve the process of content creation, and any bumps I run into along the way. 

