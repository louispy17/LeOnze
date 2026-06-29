import { useState, useRef } from 'react'

const POS_COORDS = {
  GB:  { x: 50, y: 88 },
  DC:  { x: 50, y: 72 },
  DD:  { x: 78, y: 72 },
  DG:  { x: 22, y: 72 },
  MDC: { x: 50, y: 55 },
  MC:  { x: 35, y: 48 },
  MO:  { x: 65, y: 42 },
  AD:  { x: 78, y: 28 },
  AG:  { x: 22, y: 28 },
  ATT: { x: 50, y: 18 },
}

function getPosCoords(pos, idx, total) {
  const base = POS_COORDS[pos] || { x: 50, y: 50 }
  if (total === 1) return base
  const step = total === 2 ? 24 : 16
  const offset = (idx - (total - 1) / 2) * step
  return { x: Math.max(6, Math.min(94, base.x + offset)), y: base.y }
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

  const posTotals = {}
  team.forEach(entry => { posTotals[entry.position] = (posTotals[entry.position] || 0) + 1 })
  const posIdx = {}

  return (
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
        const pos = entry.position
        const idx = posIdx[pos] || 0
        posIdx[pos] = idx + 1
        const base = (entry.pos_x != null && entry.pos_y != null)
          ? { x: entry.pos_x, y: entry.pos_y }
          : getPosCoords(pos, idx, posTotals[pos])
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

      {isActive && team.length < 11 && (
        <text x="150" y="210" textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="rgba(255,255,255,0.2)" fontFamily="system-ui">
          {11 - team.length} joueur{11 - team.length > 1 ? 's' : ''} restant{11 - team.length > 1 ? 's' : ''}
        </text>
      )}
    </svg>
  )
}
