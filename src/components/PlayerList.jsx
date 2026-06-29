import { PLAYERS } from '../players.js'

const ALL_POSITIONS = ['GB', 'DC', 'DD', 'DG', 'MDC', 'MC', 'MO', 'AD', 'AG', 'ATT']

export default function PlayerList({
  show,
  onClose,
  usedPlayers,
  filterSearch,
  setFilterSearch,
  filterNat,
  setFilterNat,
  filterPos,
  setFilterPos,
  globalNatCount,
  maxNat,
  isMyTurn,
  myColor,
  onSelect,
  allNats
}) {
  if (!show) return null

  const availablePlayers = PLAYERS.filter(p => {
    const taken = usedPlayers.includes(p.name.toLowerCase())
    const matchSearch = !filterSearch || p.name.toLowerCase().includes(filterSearch.toLowerCase())
    const matchNat = !filterNat || p.nationality === filterNat
    const matchPos = !filterPos || p.position === filterPos
    return !taken && matchSearch && matchNat && matchPos
  })

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#0d1117', border: '1px solid #1a2332', borderRadius: '16px 16px 0 0', width: '100%', maxWidth: 600, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '16px', borderBottom: '1px solid #1a2332', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Joueurs disponibles · {availablePlayers.length}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', gap: 8, borderBottom: '1px solid #1a2332', flexWrap: 'wrap' }}>
          <input
            placeholder="Rechercher..."
            value={filterSearch}
            onChange={e => setFilterSearch(e.target.value)}
            style={{ flex: 1, minWidth: 120, background: '#111827', border: '1px solid #1a2332', borderRadius: 8, padding: '7px 12px', color: '#fff', fontSize: 13, outline: 'none' }}
          />
          <select
            value={filterNat}
            onChange={e => setFilterNat(e.target.value)}
            style={{ background: '#111827', border: '1px solid #1a2332', borderRadius: 8, padding: '7px 10px', color: filterNat ? '#fff' : '#6b7280', fontSize: 12, outline: 'none' }}
          >
            <option value="">Toutes nations</option>
            {allNats.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <select
            value={filterPos}
            onChange={e => setFilterPos(e.target.value)}
            style={{ background: '#111827', border: '1px solid #1a2332', borderRadius: 8, padding: '7px 10px', color: filterPos ? '#fff' : '#6b7280', fontSize: 12, outline: 'none' }}
          >
            <option value="">Tous postes</option>
            {ALL_POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div style={{ overflowY: 'auto', padding: '8px 16px 24px' }}>
          {availablePlayers.slice(0, 200).map((p, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #0f1923', cursor: isMyTurn ? 'pointer' : 'default' }}
              onClick={() => { if (isMyTurn) onSelect(p.name) }}
            >
              <span style={{ fontSize: 10, background: '#1a2332', border: '1px solid #2d3748', borderRadius: 4, padding: '2px 6px', color: '#6b7280', minWidth: 32, textAlign: 'center', fontWeight: 600 }}>{p.position}</span>
              <span style={{ flex: 1, fontSize: 13, color: '#e2e8f0' }}>{p.name}</span>
              <span style={{ fontSize: 11, color: (globalNatCount[p.nationality] || 0) >= maxNat ? '#f59e0b' : '#4a5568' }}>{p.nationality}</span>
              {isMyTurn && <span style={{ fontSize: 10, color: myColor, opacity: 0.7 }}>↑ choisir</span>}
            </div>
          ))}
          {availablePlayers.length > 200 && (
            <p style={{ fontSize: 12, color: '#4a5568', textAlign: 'center', paddingTop: 12 }}>
              Filtre pour affiner ({availablePlayers.length - 200} de plus)
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
