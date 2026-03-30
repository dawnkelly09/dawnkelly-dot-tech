import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Robot SVG ────────────────────────────────────────────────────────────────
function Robot({ mousePos, containerRef, sparked, onClick }) {
  const robotRef = useRef(null)
  const [eyeAngle, setEyeAngle] = useState(0)
  const [antennaWiggle, setAntennaWiggle] = useState(0)
  const [armAngle, setArmAngle] = useState(0)

  useEffect(() => {
    if (!robotRef.current || !containerRef.current) return
    const robotRect = robotRef.current.getBoundingClientRect()
    const robotCenterX = robotRect.left + robotRect.width / 2
    const robotCenterY = robotRect.top + robotRect.height * 0.35

    const dx = mousePos.x - robotCenterX
    const dy = mousePos.y - robotCenterY
    const angle = Math.atan2(dy, dx)
    const dist = Math.sqrt(dx * dx + dy * dy)

    setEyeAngle(angle)
    setAntennaWiggle(Math.sin(Date.now() / 600) * 4 + (dx / window.innerWidth) * 6)
    setArmAngle(Math.min(Math.max((dy / window.innerHeight) * 20, -15), 15))
  }, [mousePos, containerRef])

  // Pupil offset — follows mouse but clamped to stay in eye socket
  const pupilDist = 3.5
  const px = Math.cos(eyeAngle) * pupilDist
  const py = Math.sin(eyeAngle) * pupilDist

  // Antenna tip position
  const antX = 50 + Math.sin((antennaWiggle * Math.PI) / 180) * 8
  const antY = 8

  return (
    <div
      ref={robotRef}
      onClick={onClick}
      className="cursor-pointer select-none"
      title="click me"
      style={{ filter: sparked ? 'brightness(2) drop-shadow(0 0 8px #00ff00)' : 'drop-shadow(0 0 4px #00ff0055)' }}
    >
      <svg
        width="90"
        height="160"
        viewBox="0 0 100 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Antenna ── */}
        <line
          x1="50" y1="22"
          x2={antX} y2={antY}
          stroke="#00ff00" strokeWidth="2" strokeLinecap="round"
        />
        <circle cx={antX} cy={antY} r="3.5" fill="#00ff00" />

        {/* ── Head ── */}
        <rect x="22" y="22" width="56" height="44" rx="8"
          fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />

        {/* ── Eye sockets ── */}
        <circle cx="38" cy="42" r="9" fill="#001a00" stroke="#00ff00" strokeWidth="1" />
        <circle cx="62" cy="42" r="9" fill="#001a00" stroke="#00ff00" strokeWidth="1" />

        {/* ── Pupils (track mouse) ── */}
        <circle cx={38 + px} cy={42 + py} r="4" fill="#00ff00" />
        <circle cx={62 + px} cy={42 + py} r="4" fill="#00ff00" />

        {/* ── Pupil shine ── */}
        <circle cx={38 + px - 1.2} cy={42 + py - 1.2} r="1.2" fill="#ffffff88" />
        <circle cx={62 + px - 1.2} cy={42 + py - 1.2} r="1.2" fill="#ffffff88" />

        {/* ── Mouth ── */}
        <rect x="32" y="56" width="36" height="5" rx="2.5"
          fill="#001a00" stroke="#00ff00" strokeWidth="1" />
        {/* Teeth */}
        {[35, 41, 47, 53, 59].map((x, i) => (
          <rect key={i} x={x} y="57" width="4" height="3" rx="0.5" fill="#00ff00" opacity="0.7" />
        ))}

        {/* ── Neck ── */}
        <rect x="44" y="66" width="12" height="8" rx="2"
          fill="#0a0a0a" stroke="#00ff00" strokeWidth="1" />

        {/* ── Body ── */}
        <rect x="18" y="74" width="64" height="58" rx="8"
          fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />

        {/* ── Chest panel ── */}
        <rect x="28" y="82" width="44" height="30" rx="4"
          fill="#001a00" stroke="#00ff00" strokeWidth="1" />

        {/* ── Chest lights ── */}
        <circle cx="38" cy="90" r="3" fill={sparked ? "#ffffff" : "#00ff00"} opacity={sparked ? 1 : 0.9} />
        <circle cx="50" cy="90" r="3" fill={sparked ? "#ffff00" : "#00cc00"} opacity="0.7" />
        <circle cx="62" cy="90" r="3" fill={sparked ? "#00ffff" : "#009900"} opacity="0.5" />

        {/* ── Progress bar ── */}
        <rect x="32" y="99" width="36" height="5" rx="2" fill="#001a00" stroke="#00ff00" strokeWidth="0.5" />
        <rect x="32" y="99" width={sparked ? "36" : "22"} height="5" rx="2" fill="#00ff00"
          style={{ transition: 'width 0.3s ease' }} />

        {/* ── Belly bolt ── */}
        <circle cx="50" cy="120" r="5" fill="#001a00" stroke="#00ff00" strokeWidth="1" />
        <text x="50" y="123.5" textAnchor="middle" fill="#00ff00"
          fontSize="6" fontFamily="monospace">⚡</text>

        {/* ── Left arm (tilts with cursor Y) ── */}
        <g transform={`rotate(${-armAngle} 18 95)`} style={{ transformOrigin: '18px 95px' }}>
          <rect x="4" y="74" width="14" height="38" rx="7"
            fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />
          {/* Hand */}
          <circle cx="11" cy="116" r="7"
            fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />
          <line x1="8" y1="113" x2="8" y2="120" stroke="#00ff00" strokeWidth="1" strokeLinecap="round" />
          <line x1="11" y1="112" x2="11" y2="120" stroke="#00ff00" strokeWidth="1" strokeLinecap="round" />
          <line x1="14" y1="113" x2="14" y2="120" stroke="#00ff00" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* ── Right arm ── */}
        <g transform={`rotate(${armAngle} 82 95)`} style={{ transformOrigin: '82px 95px' }}>
          <rect x="82" y="74" width="14" height="38" rx="7"
            fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />
          {/* Hand */}
          <circle cx="89" cy="116" r="7"
            fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />
          <line x1="86" y1="113" x2="86" y2="120" stroke="#00ff00" strokeWidth="1" strokeLinecap="round" />
          <line x1="89" y1="112" x2="89" y2="120" stroke="#00ff00" strokeWidth="1" strokeLinecap="round" />
          <line x1="92" y1="113" x2="92" y2="120" stroke="#00ff00" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* ── Legs ── */}
        <rect x="30" y="132" width="16" height="28" rx="6"
          fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />
        <rect x="54" y="132" width="16" height="28" rx="6"
          fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />

        {/* ── Feet ── */}
        <rect x="26" y="155" width="24" height="12" rx="5"
          fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />
        <rect x="50" y="155" width="24" height="12" rx="5"
          fill="#0a0a0a" stroke="#00ff00" strokeWidth="1.5" />

        {/* ── Sparked particles ── */}
        {sparked && (
          <g>
            {[
              [50, 45, -30], [50, 45, 60], [50, 45, 150],
              [50, 45, 240], [50, 45, 320], [50, 45, 200],
            ].map(([cx, cy, angle], i) => {
              const r = 18 + (i % 3) * 8
              const sx = cx + Math.cos((angle * Math.PI) / 180) * r
              const sy = cy + Math.sin((angle * Math.PI) / 180) * r
              return (
                <line key={i}
                  x1={cx} y1={cy} x2={sx} y2={sy}
                  stroke={i % 2 === 0 ? "#00ff00" : "#ffff00"}
                  strokeWidth="1.5" strokeLinecap="round" opacity="0.9"
                />
              )
            })}
          </g>
        )}
      </svg>
    </div>
  )
}

// ─── Scanline overlay ─────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
      }}
    />
  )
}

// ─── Typing effect hook ───────────────────────────────────────────────────────
function useTypingEffect(text, speed = 18) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, done }
}

// ─── Pretext layout hook ──────────────────────────────────────────────────────
function usePretextHeight(text, font, width, lineHeight) {
  const [height, setHeight] = useState(null)
  const [lineCount, setLineCount] = useState(null)

  useEffect(() => {
    if (!text || !width) return
    let cancelled = false

    import('@chenglou/pretext').then(({ prepare, layout }) => {
      if (cancelled) return
      try {
        const prepared = prepare(text, font)
        const result = layout(prepared, width, lineHeight)
        setHeight(result.height)
        setLineCount(result.lineCount)
      } catch (e) {
        // pretext not installed yet — fall back gracefully
        setHeight(null)
      }
    }).catch(() => setHeight(null))

    return () => { cancelled = true }
  }, [text, font, width, lineHeight])

  return { height, lineCount }
}

// ─── Blog post content ────────────────────────────────────────────────────────
const POST_TITLE = "Did You Ship Anything with Pretext This Weekend?"

const POST_PARAGRAPHS = [
  "On Friday afternoon, a library called pretext dropped on GitHub and dev Twitter went feral. By Saturday morning the original tweet had 2,000 reposts. I'm working on shipping momentum and experimentation so, by Sunday I had something running on my site. This is that story.",

  "Pretext is a pure JavaScript library for measuring multiline text height without touching the DOM. That sounds boring until you understand what 'touching the DOM' costs you. Every time you call `getBoundingClientRect()` or `offsetHeight` in a resize hot path, you force the browser to halt, recalculate layout, and hand you back a number. It's one of the most expensive operations in the browser. Pretext sidesteps all of it.",

  "The way it works is elegant: you call `prepare()` once with your text and font string. It normalizes whitespace, segments the text using `Intl.Segmenter`, measures the segments via canvas (which bypasses layout entirely), and hands you back an opaque handle. Then `layout()` is pure arithmetic over cached widths — no DOM reads, no canvas calls, nothing. On the benchmark snapshot in the repo: `prepare()` runs in about 19ms for a 500-text batch. `layout()` runs in 0.09ms for that same batch. That's roughly 500x faster than the DOM approach.",

  "The demo on my site uses it to do something small and silly: the robot in the left margin knows exactly how tall each paragraph is before the browser renders it. That's the flex. Not that it looks cool (it does), but that the layout math is happening without reflow. The text columns, the spacing, the robot's position relative to the content — all calculated before a single pixel hits the screen.",

  "I'm a documentation engineer, not a front-end wizard. I built this in a few minutes on a Sunday with Claude Code doing the heavy SVG lifting. The point wasn't to master pretext. The point was to understand it well enough to ship something real with it, write about it honestly, and have a timestamped artifact that says: I saw this thing, I got it, I moved.",

  "That's the build-in-public bet. The library is hot this weekend. Next weekend it's just another tool. The gap between 'I saw it' and 'I shipped something with it' is where the signal lives. This is the momentum I'm working to build in my shipping trajectory.",

  "If you want to play with pretext yourself: `npm install @chenglou/pretext`. The API is small — `prepare()`, `layout()`, and a handful of richer variants for manual line routing. The `README` is genuinely good. The `AGENTS.md` is a masterclass in writing documentation that an AI agent can actually use, which as a docs engineer I found almost more interesting than the library itself. The developer has created an open invitations for agents to participate in improving the tool and I can't wait to see how it progresses.",
]

// ─── Main component ───────────────────────────────────────────────────────────
export default function RobotDemo() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [sparked, setSparked] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showPretext, setShowPretext] = useState(false)
  const sparkTimer = useRef(null)

  // Terminal typing effect for the title
  const { displayed: titleDisplayed, done: titleDone } = useTypingEffect(POST_TITLE, 22)

  // Show pretext badge after a moment
  useEffect(() => {
    const t = setTimeout(() => setShowPretext(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  const handleSpark = useCallback(() => {
    setSparked(true)
    setClickCount(c => c + 1)
    clearTimeout(sparkTimer.current)
    sparkTimer.current = setTimeout(() => setSparked(false), 400)
  }, [])

  // Sample pretext measurement on paragraph 2 (the technical one)
  const SAMPLE_TEXT = POST_PARAGRAPHS[2]
  const SAMPLE_FONT = '16px ui-monospace, monospace'
  const SAMPLE_LINE_H = 28
  const [textWidth, setTextWidth] = useState(600)
  const contentRef = useRef(null)

  useEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        setTextWidth(contentRef.current.offsetWidth)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { height: measuredHeight, lineCount } = usePretextHeight(
    SAMPLE_TEXT, SAMPLE_FONT, textWidth, SAMPLE_LINE_H
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-black text-green-400 font-mono"
      style={{ fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace' }}
    >
      <Scanlines />

      {/* ── Header bar ── */}
      <div className="border-b border-green-900 px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: '#050a05' }}>
        <a href="/" className="text-green-600 hover:text-green-400 text-sm transition-colors">
          ← dawnkelly.tech
        </a>
        <div className="flex items-center gap-3">
          <span className="text-green-900 text-xs">PRETEXT DEMO</span>
          <span className="text-green-600 text-xs animate-pulse">■ LIVE</span>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Pretext badge ── */}
        {showPretext && (
          <div className="mb-8 inline-flex items-center gap-2 border border-green-800 px-3 py-1.5 text-xs text-green-600"
            style={{
              animation: 'fadeIn 0.5s ease',
              backgroundColor: '#050a05',
            }}>
            <span className="text-green-400">⬡</span>
            built with @chenglou/pretext
            <span className="text-green-800 mx-1">|</span>
            <a
              href="https://github.com/chenglou/pretext"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-300 transition-colors"
            >
              github ↗
            </a>
          </div>
        )}

        {/* ── Title ── */}
        <div className="mb-10">
          <div className="text-green-800 text-xs mb-3 tracking-widest">
            DAWN KELLY · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
          </div>
          <h1 className="text-2xl leading-tight text-green-300 mb-1"
            style={{ fontWeight: 400 }}>
            {titleDisplayed}
            {!titleDone && (
              <span className="animate-pulse text-green-400">█</span>
            )}
          </h1>
        </div>

        {/* ── Two-column layout: robot + content ── */}
        <div className="flex gap-8 items-start">

          {/* ── Robot column ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3 sticky top-12">
            <Robot
              mousePos={mousePos}
              containerRef={containerRef}
              sparked={sparked}
              onClick={handleSpark}
            />
            <div className="text-center">
              <div className="text-green-800 text-xs">
                {clickCount === 0 && 'click me'}
                {clickCount === 1 && '⚡ zap!'}
                {clickCount === 2 && 'again?'}
                {clickCount === 3 && '...ok'}
                {clickCount >= 4 && `×${clickCount}`}
              </div>
            </div>
          </div>

          {/* ── Article content ── */}
          <div ref={contentRef} className="flex-1 min-w-0">

            {POST_PARAGRAPHS.map((para, i) => (
              <div key={i}>
                <p
                  className="text-green-300 leading-7 mb-6 text-base"
                  style={{ lineHeight: '1.75rem' }}
                >
                  {para}
                </p>

                {/* ── Pretext measurement callout after paragraph 2 ── */}
                {i === 2 && measuredHeight && (
                  <div
                    className="mb-6 border border-green-900 p-4 text-xs"
                    style={{ backgroundColor: '#020802' }}
                  >
                    <div className="text-green-600 mb-2 tracking-widest">
                      ▸ PRETEXT MEASUREMENT — THIS PARAGRAPH
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-green-800 mb-1">predicted height</div>
                        <div className="text-green-400 text-lg">{Math.round(measuredHeight)}px</div>
                      </div>
                      <div>
                        <div className="text-green-800 mb-1">line count</div>
                        <div className="text-green-400 text-lg">{lineCount}</div>
                      </div>
                      <div>
                        <div className="text-green-800 mb-1">dom reads</div>
                        <div className="text-green-400 text-lg">0</div>
                      </div>
                    </div>
                    <div className="text-green-900 mt-3">
                      ↑ calculated before this element rendered · no reflow triggered
                    </div>
                  </div>
                )}

                {/* ── Divider after paragraph 3 ── */}
                {i === 3 && (
                  <div className="flex items-center gap-3 my-6">
                    <div className="h-px flex-1 bg-green-950" />
                    <span className="text-green-900 text-xs">* * *</span>
                    <div className="h-px flex-1 bg-green-950" />
                  </div>
                )}
              </div>
            ))}

            {/* ── Footer ── */}
            <div className="mt-10 pt-6 border-t border-green-950 flex flex-wrap gap-4 text-xs text-green-800">
              <a
                href="https://github.com/chenglou/pretext"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition-colors"
              >
                github.com/chenglou/pretext ↗
              </a>
              <a
                href="https://github.com/dawnkelly09/dawnkelly-dot-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition-colors"
              >
                source for this page ↗
              </a>
              <span className="text-green-950">·</span>
              <span>robot clicks: {clickCount}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
