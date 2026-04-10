---
title: "The code was coming from inside the house"
date: 2026-04-10
description: "I found AI-generated code silently undermining my agent architecture. Here's how to catch it before your token budget does."
slug: code-coming-from-inside-the-house
tags:
  [ai-agents, claude, trust-but-verify, building-in-public, prompt-engineering]
status: published
---

I've been building a multi-agent pipeline — four Claude-powered nodes that analyze a codebase and produce a structured report. It worked. The output was clean, the formatting was correct, and I was genuinely proud of it.

Then I noticed my API usage was through the roof.

Not "I'm testing a lot" through the roof. More like "something is deeply wrong and I can't figure out what" through the roof. I spent days chasing a formatting bug that turned out to not be a formatting bug at all. The real problem was hiding one layer deeper, in the agent runner — and I'd never looked because the pipeline kept producing correct output.

Turns out, my house was haunted.

## What was living in the walls

The pipeline is built on top of Gauntlet CTO Ash Tilawat's [Minimum Viable Factory](https://github.com/ashtilawat/minimum-viable-factory), a beautifully lean starter architecture for multi-agent workflows. The original agent runner is about 55 lines of clean Python. It reads a skill file, reads a memory file, builds a prompt from those two things, calls Claude, and collects the output. The skill file is the single source of truth for what each agent does and how it structures its work.

When I forked it and started customizing, I was focused on the agent files because I was thinking about context management. I looked at the runner files to get a birds eye view, and never did much with them again until today. Once I saw a pipeline run, I went to work in the agent flow section. Everything was looking good except one formatting bug. I tried a few tweaks and wasn't getting things quite right so I did a "prompt and pray" to ask Claude to help me fix the bug. I figured if it worked, great. If not, I'd open a ticket and move on.

Being the diligent junior engineer Claude is, it got right to work.

It loaded an output template from an assets directory, stripped HTML comments from it, did a string replacement to inject the project name, and stuffed the whole thing into the system prompt alongside the skill instructions. Then it added a six-line "CRITICAL OUTPUT RULES" block on top of that, telling the agent that its text output IS the artifact.

The thing is — the skill files already described the output structure. Every heading in that template was already specified in the skill, with context about what belongs under each one. Claude had duplicated the structural instructions in a less useful format, and I was paying tokens to say the same thing twice on every single agent call, across four nodes, on every pipeline run.

## Why I didn't catch it

Because it worked. That's the haunted house problem — the lights turn on, the doors open, everything functions exactly as expected. You don't go poking around in the crawl space when the house passes inspection.

My functional tests all passed. Does the output have the right sections? Yes. Are the headings correct? Yes. Does the content make sense? Yes. Nothing in my eval pipeline was asking the harder question: _is the prompt efficient?_ Is the agent actually using everything we're injecting, or are we burning tokens on redundant instructions?

Functional correctness is the easy eval. Architectural fidelity is the hard one — and I didn't have it.

## How I found the ghost

I looked inside and found myself faced with the hot mess described above. I couldn't figure out why Ash would build what I was seeing and I went back to his repo to see if I could figure something out. Why would he put extra prompting in the script when the agents are configured via the `skills` repo?

I was comparing my version against the original to understand where they'd diverged. I pulled up Ash's agent runner side by side with mine and started mapping the differences. The original prompt construction was about ten lines. Mine was fifty-five. The delta was almost entirely the template injection and the output rules block — things the original intentionally didn't include because the skill files already handled it.

The moment I saw it, the formatting bug I'd been chasing clicked into place too. I'd been trying to fix output formatting by tweaking skill files, but my changes weren't sticking because the injected template was overriding them. The template was the source of truth the agent was actually following, not the skill. I was editing the wrong file.

## The fix was deletion

I ripped out the template injection, removed the CRITICAL OUTPUT RULES block, and dropped the frontmatter stripping logic. The prompt went back to the original's structure: a framing line, the memory, and the skill. Three components.

The skill files became the single source of truth again. The formatting bug resolved as a side effect — not because I fixed formatting, but because I removed the thing that was fighting the correct formatting I'd already written.

If you're thinking "progressive disclosure would've prevented this" — yes, exactly. A well-configured skill plus the Read tool means the agent can discover a template on its own if it needs a structural reference. You give it the instructions and let it pull reference material when needed. That's a pointer, not a payload. Claude's instinct was to front-load everything into the prompt because that's the safest way to guarantee output compliance. It doesn't reason about context budget as a scarce resource.

## What I'm doing differently now

The lesson isn't "don't use Claude to write code." I use Claude constantly and I'll keep using it. The lesson is that Claude is a syntax savant — it will build you a working pipeline every time — but it optimizes for "does the output look right," not "is the system designed well." Those are different questions, and if your evals only check the first one, you'll miss it when the second one goes sideways.

Here's what I'm adding to my process:

**Prompt size audits.** Before I accepted that the pipeline "worked," I should have measured how many tokens each agent was consuming per run. A simple assertion on prompt size would have flagged the bloat immediately.

**Architectural diff reviews.** When Claude generates infrastructure code — not application logic, but the scaffolding that orchestrates other agents — I need to diff it against the design I intended. Functional tests won't catch "correct but wasteful."

**The trust-but-verify habit.** If I'm building on top of someone else's architecture, the original is my reference implementation. When my version diverges, I need to understand why. "Claude added it and it works" is not a sufficient answer.

This whole experience is becoming a running case study in my Eureka project — a living artifact for exactly this kind of trust-but-verify lesson. The pipeline works. It always worked. But "works" and "works well" are separated by the evals you don't think to write.

The code was coming from inside the house. Check your crawl spaces.
