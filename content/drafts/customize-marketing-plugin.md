---
title: "How I customized a Claude plugin for my content workflow"
date: 2026-04-13
description: "A build-in-public walkthrough of customizing the Marketing plugin in Claude Cowork — what changed, how the file structure works, and what I'd do differently."
slug: customize-marketing-plugin
tags: [claude, cowork, plugins, build-in-public, ai-tools]
status: outline
---

<!-- Headline options:
1. How I customized a Claude plugin for my content workflow
2. Inside a customized Claude plugin: what the files actually look like
3. I customized an AI marketing plugin for my blog — here's what changed
-->

# How I customized a Claude plugin for my content workflow

## The starting point: what the Marketing plugin does out of the box

<!-- 2-3 paragraphs. Explain what the generic Marketing plugin ships with — 7 skills covering content drafting, campaign planning, SEO, brand review, competitive analysis, email sequences, and performance reporting. It's built for marketing teams, not solo bloggers. The skills are good but generic — they ask you about your brand voice every time, don't know your site, and include channels you don't use. Link back to the Intro to Cowork post where you first mentioned plugins. -->

## What I wanted it to do instead

<!-- 1-2 paragraphs. The five capabilities you outlined: content series planning, SEO, publishing cadence nudges, blog post scaffolding, and an AI research assistant. Frame this as: I don't need a marketing suite, I need a content workflow that knows my blog. -->

## The customization conversation

<!-- 2-3 paragraphs. Walk through the actual process — you told Claude what you wanted in plain language, it asked clarifying questions (blog URL, tools, audience, cadence), and then worked through the changes. The key insight: customization is conversational, not configuration. You didn't edit config files — you described your workflow and the tool figured out what to change. -->

## What changed: a skill-by-skill breakdown

<!-- This is the meat of the post. For each skill that was meaningfully changed, show the before/after. Use the marketing-plugin-source/ files as reference. -->

### draft-content: from generic marketing copy to markdown blog drafts

<!-- Before: asked for content type from a long list (press releases, case studies, landing pages...), asked about brand voice every time, output as plain text. After: defaults to blog posts, outputs markdown with frontmatter ready for content/drafts/, brand voice baked in, includes blog-to-social repurposing. -->

### campaign-plan: from campaign briefs to content series planning

<!-- Before: full campaign brief with budget allocation, channel strategy, paid media. After: content series planner with editorial calendar, publishing cadence tracking that reads your content/ directory, and quick-ship suggestions when you're behind. This was the biggest transformation. -->

### competitive-brief: from competitor battlecards to AI research assistant

<!-- Before: competitive analysis with positioning maps, battlecards, sales objection handling. After: three modes — industry scan for weekly AI news, topic deep dive for post research, voice landscape to see what others in the space are writing about. -->

### seo-audit: pre-filled for dawnkelly.tech

<!-- Before: asked for your URL and keywords every time. After: defaults to dawnkelly.tech with your target keywords pre-loaded, tuned for a new site building authority in a niche. Smaller change but removes friction. -->

### brand-review: voice profile baked in

<!-- Before: asked if you had brand guidelines or offered a generic review. After: your full voice profile is embedded — technical but approachable, professional but warm, curious and honest, opinionated with evidence. Style rules included. -->

## The file structure: what a plugin actually looks like

<!-- 2-3 paragraphs + a file tree. Show the directory structure from marketing-plugin-source/. Explain that each skill is a SKILL.md file with frontmatter (name, description, trigger hint) and instructions. The .mcp.json configures connected tools. The plugin.json is metadata. Demystify it — these are just markdown files with a zip wrapper. -->

```
marketing-plugin-source/
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata (name, version)
├── .mcp.json                # Connected tools config
├── CONNECTORS.md            # Which tools the plugin uses
├── README.md                # Overview and usage examples
└── skills/
    ├── brand-review/SKILL.md
    ├── campaign-plan/SKILL.md
    ├── competitive-brief/SKILL.md
    ├── content-creation/SKILL.md    # Background reference (not invocable)
    ├── draft-content/SKILL.md
    ├── email-sequence/SKILL.md
    ├── performance-report/SKILL.md
    └── seo-audit/SKILL.md
```

## The practical tip I almost missed

<!-- Short section. When you install the customized plugin, deactivate the original Anthropic version. Otherwise you get duplicate skills and it's unclear which one runs. -->

## What I'd do differently next time

<!-- 1-2 paragraphs. Reflection. Maybe: start with a clearer list of exactly what you want each skill to do. Or: think about the social media workflow earlier — you didn't realize until planning that blog-to-social repurposing would be so useful. Honest build-in-public reflection. -->

## What's next

<!-- Short closing. Tease that you're now using the customized plugin to plan and draft your content — meta! Link to the content series plan. Soft CTA: follow along on X or LinkedIn. -->
