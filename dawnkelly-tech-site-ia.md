# dawnkelly.tech — Information Architecture

## Site Identity

**Name:** Dawn Kelly
**Domain:** dawnkelly.tech
**Tagline concept:** "Documentation engineer. Building docs for humans and AI agents."
**Logo:** Updated DK mark (pending from designer)
**Stack:** Vite + React, deployed to Vercel (replacing current Next.js app)

---

## Site Map

```
dawnkelly.tech/
├── / ........................ Home (hero + positioning + highlights)
├── /work .................... Work & capabilities
├── /blog .................... Blog index (empty state ready for posts)
├── /blog/:slug .............. Individual blog post (future)
└── /contact ................. Contact + social links
```

Four routes. No deep nesting. Simple enough to ship fast, structured enough to grow.

---

## Page-by-Page Breakdown

### 1. Home (`/`)

**Purpose:** Establish who Dawn is, what she does, and why it matters — in under 10 seconds.

**Sections:**

**Hero**
- Name, title, one-line positioning statement
- Something in the spirit of: "I build documentation systems that work for developers and the AI agents that assist them."
- Not a tagline — a statement of what you do that immediately differentiates

**The Lens (2-3 short blocks)**
- This replaces the old Learn/Build/Teach framing with something that reflects current thinking
- Block 1: **Documentation Engineering** — "I design, build, and maintain documentation systems for developer-facing products. SDK guides, API references, tutorials, information architecture."
- Block 2: **Developer Experience** — "Documentation is a product. I think about it like one — user research, iteration, measurement."
- Block 3: **Docs for AI Agents** — "AI agents are a new documentation audience. I study how they consume docs, where they fail, and what they need to succeed. This is where documentation is going."
- These are short — 2-3 sentences each. They frame expertise, not explain it.

**Selected Work (preview)**
- 2-3 highlighted items from /work, linking through
- Enough to show range without overwhelming

**Blog preview (optional)**
- Latest 1-2 posts if they exist, hidden if empty
- Keeps the home page alive as content gets added

---

### 2. Work (`/work`)

**Purpose:** Show what Dawn can do, with evidence.

**Structure: Capability sections, each with supporting evidence**

**Section: Documentation Systems & Tooling**
- What: Building docs infrastructure — plugins, build pipelines, content systems
- Evidence: resolve_md plugin (open source, link to repo), general description of building MkDocs plugin ecosystems for multi-project documentation
- Framing: "I build the systems that produce documentation, not just the documentation itself."

**Section: SDK & API Documentation**
- What: End-to-end developer docs — getting started guides, tutorials, API references, SDK walkthroughs
- Evidence: Links to public documentation sites you've worked on (if any are attributable), otherwise capability description
- Framing: Covers the full lifecycle from "what is this" to "I shipped something with it"

**Section: Developer Experience & Information Architecture**
- What: Structuring docs for usability, navigation design, content strategy
- Evidence: Capability description — how you think about organizing information for developer audiences
- Framing: The structural thinking behind good docs, not just the writing

**Section: AI-Ready Documentation**
- What: The emerging practice of building docs that serve AI agents as a user persona
- Evidence: Conceptual framing only (for now) — the observation that agents are a new audience, the approach of studying their needs through observation
- Framing: "AI agents are increasingly how developers interact with documentation. I'm building the practices for making that work."
- **Note:** This section is designed to expand significantly once the CEO conversation happens. For now, it's a teaser that establishes the direction without revealing methodology.

---

### 3. Blog (`/blog`)

**Purpose:** A home for writing that doesn't exist yet but will.

**Empty state:** A clean page that says something like "Writing coming soon" or shows the section without looking broken. Not a "coming soon" landing page — just a section that's ready. 

**Post format (for when content exists):**
- Title, date, estimated read time
- Markdown-rendered content (store posts as .md files in the repo)
- Simple, readable typography — this is long-form content

**First post candidates (when ready):**
- "Agents are documentation users too" — the conceptual framing piece
- Something about the resolve_md approach to LLM-ready docs
- A reflection on documentation engineering as a discipline

---

### 4. Contact (`/contact`)

**Purpose:** Make it easy to reach Dawn.

**Content:**
- Email: dawnkelly09@gmail.com
- Social links: Telegram, Twitter/X, LinkedIn (dropping Discord and Farcaster)
- Optional: A short "I'm open to..." statement that can be toggled between "conversations about documentation engineering" (stable mode) and "new opportunities" (job hunt mode)

---

## Design Direction Notes (for Claude Code)

**Tone:** Professional but warm. Technical but approachable. This is a documentation engineer's site — it should feel well-organized and intentional, because that's the skill being demonstrated.

**Typography:** Retro computer terminal vibes

**Color:** Vintage terminal color palette: 

Color	Hex	RGB
#000000	(0,0,0)
#333333	(51,51,51)
#00ff00	(0,255,0)
#ffff33	(255,255,51)
#ffffff	(255,255,255)

**Layout:** I want to recreate the old school terminal style website with the flexibility of keyboard or mouse navigation as this will double as a portfolio and content site. I don't want to gatekeep from folks who find command lines scary.

**Responsive:** Mobile-first. This will get shared in DMs and on phones.

**Dark/light:** Dark mode only. 

---

## Technical Notes for Claude Code

**Stack:**
- Vite + React
- React Router for the 4 routes
- Tailwind CSS for styling
- Markdown rendering for blog posts (gray-matter + react-markdown or similar)
- Deploy to Vercel (vite builds are natively supported)

**Blog architecture:**
- Blog posts as .md files in a `/content/blog/` directory
- Frontmatter: title, date, description, slug
- Build step or dynamic import to create the blog index
- This keeps the writing workflow simple: write markdown, commit, deploy

**Assets:**
- DK logo as SVG (current one, replaceable when new one arrives)
- No images needed beyond the logo for v1
- Consider a simple favicon from the DK mark

**Deployment:**
- Same Vercel project, just swap the framework
- Or new Vercel project pointed at same domain

---

## What This IA Intentionally Leaves Room For

1. **The agent-ready docs story** — the /work page has a section ready to expand, and the blog is ready for the conceptual posts, once the IP conversation is resolved
2. **Case studies** — if clients give permission or work becomes public, individual project pages can be added under /work
3. **The resolve_md open source story** — can become its own page or blog post at any time
4. **A "hire me" mode** — the contact page can shift tone without restructuring anything
