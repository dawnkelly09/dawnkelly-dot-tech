---
title: Build LLM-Ready Docs
date: 2026-03-10
description: One method to build documentation to fit the needs of users working with chat-based LLM assistants.
slug: build-llm-ready-docs
tags: [llm-ready-docs, documentation]
status: published
---

# Build LLM-Ready Docs

Things in AI-assisted development continue to move at lightning speed, making working in this space both exciting and challenging right now. Creating documentation for use with chat-based LLMs like ChatGPT or Claude is now the minimum standard. If you aren't offering at least some of these features, you are already behind your competitors and peers.

## Beyond `/llms.txt` Files

First efforts to propose a standard to help LLMs use websites more effectively resulted in the `/llms.txt` file being added to documentation sites. If a site is compact enough, this file may serve as a TL;DR for using the entire site, including installation commands, links to sample repos, and condensed process steps. Most documentation sites are too dense for this approach to be practical. So, how do you make the best use of `/llms.txt` when working with a large site with multiple verticals to document? You turn it into an index to find all the good stuff on the rest of your site.

In the projects I've worked on, this took the form of creating topic-based categories to bundle markdown versions of documentation pages. Introducing category tags meant I could:

- Group pages by topic inside `/llms.txt` to create a more semantic, table-of-contents style index of all of the documentation pages.
- Concatenate pages with shared category tags into a single file containing all of the pages related to a specific topic.
- Serve those category files to users to build topical context with an LLM-based chat assistant to improve the ability to answer user questions.

That last point led to the creation of an "AI Resources" page inside the documentation projects we supported at the time. This page includes a table of category-based bundled page files and full-site indexes that users can copy, download, view in Markdown, or open in a chat with ChatGPT or Claude in their browser. You can follow these links to view some examples of the AI Resources pages where the category files are served to users:

- [**Polkadot Docs - AI Resources**](https://docs.polkadot.com/ai-resources/)
- [**Moonbeam Docs - AI Resources**](https://docs.moonbeam.network/ai-resources/)
- [**kluster.ai Docs - AI Resources**](https://docs.kluster.ai/ai-resources/)

## Get More Granular

With the category files in place, the natural next step was to make single pages available in Markdown for LLM consumption. While LLMs can read HTML webpages, they lose much of their limited context window to HTML tags that add little to their ability to understand the code or concepts on the page. At the same time, the Mkdocs-based sites I work on use placeholder syntax for things like code snippets and variable values. The solution came in the form of Python scripts, which would:

- Walk the documentation directory and collect all of the pages.
- Resolve snippet and variable placeholder syntax with their actual values.
- Strip any comments from the Markdown file.

I started calling these "resolved Markdown" files to reflect the fact that they are more than "cleaned" to strip away HTML elements; they actually have the full content in place for an LLM to consume the same complete informational picture that a human user sees. Initially, these files were output to a hidden directory inside the documentation repo and served to the user via a dropdown widget embedded next to every page title H1 element. The process to sync the files when documentation changed was manually triggered by the Developer Relations Engineer at the time of the change commit. It worked, but it definitely needed some love.

## Plugins to the Rescue

The lead Documentation Engineer on my team kicked off using Mkdocs plugins to address some pain points and improve the Markdown file resolution workflow. She created the [Copy Markdown (`copy_md`)](https://github.com/papermoonio/mkdocs-plugins/blob/main/plugins/copy_md/plugin.py) plugin to copy the resolved Markdown files into a target directory inside the built site. Because the plugin runs after the site is built, Mkdocs doesn't perform any additional processing on the files and preserves the resolved Markdown content. The resolved Markdown files can be served alongside the documentation site for use as downloadable resources for tools like chat-based LLMs.

I used `copy_md` as a jumping-off point for migrating the resolved Markdown file flow from a scattered set of scripts in the docs repos to a Mkdocs plugin. The [Resolve Markdown (`resolve_md`)](https://github.com/papermoonio/mkdocs-plugins/blob/main/plugins/resolve_md/plugin.py) Plugin enabled automatically generating the single-page resolved Markdown files after each site build. As the other LLM-ready files use these single-page files to generate their outputs, the entire LLM-ready file generation and output process was now automated. DevRel Engineers no longer had to run a command at commit time, and merge conflicts related to out-of-sync LLM-ready files were eliminated.

Complementary plugins were also created to improve maintainability and automate the generation of AI Resources pages within documentation sites. Key features added include:

- [`ai_file_actions.json`](https://github.com/papermoonio/mkdocs-plugins/blob/main/helper_lib/ai_file_utils/ai_file_actions.json): Configures AI file actions to make available in the dropdown menu widget.
- [`ai_file_utils.py`](https://github.com/papermoonio/mkdocs-plugins/blob/main/helper_lib/ai_file_utils/ai_file_utils.py): Consumes the AI file actions configuration and generates the HTML UI components for those actions.
- [AI Page Actions](https://github.com/papermoonio/mkdocs-plugins/blob/main/plugins/ai_page_actions/plugin.py) plugin: Injects the AI actions menu widget next to each page's H1 at build time. Consumes each documentation site's `llms_config.json` file to determine which pages or directories to exclude so the widget is never rendered on pages that don't contain LLM-ready files.

## Recent Updates and Roadmap

I recently improved the `resolve_md` plugin to generate files that are more useful for developers working with LLM-based chat assistants. These updates include:

- Adding timestamps to LLM-ready files so LLMs can determine when a page was last updated without fetching the page first.
- Adding version hashes so LLMs using files in a setting like RAG can tell if they have the most current version indexed without fetching the page and diffing it.

Both of these changes make working with the LLM-ready files more context-window- and token-use-friendly.

The explosion of agent-based development workflows means the road ahead involves redefining what "AI-ready docs" means. How do we design documentation that suits both the human user asking an LLM questions as they build and the agent user attempting to complete a task independently? Do we even know what agents find helpful or horrible about our existing documentation? These are the questions that shape the next steps in evolving documentation engineering to keep up with where builders are right now. Some of my initial answers are coming in a new post soon!
