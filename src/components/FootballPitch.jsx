import { useState, useRef, useMemo } from 'react'

// Players are laid out by line (keeper/defense/midfield/attack) rather than by
// exact position, so a team can never end up with a lopsided pile of icons in
// one corner no matter which mix of positions was actually drafted.
const TIER_OF = { GB: 'GB', DC: 'DEF', DD: 'DEF', DG: 'DEF', MDC: 'MID', MC: 'MID', MO: 'MID', AD: 'ATT', AG: 'ATT', ATT: 'ATT' }
const TIER_Y = { GB: 88, DEF: 72, MID: 48, ATT: 18 }
const TIER_ORDER = ['GB', 'DEF', 'MID', 'ATT']
const MAX_PER_ROW = 5

function layoutTeam(team) {
  const tiers = { GB: [], DEF: [], MID: [], ATT: [] }
  team.forEach(entry => {
    tiers[TIER_OF[entry.position] || 'MID'].push(entry)
  })
  const coords = {}
  TIER_ORDER.forEach(tier => {
    const entries = tiers[tier]
    if (entries.length === 0) return
    const rowCount = Math.ceil(entries.length / MAX_PER_ROW)
    entries.forEach((entry, i) => {
      const row = Math.floor(i / MAX_PER_ROW)
      const rowStart = row * MAX_PER_ROW
      const rowSize = Math.min(MAX_PER_ROW, entries.length - rowStart)
      const posInRow = i - rowStart
      const x = rowSize === 1 ? 50 : 12 + posInRow * (76 / (rowSize - 1))
      const rowOffset = rowCount > 1 ? (row - (rowCount - 1) / 2) * 11 : 0
      coords[entry.id] = { x, y: Math.max(6, Math.min(94, TIER_Y[tier] + rowOffset)) }
    })
  })
  return coords
}

export default function FootballPitch({ team, color, isActive, myName, onUpdateCoords }) {
  const svgRef = useRef(null)
  const drag = useRef(null)
  const [overrides, setOverrides] = useState({})

  function toPct(e) {
    const pt = svgRef.current.createSVGPoint()
    const src = e.touches?.[0] ?? e
    pt.x = src.clientX
    pt.y = src.clientY
    const p = pt.matrixTransform(svgRef.current.getScreenCTM().inverse())
    return { x: Math.max(5, Math.min(95, p.x / 3)), y: Math.max(5, Math.min(95, p.y / 4.2)) }
  }

  function handleDragEnd() {
    const id = drag.current
    if (id && overrides[id] && onUpdateCoords) {
      onUpdateCoords(id, overrides[id].x, overrides[id].y)
    }
    if (id) {
      setOverrides(p => { const n = { ...p }; delete n[id]; return n })
    }
    drag.current = null
  }

  const layout = useMemo(() => layoutTeam(team), [team])

  return (
    <div style={{ position: 'relative' }}>
      {isActive && team.length < 11 && (
        <div style={{
          position: 'absolute', top: 10, left: 10, zIndex: 1,
          background: 'rgba(0,0,0,0.45)', borderRadius: 999,
          padding: '4px 10px', fontSize: 11, color: 'rgba(255,255,255,0.85)',
          fontFamily: 'var(--font-mono)', pointerEvents: 'none',
        }}>
          {11 - team.length} joueur{11 - team.length > 1 ? 's' : ''} restant{11 - team.length > 1 ? 's' : ''}
        </div>
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 300 420"
        style={{ width: '100%', borderRadius: 8, display: 'block', touchAction: 'none' }}
        onMouseMove={e => drag.current && setOverrides(p => ({ ...p, [drag.current]: toPct(e) }))}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={e => { e.preventDefault(); drag.current && setOverrides(p => ({ ...p, [drag.current]: toPct(e) })) }}
        onTouchEnd={handleDragEnd}
      >
      <defs>
        <linearGradient id={`grass-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a472a" />
          <stop offset="100%" stopColor="#153d24" />
        </linearGradient>
      </defs>
      <rect width="300" height="420" fill={`url(#grass-${color})`} rx="8" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <rect key={i} x="0" y={i * 60} width="300" height="30" fill={i % 2 === 0 ? '#1a472a' : '#163820'} opacity="0.6" />
      ))}
      <rect x="20" y="15" width="260" height="390" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" rx="2" />
      <line x1="20" y1="210" x2="280" y2="210" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <circle cx="150" cy="210" r="35" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <circle cx="150" cy="210" r="2" fill="rgba(255,255,255,0.5)" />
      <rect x="75" y="15" width="150" height="55" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <rect x="110" y="15" width="80" height="25" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <rect x="75" y="350" width="150" height="55" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <rect x="110" y="380" width="80" height="25" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <circle cx="150" cy="57" r="2" fill="rgba(255,255,255,0.5)" />
      <circle cx="150" cy="363" r="2" fill="rgba(255,255,255,0.5)" />

      {team.map((entry, i) => {
        const base = (entry.pos_x != null && entry.pos_y != null)
          ? { x: entry.pos_x, y: entry.pos_y }
          : (layout[entry.id] || { x: 50, y: 50 })
        const o = overrides[entry.id]
        const cx = ((o?.x ?? base.x) / 100) * 300
        const cy = ((o?.y ?? base.y) / 100) * 420
        const name = entry.player_name.split(' ').pop()
        const isMe = entry.picked_by === myName
        return (
          <g
            key={i}
            style={{ cursor: isMe ? 'grab' : 'default' }}
            onMouseDown={isMe ? e => { e.stopPropagation(); drag.current = entry.id } : undefined}
            onTouchStart={isMe ? e => { e.stopPropagation(); drag.current = entry.id } : undefined}
          >
            <circle cx={cx} cy={cy} r="16" fill={color} opacity="0.9" />
            <circle cx={cx} cy={cy} r="16" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fontWeight="700" fill="white" fontFamily="system-ui">
              {entry.position}
            </text>
            <rect x={cx - 22} y={cy + 18} width="44" height="12" rx="3" fill="rgba(0,0,0,0.7)" />
            <text x={cx} y={cy + 25} textAnchor="middle" dominantBaseline="middle" fontSize="6.5" fill="white" fontFamily="system-ui" fontWeight="500">
              {name.length > 9 ? name.slice(0, 9) + '.' : name}
            </text>
          </g>
        )
      })}

      </svg>
    </div>
  )
}
