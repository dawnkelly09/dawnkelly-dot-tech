import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: '~/' },
  { to: '/work', label: '/work' },
  { to: '/blog', label: '/blog' },
  { to: '/contact', label: '/contact' },
]

export default function Nav() {
  return (
    <nav className="border-b border-terminal-gray px-4 py-3 flex items-center gap-6 text-sm">
      <span className="text-terminal-green-dim font-bold tracking-wide">DK</span>
      <div className="flex gap-4">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `hover:text-terminal-green transition-colors ${
                isActive ? 'text-terminal-green text-glow' : 'text-terminal-green-dim'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
