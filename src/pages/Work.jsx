const sections = [
  {
    title: 'Documentation Systems & Tooling',
    framing: 'I build the systems that produce documentation, not just the documentation itself.',
    details: [
      'Building docs infrastructure\u2009—\u2009plugins, build pipelines, content systems',
      'resolve_md plugin for MkDocs (open source)',
      'MkDocs plugin ecosystems for multi-project documentation',
    ],
    link: {
      label: 'View mkdocs-plugins on GitHub →',
      href: 'https://github.com/papermoonio/mkdocs-plugins',
    },
  },
  {
    title: 'SDK & API Documentation',
    framing:
      'Covers the full lifecycle from "what is this" to "I shipped something with it."',
    details: [
      'End-to-end developer docs\u2009—\u2009getting started guides, tutorials, API references, SDK walkthroughs',
      'Structuring content for different developer experience levels',
      'Writing documentation that reduces support burden',
    ],
    link: {
      label: 'Wormhole Token Attestation Guide →',
      href: 'https://wormhole.com/docs/products/token-transfers/wrapped-token-transfers/guides/attest-tokens/',
    },
  },
  {
    title: 'Developer Experience & Information Architecture',
    framing: 'The structural thinking behind good docs, not just the writing.',
    details: [
      'Structuring docs for usability and discoverability',
      'Navigation design and content strategy',
      'Organizing information for developer audiences',
    ],
    link: {
      label: 'User Journey Map Example →',
      href: '/user-journey-example.png',
    },
  },
  {
    title: 'AI-Ready Documentation',
    framing:
      'AI agents are increasingly how developers interact with documentation. I\'m building the practices for making that work.',
    details: [
      'Studying how AI agents consume documentation and where they fail',
      'Building docs that serve agents as a user persona',
      'Defining the emerging practice of agent-ready documentation',
    ],
    link: {
      label: 'AI Resources for kluster.ai documentation →',
      href: 'https://docs.kluster.ai/ai-resources/'
    },
    link2: {
      label: 'AI Resources for Polkadot documentation →',
      href: 'https://polkadot.network/ai-resources/'
    }
  },
]

export default function Work() {
  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <div className="text-terminal-green-dim text-xs">$ cat ~/work/README.md</div>
        <h1 className="text-xl text-terminal-green text-glow font-bold">Work & Capabilities</h1>
        <p className="text-terminal-yellow text-sm">
          What I do, with evidence.
        </p>
      </section>

      {sections.map((section) => (
        <section
          key={section.title}
          className="border border-terminal-gray p-5 space-y-3 hover:border-terminal-green-50 transition-colors"
        >
          <h2 className="text-terminal-green font-bold text-base">{section.title}</h2>
          <p className="text-terminal-green text-sm italic">{section.framing}</p>
          <ul className="space-y-1 text-sm">
            {section.details.map((detail, i) => (
              <li key={i} className="text-terminal-white">
                <span className="text-terminal-white">├─</span> {detail}
              </li>
            ))}
          </ul>
          {section.link && (
            <a
              href={section.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-terminal-yellow text-sm hover:underline mt-2"
            >
              {section.link.label}
            </a>
          )}
          {section.link2 && (
            <a
              href={section.link2.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-terminal-yellow text-sm hover:underline"
            >
              {section.link2.label}
            </a>
          )}
        </section>
      ))}
    </div>
  )
}
