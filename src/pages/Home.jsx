import { Link } from 'react-router-dom'

const capabilities = [
  {
    title: 'Documentation Engineering',
    text: 'I design, build, and maintain documentation systems for developer-facing products.',
  },
  {
    title: 'Developer Experience',
    text: "Documentation is a product. I think about it like one\u2009—\u2009user research, iteration, measurement.",
  },
  {
    title: 'Docs for AI Agents',
    text: 'AI agents are a new documentation audience. I study how they consume docs, where they fail, and what they need to succeed. This is where documentation is going.',
  },
]

const selectedWork = [
  {
    title: 'Documentation Systems & Tooling',
    text: 'Building the infrastructure that produces documentation, not just the docs themselves.',
    link: '/work',
  },
  {
    title: 'SDK & API Documentation',
    text: 'End-to-end developer docs from "what is this" to "I shipped something with it."',
    link: '/work',
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <div className="text-terminal-green-dim text-xs">$ cat ~/about.txt</div>
        <h1 className="text-2xl md:text-3xl text-terminal-green text-glow font-bold">
          Dawn Kelly
        </h1>
        <p className="text-terminal-white text-lg">Documentation Engineer</p>
        <p className="text-terminal-green leading-relaxed max-w-xl">
          I build documentation systems that work for developers and the AI agents that assist them.
        </p>
      </section>

      {/* The Lens */}
      <section className="space-y-6">
        <div className="text-terminal-green-dim text-xs">$ ls ~/expertise/</div>
        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="border border-terminal-gray p-4 space-y-2 hover:border-terminal-green-50 transition-colors"
            >
              <h2 className="text-terminal-green-dim text-base font-bold me-2">{cap.title}</h2>
              <p className="text-terminal-white text-sm leading-relaxed">{cap.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Work */}
      <section className="space-y-4">
        <div className="text-terminal-green-dim text-xs">$ ls ~/work/ | head -2</div>
        {selectedWork.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="block border border-terminal-gray p-4 hover:border-terminal-green-50 transition-colors group"
          >
            <h3 className="text-terminal-green-dim text-base font-bold group-hover:underline">
              {item.title}
            </h3>
            <p className="text-terminal-white text-sm mt-1">{item.text}</p>
          </Link>
        ))}
        <Link to="/work" className="text-terminal-yellow text-sm hover:underline">
          → View all work
        </Link>
      </section>
    </div>
  )
}
