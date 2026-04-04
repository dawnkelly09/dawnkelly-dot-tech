---
title: "Agents are the New Audience: a Framework for Evaluating Agent-Ready Docs"
date: 2026-04-04
description: "AI agents are a growing user persona for developer docs. Here's a framework for evaluating whether your docs are ready for them, and what the audit looks like in practice."
slug: agents-are-new-audience
tags:
  [ai-agents, documentation, developer-experience, llms-txt, agent-readiness]
status: draft
---

# Agents Are the New Audience

If you work on documentation, you're likely having the "are our docs AI-ready?" conversation right now — and quickly discovering that a working definition for AI-ready documentation doesn't really exist yet. As recently as a couple of months ago, clean Markdown files paired with an `llms.txt` file for consumption by chat-based LLM tools was cutting-edge. If you shipped a Markdown version of your full documentation for developers to use with RAG pipelines, you were ahead of your peers. In the last month, though, there's been a nearly seismic shift.

## Enter the Agents

User demand for LLM-based tools that integrate with developer environments gave us IDE extensions and terminal-based coding assistants — forms of AI that broke free from the browser. Copying and pasting code blocks from a docs site into your codebase went extinct overnight. At the same time, increases in model intelligence combined with advances in tool use produced something qualitatively different: the agent. Now you can have your own LLM-based agent with the ability to read files, run commands, call APIs, and iterate on failures inside your developer environment of choice. Layer agent harnesses with scheduled tasks and other automations on top of all of that and you find yourself with intelligent agents completing increasingly complex tasks without the assistance or supervision of their human collaborator.

This changes the docs equation. Documentation that was written for a human to read is now being consumed by an agent that needs to _act_.

## Agent Needs are Different

When I write documentation for a human audience, I understand the user will do a certain amount of figuring things out on their own. I can create a clean, intuitive, user journey-based information architecture, pair it with well-structured docs, and share it with users for feedback to make things as clear as possible. What I can't do is get my human brain to overcome our reflex to fill in blanks so quickly and thoroughly that we may not even realize they exist.

The unlock for me was recognizing the agent as a separate user persona with unique qualities compared to the human developer audience. Once you see the agent as a user persona, you realize you can bring them into the content creation, user testing, and feedback loop much earlier than you typically do with human users. You can literally hand an agent a tutorial page and say "complete this task" and watch where it breaks. That's user research you can run in minutes, not weeks.

After conducting these "user interviews" with agents — sharing documentation with them and watching where they succeed and fail — I landed on the following dimensions for evaluating whether docs are agent-ready:

- **Discoverability & ingestion**: Can the agent find the right content and load it efficiently? This means things like `llms.txt`, structured metadata indexes, category bundles, and tiered content formats that let agents budget their context window.

- **Task completion**: Can the agent follow the docs to complete a real task end-to-end? CLI-driven workflows with complete command sequences, explicit prerequisites, and verifiable success criteria at each step.

- **Structured data & parseability**: Are critical values (endpoints, chain IDs, API specs, config objects) extractable without parsing natural language? Code blocks with language metadata, structured reference pages, and machine-readable API specifications.

- **Error handling & recovery**: When something goes wrong, can the agent diagnose and fix it from the docs alone? Structured error catalogs, troubleshooting sections, version compatibility matrices, and known limitations with workarounds.

- **Token efficiency**: Can the agent get what it needs without loading unnecessary content? Multi-tier content delivery (index → summary → full page), minimal duplication, and separation of reference from narrative.

- **Context linking & dependency graphs**: Can the agent understand relationships between pages? Machine-readable prerequisites, structured tool dependency declarations, and learning path metadata.

The key distinction: where LLM-ready docs are about sharing information to build context, agent-ready docs require an actionable plan for completing a specific objective. The gap between _knowing how something works_ and _being able to use it_ is exactly the target.

## A Skill to Make This Repeatable

I'm quickly learning to reach for things like Claude Code skills to create structure around knowledge work I want to be able to repeat with consistent outputs. A skill is essentially a reusable prompt with instructions, reference files, and a defined workflow that Claude follows every time it's invoked. For this framework, I built an [agent-docs-audit skill](https://github.com/dawnkelly09/agent-docs-audit) that takes a documentation site URL and produces a professional report scoring it across all six dimensions.

The skill packages everything: the evaluation criteria, a scoring rubric with calibrated thresholds, the reconnaissance and deep evaluation workflow, and two report formats — a baseline assessment for first-time evaluations, and a comparative "before/after" report for measuring improvement over time. The output is a `.docx` file suitable for sharing with technical leadership or potential clients.

Here's what the workflow looks like in practice:

- **Reconnaissance**: The agent fetches the site's homepage, `robots.txt`, `llms.txt`, sitemap, and any AI-specific resources pages to map what exists.

- **Deep evaluation**: It pulls 2–3 representative pages across content types (a tutorial, a reference page, a conceptual overview) and assesses each against the six dimensions.

- **Scoring**: Each dimension gets a 1–10 score with specific evidence. Most sites today land in the 3–5 range, which is expected — agent-first docs are a new category.

- **Report generation**: Everything gets compiled into a structured report with an executive summary, per-dimension findings, an improvement opportunities matrix, strategic context, and recommended next steps.

## What an Audit Actually Looks Like

I ran this against [docs.polkadot.com](https://docs.polkadot.com) as a test. Full disclosure: I contributed to building the AI documentation layer for this site, so I know it intimately — which makes it a useful validation target because I can verify whether the skill correctly identifies what exists and what's missing.

The results were honest. The site scored an 8 on discoverability — it has a dedicated AI Resources page with an MCP server, `llms.txt` with version hashes, a three-tier content architecture (`llms.txt` at ~13k tokens → `site-index.json` at ~74k tokens → `llms-full.jsonl` at ~632k tokens), and per-category bundles in full and lightweight variants with token count metadata. That's best-in-class for the blockchain ecosystem.

But the skill also correctly identified the gaps I'm actively working on. Agent task completion scored a 6 — tutorials are CLI-driven with complete code examples, but there are no structured agent task files yet. Error handling scored a 4 — the PVM section has a troubleshooting section, but the EVM tutorials don't, and there's no structured error catalog. Context linking scored a 5 — internal linking exists, but there's no machine-readable prerequisite graph or tool dependency metadata.

No one told the skill what I built or what I hadn't shipped yet. It found the strengths and the gaps on its own by evaluating the site the same way any developer's AI agent would.

## The Shift from LLM-Ready to Agent-Ready

Most documentation teams that have invested in AI readiness have focused on the ingestion layer — `llms.txt`, markdown exports, RAG-friendly formatting. That's the foundation, and it matters. But it's the equivalent of making your docs searchable without making them actionable.

The next wave is agent-ready: documentation structured so that an AI coding agent can not only _read_ your docs but _complete tasks_ using them. That means declarative instructions (exact commands, not descriptions of commands), structured data (config values extractable without NLP), verifiable steps (machine-checkable success criteria), and error recovery paths (what to do when things go wrong).

The teams that get here first will see it in adoption numbers. A developer whose Cursor agent can deploy to your platform on the first try is a developer who stays. One whose agent fails and requires manual debugging may try a competitor instead.

## Try It Yourself

The agent-docs-audit skill is [open source](https://github.com/dawnkelly09/agent-docs-audit) and works with Claude Code's Cowork mode. Point it at any documentation site and get a scored baseline assessment. If you improve your docs and run it again with the original report, it produces a comparative evaluation showing exactly what changed and by how much.

I'm actively working on the next piece of this puzzle: agent task files that let a coding agent complete an entire tutorial workflow from a single structured file. Early results are promising — I've validated task files that can execute a Uniswap v2 deployment with nothing but the skill file, a natural language prompt, and a human passing a private key when needed.

If you're thinking about what agent-ready docs means for your project, I'd love to hear about it. Find me on [X](https://x.com/dawnkelly09) or [LinkedIn](https://linkedin.com/in/dawnkelly09).
