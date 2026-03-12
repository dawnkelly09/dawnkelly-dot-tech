const socialLinks = [
  { label: 'Email', href: 'mailto:dawnkelly09@gmail.com', display: 'dawnkelly09@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dawnkelly09', display: 'linkedin.com/in/dawnkelly09' },
  { label: 'Twitter/X', href: 'https://x.com/run4pancakes', display: 'x.com/run4pancakes' },
  { label: 'Telegram', href: 'https://t.me/dawnkelly', display: 't.me/dawnkelly' },
  { label: 'GitHub', href: 'https://github.com/dawnkelly09', display: 'github.com/dawnkelly09' }
]

export default function Contact() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <div className="text-terminal-green-dim text-xs">$ cat ~/contact.txt</div>
        <h1 className="text-xl text-terminal-green text-glow font-bold">Contact</h1>
        <p className="text-terminal-green text-sm">
          I'm always up for conversations about documentation engineering.
        </p>
      </section>

      <section className="space-y-3">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label === 'Email' ? undefined : '_blank'}
            rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
            className="flex items-center gap-4 border border-terminal-gray p-4 hover:border-terminal-green-50 transition-colors group"
          >
            <span className="text-terminal-green-dim text-sm w-20 shrink-0">{link.label}</span>
            <span className="text-terminal-yellow text-sm group-hover:underline">{link.display}</span>
          </a>
        ))}
      </section>
    </div>
  )
}
