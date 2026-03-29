const projects = [
  {
    title: 'Early Bird',
    description: 'A browser-based game built with the HTML5 Canvas API.',
    tags: ['JavaScript', 'Canvas API', 'Game Dev'],
    link: {
      label: 'View on GitHub →',
      href: 'https://github.com/dawnkelly09/robin-game',
    },
    link2: {
      label: 'Deployed via Vercel →',
      href: 'https://robin-game.vercel.app/'
    }
  },
  {
    title: 'Cashd Cannabis',
    description: 'A basic cannabis Q&A chatbot built with OpenAI API.',
    tags: ['JavaScript', 'OpenAI', 'LLM Dev'],
    link: {
      label: 'View on GitHub →',
      href: 'https://github.com/dawnkelly09/cashd_frontend',
    },
    link2: {
      label: 'Deployed site →',
      href: 'https://www.cashdcannabis.com/'
    }
  }
]

export default function Lab() {
  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <div className="text-terminal-green-dim text-xs">$ ls ~/lab/</div>
        <h1 className="text-xl text-terminal-green text-glow font-bold">Lab</h1>
        <p className="text-terminal-yellow text-sm">
          Personal builds, experiments, and things I'm tinkering with.
        </p>
      </section>

      {projects.map((project) => (
        <section
          key={project.title}
          className="border border-terminal-gray p-5 space-y-3 hover:border-terminal-green-50 transition-colors"
        >
          <h2 className="text-terminal-green font-bold text-base">{project.title}</h2>
          <p className="text-terminal-green text-sm italic">{project.description}</p>
          {project.tags && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-terminal-gray px-2 py-0.5 text-terminal-green-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-terminal-yellow text-sm hover:underline mt-2"
            >
              {project.link.label}
            </a>
          )}
          {project.link2 && (
            <a
              href={project.link2.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-terminal-yellow text-sm hover:underline"
            >
              {project.link2.label}
            </a>
          )}
        </section>
      ))}
    </div>
  )
}
