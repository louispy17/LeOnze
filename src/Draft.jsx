import { useState, useMemo, useEffect } from 'react'
import { validatePlayer, PLAYERS } from './players.js'

const MAX_PER_TEAM = 11
const MAX_NAT = 2

// Positions sur le terrain (% x, % y) pour une formation 4-3-3 par défaut
// On place les joueurs selon leur poste
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

// Couleurs par joueur
const PLAYER_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444']

function getPosCoords(pos, existingInPos) {
  const base = POS_COORDS[pos] || { x: 50, y: 50 }
  const offset = existingInPos * 12
  return { x: base.x + (existingInPos % 2 === 0 ? 0 : offset - 6), y: base.y }
}

function FootballPitch({ team, color, isActive }) {
  const posCounts = {}
  return (
    <svg viewBox="0 0 300 420" style={{ width: '100%', borderRadius: 8, display: 'block' }}>
      {/* Fond pelouse */}
      <defs>
        <linearGradient id={`grass-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a472a" />
          <stop offset="100%" stopColor="#153d24" />
        </linearGradient>
        {/* Bandes de gazon */}
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x="0" y={i*60} width="300" height="30" fill={i%2===0 ? '#1a472a' : '#173d22'} />
        ))}
      </defs>
      <rect width="300" height="420" fill={`url(#grass-${color})`} rx="8" />
      {/* Bandes */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x="0" y={i*60} width="300" height="30" fill={i%2===0 ? '#1a472a' : '#163820'} opacity="0.6" />
      ))}
      {/* Lignes terrain */}
      <rect x="20" y="15" width="260" height="390" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" rx="2"/>
      {/* Ligne médiane */}
      <line x1="20" y1="210" x2="280" y2="210" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      {/* Cercle central */}
      <circle cx="150" cy="210" r="35" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      <circle cx="150" cy="210" r="2" fill="rgba(255,255,255,0.5)"/>
      {/* Surface de réparation haute */}
      <rect x="75" y="15" width="150" height="55" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      <rect x="110" y="15" width="80" height="25" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      {/* Surface de réparation basse */}
      <rect x="75" y="350" width="150" height="55" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      <rect x="110" y="380" width="80" height="25" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      {/* Points de penalty */}
      <circle cx="150" cy="57" r="2" fill="rgba(255,255,255,0.5)"/>
      <circle cx="150" cy="363" r="2" fill="rgba(255,255,255,0.5)"/>

      {/* Joueurs */}
      {team.map((entry, i) => {
        const pos = entry.position
        const count = posCounts[pos] || 0
        posCounts[pos] = count + 1
        const coords = getPosCoords(pos, count)
        const cx = (coords.x / 100) * 300
        const cy = (coords.y / 100) * 420
        const name = entry.player_name.split(' ').pop()
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="16" fill={color} opacity="0.9" />
            <circle cx={cx} cy={cy} r="16" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize="7" fontWeight="700" fill="white" fontFamily="system-ui">
              {entry.position}
            </text>
            {/* Nom sous le cercle */}
            <rect x={cx - 22} y={cy + 18} width="44" height="12" rx="3" fill="rgba(0,0,0,0.7)"/>
            <text x={cx} y={cy + 25} textAnchor="middle" dominantBaseline="middle"
              fontSize="6.5" fill="white" fontFamily="system-ui" fontWeight="500">
              {name.length > 9 ? name.slice(0, 9) + '.' : name}
            </text>
          </g>
        )
      })}

      {/* Slots vides si moins de 11 */}
      {isActive && team.length < 11 && (
        <text x="150" y="210" textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fill="rgba(255,255,255,0.2)" fontFamily="system-ui">
          {11 - team.length} joueur{11 - team.length > 1 ? 's' : ''} restant{11 - team.length > 1 ? 's' : ''}
        </text>
      )}
    </svg>
  )
}

function Stars({ value, onChange, disabled, size = 18 }) {
  const [hovered, setHovered] = useState(null)
  const display = hovered ?? value ?? 0
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {[1,2,3,4,5].map(n => (
        <span key={n}
          onMouseEnter={() => !disabled && setHovered(n)}
          onMouseLeave={() => !disabled && setHovered(null)}
          onClick={() => !disabled && onChange?.(n)}
          style={{ cursor: disabled ? 'default' : 'pointer', fontSize: size, lineHeight: 1, color: n <= display ? '#f59e0b' : '#374151', userSelect: 'none' }}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function Draft({ session, picks, onPick, onEnd, ratings = [], onRate }) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [myName, setMyName] = useState('')
  const [nameSet, setNameSet] = useState(false)
  const [copied, setCopied] = useState(false)
  const [viewTab, setViewTab] = useState(0)
  const [showPlayers, setShowPlayers] = useState(false)
  const [filterNat, setFilterNat] = useState('')
  const [filterPos, setFilterPos] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const [confettis, setConfettis] = useState([])

  const players = session.players

  const teamsByPlayer = useMemo(() => {
    const map = {}
    players.forEach(p => { map[p] = [] })
    picks.forEach(pick => {
      if (map[pick.picked_by]) map[pick.picked_by].push(pick)
    })
    return map
  }, [picks, players])

  const allDone = players.every(p => (teamsByPlayer[p] || []).length >= MAX_PER_TEAM)
  const totalPicks = picks.length

  useEffect(() => {
    if (allDone) setViewTab('results')
  }, [allDone])

  const globalNatCount = useMemo(() => {
    const count = {}
    picks.forEach(p => { count[p.nationality] = (count[p.nationality] || 0) + 1 })
    return count
  }, [picks])

  const teamScores = useMemo(() => {
    const scores = {}
    players.forEach(p => {
      const teamPicks = teamsByPlayer[p] || []
      scores[p] = ratings
        .filter(r => teamPicks.some(pick => pick.id === r.pick_id))
        .reduce((s, r) => s + r.rating, 0)
    })
    return scores
  }, [players, teamsByPlayer, ratings])

  function currentTurnPlayer() {
    const n = players.length
    const round = Math.floor(totalPicks / n)
    const pos = totalPicks % n
    const idx = round % 2 === 0 ? pos : n - 1 - pos
    return players[idx]
  }

  const currentPlayer = allDone ? null : currentTurnPlayer()
  const isMyTurn = nameSet && currentPlayer === myName
  const usedPlayers = picks.map(p => p.player_name.toLowerCase())

  // Joueurs disponibles
  const allNats = useMemo(() => [...new Set(PLAYERS.map(p => p.nationality))].sort(), [])
  const allPos = ['GB','DC','DD','DG','MDC','MC','MO','AD','AG','ATT']
  const availablePlayers = useMemo(() => {
    return PLAYERS.filter(p => {
      const taken = usedPlayers.includes(p.name.toLowerCase())
      const matchSearch = !filterSearch || p.name.toLowerCase().includes(filterSearch.toLowerCase())
      const matchNat = !filterNat || p.nationality === filterNat
      const matchPos = !filterPos || p.position === filterPos
      return !taken && matchSearch && matchNat && matchPos
    })
  }, [usedPlayers, filterSearch, filterNat, filterPos])

  async function handleSubmit() {
    if (!input.trim() || !isMyTurn || loading) return
    setLoading(true)
    setStatus({ type: 'loading', msg: 'Validation...' })
    const myTeam = teamsByPlayer[myName] || []
    try {
      const result = validatePlayer({
        playerName: input.trim(),
        team: myTeam.map(p => ({ name: p.player_name, nationality: p.nationality, position: p.position })),
        usedPlayers,
        allPicks: picks
      })
      if (!result.valid) {
        setStatus({ type: 'err', msg: '❌ ' + (result.reason || 'Joueur invalide') })
      } else {
        await onPick({
          player_name: result.name,
          picked_by: myName,
          nationality: result.nationality,
          position: result.position,
          turn_index: totalPicks
        })
        setStatus({ type: 'ok', msg: `✅ ${result.name} (${result.position}, ${result.nationality})` })
        launchConfetti(myColor)
        setInput('')
        if (myTeam.length + 1 >= MAX_PER_TEAM) {
          const allNowDone = players.every(p => p === myName
            ? myTeam.length + 1 >= MAX_PER_TEAM
            : (teamsByPlayer[p] || []).length >= MAX_PER_TEAM)
          if (allNowDone) onEnd()
        }
      }
    } catch {
      setStatus({ type: 'err', msg: '❌ Erreur inattendue, réessaie.' })
    }
    setLoading(false)
  }

  const myIndex = players.indexOf(myName)
  const myColor = PLAYER_COLORS[myIndex] || '#f59e0b'
  const myTeam = teamsByPlayer[myName] || []

  function launchConfetti(color) {
    const items = Array.from({ length: 32 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: [color, '#fff', '#ffd700', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 5)],
      size: 6 + Math.random() * 8,
      delay: Math.random() * 0.4,
      rotate: Math.random() * 360,
    }))
    setConfettis(items)
    setTimeout(() => setConfettis([]), 1800)
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Écran de sélection du joueur
  if (!nameSet) {
    return (
      <div style={{ minHeight: '100vh', background: '#080c10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>⚽</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', margin: 0 }}>LeOnze</h1>
            <p style={{ color: '#4a5568', fontSize: 14, marginTop: 6 }}>Draft CDM 2026 · Qui es-tu ?</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {players.map((p, i) => (
              <button key={p} onClick={() => { setMyName(p); setNameSet(true) }}
                style={{
                  background: 'linear-gradient(135deg, #111827, #1a2332)',
                  border: `1px solid ${PLAYER_COLORS[i]}44`,
                  borderRadius: 12, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left'
                }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: PLAYER_COLORS[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#000', flexShrink: 0 }}>
                  {p[0].toUpperCase()}
                </div>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{p}</span>
                <span style={{ marginLeft: 'auto', color: '#4a5568', fontSize: 12 }}>{(teamsByPlayer[p] || []).length}/11</span>
              </button>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 11, color: '#2d3748', marginTop: '1.5rem' }}>
            Partage le lien pour inviter tes potes
          </p>
          <div style={{ marginTop: '2rem', background: '#0d1117', border: '1px solid #1a2332', borderRadius: 12, padding: '16px 18px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>📋 Règles du jeu</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['🔄', 'Draft en serpentin', 'J1→J2→J3→J4→J4→J3→J2→J1...'],
                ['👤', '1 pick par tour', 'Chacun choisit un joueur à la fois'],
                ['🌍', 'Max 2 par nationalité', 'Tu ne peux pas avoir 3 joueurs du même pays'],
                ['🚫', 'Joueur bloqué', 'Un joueur pris est indisponible pour tous'],
                ['⚽', 'CDM 2026 uniquement', 'Seuls les 1249 joueurs qualifiés sont valides'],
                ['🏆', 'Objectif', 'Construire le meilleur XI possible — 11 joueurs'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af' }}>{title} — </span>
                    <span style={{ fontSize: 12, color: '#4a5568' }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080c10', color: '#fff', fontFamily: 'system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Confettis */}
      {confettis.map(c => (
        <div key={c.id} style={{
          position: 'fixed', top: '-10px', left: `${c.x}%`,
          width: c.size, height: c.size,
          background: c.color,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          transform: `rotate(${c.rotate}deg)`,
          animation: `confettiFall 1.6s ease-in ${c.delay}s forwards`,
          zIndex: 999, pointerEvents: 'none',
        }} />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {/* Header */}
      <div style={{ background: '#0d1117', borderBottom: '1px solid #1a2332', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>⚽</span>
          <div>
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.3px' }}>LeOnze</span>
            <span style={{ color: '#4a5568', fontSize: 12, marginLeft: 8 }}>CDM 2026</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: myColor }} />
          <span style={{ fontSize: 13, color: '#9ca3af' }}>{myName}</span>
          <button onClick={copyLink} style={{ background: 'none', border: '1px solid #1e2d3d', borderRadius: 6, padding: '4px 10px', color: '#6b7280', fontSize: 11, cursor: 'pointer' }}>
            {copied ? '✓ Copié' : '🔗 Partager'}
          </button>
        </div>
      </div>

      {/* Bannière tour */}
      <div style={{
        margin: '12px 16px',
        padding: '12px 16px',
        borderRadius: 10,
        background: isMyTurn ? `linear-gradient(135deg, ${myColor}22, ${myColor}11)` : '#0d1117',
        border: `1px solid ${isMyTurn ? myColor + '44' : '#1a2332'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: isMyTurn ? myColor : '#9ca3af' }}>
            {allDone ? '🏆 Draft terminé !' : isMyTurn ? '🎯 C\'est ton tour !' : `⏳ Tour de ${currentPlayer}`}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#4a5568' }}>
            {picks.length} picks au total · {players.map(p => `${p} ${(teamsByPlayer[p]||[]).length}/11`).join(' · ')}
          </p>
        </div>
        <button onClick={() => setShowPlayers(true)}
          style={{ background: '#1a2332', border: '1px solid #2d3748', borderRadius: 8, padding: '6px 12px', color: '#9ca3af', fontSize: 12, cursor: 'pointer' }}>
          📋 Joueurs dispo
        </button>
      </div>

      {/* Modale joueurs disponibles */}
      {showPlayers && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          onClick={() => setShowPlayers(false)}>
          <div style={{ background: '#0d1117', border: '1px solid #1a2332', borderRadius: '16px 16px 0 0', width: '100%', maxWidth: 600, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: '16px', borderBottom: '1px solid #1a2332', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Joueurs disponibles · {availablePlayers.length}</span>
              <button onClick={() => setShowPlayers(false)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 18, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', gap: 8, borderBottom: '1px solid #1a2332', flexWrap: 'wrap' }}>
              <input placeholder="Rechercher..." value={filterSearch} onChange={e => setFilterSearch(e.target.value)}
                style={{ flex: 1, minWidth: 120, background: '#111827', border: '1px solid #1a2332', borderRadius: 8, padding: '7px 12px', color: '#fff', fontSize: 13, outline: 'none' }} />
              <select value={filterNat} onChange={e => setFilterNat(e.target.value)}
                style={{ background: '#111827', border: '1px solid #1a2332', borderRadius: 8, padding: '7px 10px', color: filterNat ? '#fff' : '#6b7280', fontSize: 12, outline: 'none' }}>
                <option value="">Toutes nations</option>
                {allNats.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <select value={filterPos} onChange={e => setFilterPos(e.target.value)}
                style={{ background: '#111827', border: '1px solid #1a2332', borderRadius: 8, padding: '7px 10px', color: filterPos ? '#fff' : '#6b7280', fontSize: 12, outline: 'none' }}>
                <option value="">Tous postes</option>
                {allPos.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ overflowY: 'auto', padding: '8px 16px 24px' }}>
              {availablePlayers.slice(0, 200).map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #0f1923',
                  cursor: isMyTurn ? 'pointer' : 'default' }}
                  onClick={() => { if (isMyTurn) { setInput(p.name); setShowPlayers(false) } }}>
                  <span style={{ fontSize: 10, background: '#1a2332', border: '1px solid #2d3748', borderRadius: 4, padding: '2px 6px', color: '#6b7280', minWidth: 32, textAlign: 'center', fontWeight: 600 }}>{p.position}</span>
                  <span style={{ flex: 1, fontSize: 13, color: '#e2e8f0' }}>{p.name}</span>
                  <span style={{ fontSize: 11, color: (globalNatCount[p.nationality] || 0) >= MAX_NAT ? '#f59e0b' : '#4a5568' }}>{p.nationality}</span>
                  {isMyTurn && <span style={{ fontSize: 10, color: myColor, opacity: 0.7 }}>↑ choisir</span>}
                </div>
              ))}
              {availablePlayers.length > 200 && <p style={{ fontSize: 12, color: '#4a5568', textAlign: 'center', paddingTop: 12 }}>Filtre pour affiner ({availablePlayers.length - 200} de plus)</p>}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      {isMyTurn && !allDone && (
        <div style={{ margin: '0 16px 12px', display: 'flex', gap: 8 }}>
          <input
            placeholder="Ex: Mbappé, Bellingham, Vinicius..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            disabled={loading}
            style={{
              flex: 1, background: '#0d1117', border: `1px solid ${myColor}44`,
              borderRadius: 10, padding: '12px 16px', color: '#fff',
              fontSize: 14, outline: 'none'
            }}
          />
          <button onClick={handleSubmit} disabled={loading || !input.trim()}
            style={{
              background: myColor, border: 'none', borderRadius: 10,
              padding: '12px 20px', color: '#000', fontWeight: 700,
              fontSize: 14, cursor: 'pointer', opacity: loading || !input.trim() ? 0.5 : 1
            }}>
            {loading ? '...' : '✓'}
          </button>
        </div>
      )}

      {/* Status */}
      {status && (
        <div style={{
          margin: '0 16px 12px', padding: '10px 14px', borderRadius: 8, fontSize: 13,
          background: status.type === 'ok' ? '#0f2918' : status.type === 'err' ? '#1f0f0f' : '#0d1117',
          border: `1px solid ${status.type === 'ok' ? '#1a4a2a' : status.type === 'err' ? '#4a1a1a' : '#1a2332'}`,
          color: status.type === 'ok' ? '#4ade80' : status.type === 'err' ? '#f87171' : '#6b7280'
        }}>
          {status.msg}
        </div>
      )}

      {/* Onglets équipes */}
      <div style={{ margin: '0 16px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {players.map((p, i) => (
          <button key={p} onClick={() => setViewTab(i)}
            style={{
              background: viewTab === i ? PLAYER_COLORS[i] : '#0d1117',
              border: `1px solid ${viewTab === i ? PLAYER_COLORS[i] : '#1a2332'}`,
              borderRadius: 8, padding: '6px 14px', color: viewTab === i ? '#000' : '#9ca3af',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
            }}>
            {p} {p === myName ? '(toi)' : ''} · {(teamsByPlayer[p] || []).length}/11
          </button>
        ))}
        {allDone && (
          <button onClick={() => setViewTab('results')}
            style={{
              background: viewTab === 'results' ? '#ffd700' : '#0d1117',
              border: `1px solid ${viewTab === 'results' ? '#ffd700' : '#1a2332'}`,
              borderRadius: 8, padding: '6px 14px', color: viewTab === 'results' ? '#000' : '#9ca3af',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
            }}>
            🏆 Résultats
          </button>
        )}
      </div>

      {/* Vue résultats & notation */}
      {viewTab === 'results' && (() => {
        const sortedByScore = [...players].sort((a, b) => (teamScores[b] || 0) - (teamScores[a] || 0))
        const maxPossible = 5 * MAX_PER_TEAM * (players.length - 1)
        const medals = ['🥇', '🥈', '🥉', '4️⃣']
        return (
          <div style={{ padding: '0 16px 32px' }}>
            {/* Leaderboard */}
            <div style={{ background: '#0d1117', border: '1px solid #1a2332', borderRadius: 10, padding: '16px', marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: '#4a5568', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>Classement</p>
              {sortedByScore.map((p, rank) => {
                const score = teamScores[p] || 0
                const idx = players.indexOf(p)
                const color = PLAYER_COLORS[idx]
                const pct = maxPossible > 0 ? Math.min((score / maxPossible) * 100, 100) : 0
                return (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: rank < sortedByScore.length - 1 ? 10 : 0 }}>
                    <span style={{ fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 }}>{medals[rank]}</span>
                    <span style={{ color, fontWeight: 700, fontSize: 14, minWidth: 70 }}>{p}{p === myName ? ' (toi)' : ''}</span>
                    <div style={{ flex: 1, background: '#1a2332', borderRadius: 4, height: 6 }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                    </div>
                    <span style={{ fontSize: 13, color: '#9ca3af', minWidth: 48, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                      {score > 0 ? `⭐ ${score}` : '—'}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Équipes des autres — notation interactive */}
            {players.filter(p => p !== myName).map(p => {
              const pIdx = players.indexOf(p)
              const color = PLAYER_COLORS[pIdx]
              const team = teamsByPlayer[p] || []
              const rated = ratings.filter(r => team.some(pick => pick.id === r.pick_id) && r.rated_by === myName).length
              return (
                <div key={p} style={{ background: '#0d1117', border: `1px solid ${color}33`, borderRadius: 10, marginBottom: 12 }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a2332', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, fontSize: 14 }}>Équipe de {p}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: rated === team.length ? '#4ade80' : '#4a5568' }}>
                      {rated}/{team.length} notés
                    </span>
                  </div>
                  {team.map(pick => {
                    const myRating = ratings.find(r => r.pick_id === pick.id && r.rated_by === myName)
                    const allPickRatings = ratings.filter(r => r.pick_id === pick.id)
                    const avg = allPickRatings.length > 0
                      ? allPickRatings.reduce((s, r) => s + r.rating, 0) / allPickRatings.length
                      : null
                    return (
                      <div key={pick.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderBottom: '1px solid #0f1923' }}>
                        <span style={{ fontSize: 10, background: '#1a2332', border: '1px solid #2d3748', borderRadius: 4, padding: '2px 5px', color: '#6b7280', minWidth: 30, textAlign: 'center', fontWeight: 600, flexShrink: 0 }}>
                          {pick.position}
                        </span>
                        <span style={{ flex: 1, fontSize: 13, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {pick.player_name}
                        </span>
                        <Stars value={myRating?.rating} onChange={v => onRate(pick.id, myName, v)} size={17} />
                        <span style={{ fontSize: 10, color: avg !== null ? '#6b7280' : '#2d3748', minWidth: 26, textAlign: 'right', flexShrink: 0 }}>
                          {avg !== null ? avg.toFixed(1) : ''}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {/* Mon équipe — notes reçues */}
            <div style={{ background: '#0d1117', border: `1px solid ${myColor}33`, borderRadius: 10 }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a2332', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: myColor, flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: 14 }}>Mon équipe</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4a5568' }}>Notes reçues</span>
              </div>
              {myTeam.map(pick => {
                const allPickRatings = ratings.filter(r => r.pick_id === pick.id)
                const avg = allPickRatings.length > 0
                  ? allPickRatings.reduce((s, r) => s + r.rating, 0) / allPickRatings.length
                  : null
                return (
                  <div key={pick.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderBottom: '1px solid #0f1923' }}>
                    <span style={{ fontSize: 10, background: '#1a2332', border: '1px solid #2d3748', borderRadius: 4, padding: '2px 5px', color: '#6b7280', minWidth: 30, textAlign: 'center', fontWeight: 600, flexShrink: 0 }}>
                      {pick.position}
                    </span>
                    <span style={{ flex: 1, fontSize: 13, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {pick.player_name}
                    </span>
                    <Stars value={avg !== null ? Math.round(avg) : 0} disabled size={17} />
                    <span style={{ fontSize: 10, color: avg !== null ? '#9ca3af' : '#2d3748', minWidth: 26, textAlign: 'right', flexShrink: 0 }}>
                      {avg !== null ? avg.toFixed(1) : '—'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {/* Terrain + liste */}
      {viewTab !== 'results' && <div style={{ padding: '0 16px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
        {/* Terrain de foot */}
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #1a2332' }}>
          <FootballPitch
            team={teamsByPlayer[players[viewTab]] || []}
            color={PLAYER_COLORS[viewTab]}
            isActive={players[viewTab] === myName}
          />
        </div>

        {/* Liste joueurs */}
        <div>
          <p style={{ fontSize: 11, color: '#4a5568', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Équipe de {players[viewTab]}
          </p>
          {(teamsByPlayer[players[viewTab]] || []).length === 0 && (
            <p style={{ fontSize: 13, color: '#2d3748', fontStyle: 'italic' }}>Aucun joueur encore</p>
          )}
          {(teamsByPlayer[players[viewTab]] || []).map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #0f1923' }}>
              <span style={{ fontSize: 10, background: '#1a2332', border: '1px solid #2d3748', borderRadius: 4, padding: '2px 5px', color: '#6b7280', minWidth: 30, textAlign: 'center', fontWeight: 600 }}>
                {entry.position}
              </span>
              <span style={{ flex: 1, fontSize: 13, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {entry.player_name}
              </span>
              <span style={{ fontSize: 10, color: (globalNatCount[entry.nationality] || 0) >= MAX_NAT ? '#f59e0b' : '#4a5568' }}>
                {entry.nationality}
              </span>
            </div>
          ))}
        </div>
      </div>}
    </div>
  )
}
