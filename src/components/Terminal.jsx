import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const COMMANDS = {
  help: {
    description: 'Show available commands',
  },
  home: {
    description: 'Go to home page',
    route: '/',
  },
  lab: {
    description: 'View lab experiments & builds',
    route: '/lab',
  },
  work: {
    description: 'View work & capabilities',
    route: '/work',
  },
  blog: {
    description: 'Read the blog',
    route: '/blog',
  },
  contact: {
    description: 'Get in touch',
    route: '/contact',
  },
  clear: {
    description: 'Clear terminal output',
  },
}

export default function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to dawnkelly.tech — type "help" for available commands.' },
  ])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  function handleSubmit(e) {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    const newHistory = [...history, { type: 'input', text: `visitor@dawnkelly.tech:${location.pathname}$ ${cmd}` }]
    setCommandHistory(prev => [cmd, ...prev])
    setHistoryIndex(-1)

    if (cmd === 'help') {
      newHistory.push({
        type: 'output',
        text: Object.entries(COMMANDS)
          .map(([name, { description }]) => `  ${name.padEnd(10)} ${description}`)
          .join('\n'),
      })
    } else if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    } else if (COMMANDS[cmd]) {
      navigate(COMMANDS[cmd].route)
      newHistory.push({ type: 'system', text: `Navigating to ${COMMANDS[cmd].route}...` })
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${cmd}. Type "help" for available commands.` })
    }

    setHistory(newHistory)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div className="border-t border-terminal-gray bg-terminal-dark">
      {/* Output area */}
      {history.length > 0 && (
        <div ref={outputRef} className="max-h-48 overflow-y-auto px-4 pt-2 text-xs">
          {history.map((entry, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap ${
                entry.type === 'input'
                  ? 'text-terminal-green-dim'
                  : entry.type === 'error'
                  ? 'text-red-400'
                  : entry.type === 'system'
                  ? 'text-terminal-yellow'
                  : 'text-terminal-green'
              }`}
            >
              {entry.text}
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 gap-2 text-sm">
        <span className="text-terminal-green-dim shrink-0">
          visitor@dawnkelly.tech:{location.pathname}$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-terminal-green outline-none caret-terminal-green font-mono"
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal command input"
        />
      </form>
    </div>
  )
}
