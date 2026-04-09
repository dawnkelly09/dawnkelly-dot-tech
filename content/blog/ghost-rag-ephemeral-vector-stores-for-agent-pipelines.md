---
title: "Ghost RAG: the case for ephemeral vector stores in agent pipelines"
date: 2026-04-08
description: "Ghost RAG is an ephemeral vector store pattern that spins up for an agent pipeline run and tears down when it's done. Here's why I built it and what I learned."
slug: ghost-rag-ephemeral-vector-stores-agent-pipelines
tags: [rag, vector-stores, ai-agents, chromadb, context-engineering, mcp]
status: published
---

I built a thing today and I'm not sure it has a name yet.

I've been working on [Eureka](https://github.com/dawnkelly09/eureka), a multi-agent pipeline that onboards engineers to unfamiliar codebases. You point it at a GitHub repo, and a series of AI agents generate architecture overviews, a CLAUDE.md file, Claude Code hooks, and a starter Skills file. It works. But I hit a wall that I think a lot of people building agent pipelines are about to hit: context bloat.

## The problem: your first agent is doing too much lifting

Eureka's pipeline starts with an Explorer step that ingests a target repo. The Explorer needs to pull in enough context — file contents, directory structure, dependencies — for every downstream agent to do its job. An Architect agent needs to see the code to describe the architecture. A Hooks Generator needs to understand the patterns to write useful hooks.

The naive approach is to shove everything into a shared context that gets passed between agents. And that works fine on small repos. But real codebases produce enormous context payloads, and you're burning tokens shuttling all of that between agents who each only need a fraction of it.

This is the context bloat problem, and I think it's going to become one of the defining challenges as people build more complex multi-agent systems.

## The solution I landed on: progressive disclosure with an ephemeral vector store

I decided there was no reason to reinvent the wheel on repo parsing when [gitingest](https://github.com/coderamp-labs/gitingest) exists. It produces three clean artifacts from any repo: a Summary, a Directory Structure, and a Files Content dump. The formatting is excellent and agent-friendly.

But the Files Content artifact is huge. It's the full text of every file in the repo. Passing that between agents as shared context is exactly the bloat problem I was trying to solve.

Here's what I did instead:

**The lightweight context** — the Summary and Directory Structure — goes into the shared memory file that agents pass between pipeline steps. This is small. Every agent gets orientation: what this repo is, how it's organized, where things live.

**The heavy context** — the full Files Content — goes into a local ChromaDB vector store wrapped with a light MCP server. Agents get instructions for querying it. When the Architect agent needs to understand how authentication works, it queries the vector store for auth-related code. When the Hooks Generator needs to see the testing patterns, it queries for test files.

**The schema** — and this is the part I'm most proud of — is the Directory Structure itself. I tell agents to use it as their map of the database. They know what files exist and where they live, so they can make targeted queries instead of fishing blind. It's like giving someone a table of contents before asking them to find a passage in a book.

When the pipeline finishes and all agents have generated their outputs, the local ChromaDB instance tears down. Gone. It existed for the sole purpose of serving those agents during that run.

## Why I'm calling it Ghost RAG

I started calling this pattern Ghost RAG because the vector store is a ghost. It appears, it does its job, and it vanishes. There's no persistent database to maintain, no stale embeddings to worry about, no cleanup job to schedule. The data only needs to exist for as long as the agents need it.

I went looking for prior art. The individual pieces exist — LangChain has in-memory vector stores, LangGraph supports ephemeral scratch files, OpenAI's Assistants API has per-run vector stores, CrewAI uses short-term ChromaDB. But nobody has named the full lifecycle as a pattern: the deliberate spin-up, population, multi-agent querying against a schema, and teardown scoped to a single pipeline run.

The closest terms I found were "ephemeral vector store" (which describes the storage, not the pattern), "session-scoped RAG" (which is about user sessions, not pipeline runs), and "just-in-time RAG" (which is about retrieval timing, not lifecycle). None of them capture the full architecture.

So: Ghost RAG. An ephemeral local vector store that materializes with the data your agents need, serves queries for the duration of a pipeline run, and disappears when the work is done.

## Where it gets interesting: proving the agents actually used it

Here's the thing I can't ignore — I need to prove this works the way I think it does. LLMs are very good at producing plausible-sounding analysis from minimal context. If I hand an agent a directory structure and tell it there's a vector store available, how do I know it's actually querying the store and not just riffing on file names?

This is an observability problem, and I think it's the kind of problem that separates "I built a RAG pipeline" from "I built a RAG pipeline I can reason about."

My plan is to instrument the MCP server with logging that persists after the database tears down. Every query gets logged: timestamp, which agent made the call, the query text, the number of results returned, the source files in those results. The ghost disappears, but it leaves footprints.

From there, I can do post-run analysis. Did every agent query the store? Do the retrieved chunks correlate with what showed up in their output? Can I diff agent outputs against retrieved content to measure how much was RAG-informed vs. generated from the summary alone?

I'm also planning a standalone POC with a deliberately designed test case — a repo where file names are generic (`module_a.py`, `module_b.py`) but the contents contain specific implementation details the agent needs to produce correct output. If the agent's output contains details that only exist in the vector store, that's proof. If it doesn't, the pattern has a hole.

## Why this matters beyond my project

I think Ghost RAG is a useful pattern for anyone building multi-agent pipelines where:

- Your input data is large but only needed temporarily
- Multiple agents need access to the same data but only use slices of it
- You want progressive disclosure instead of context stuffing
- You don't want to maintain a persistent vector store for transient workloads

Think code review pipelines, document analysis workflows, research agent swarms that process a corpus and produce a report. Any time the data is scoped to a task, not to a user or a product, Ghost RAG might be the right shape.

The pattern also composes well. You could layer LangFuse tracing on the MCP server for full observability. You could build evals that validate agents are retrieving the right chunks. You could run the same pipeline with and without the vector store and measure output quality differences. Each of those additions makes the pattern more rigorous — and more defensible in a conversation about how you build with AI.

## What's next

I'm building a clean, forkable POC that demonstrates Ghost RAG end to end — the ChromaDB lifecycle, the MCP wrapper, the schema-driven querying, the logging, and an eval that proves the agents used the store. I'll link it here when it's ready.

If you've built something similar or have thoughts on the pattern, I'd love to hear about it. I'm [@run4pancakes](https://x.com/run4pancakes) on X.
