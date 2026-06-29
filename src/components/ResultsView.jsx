import Stars from './Stars.jsx'

const PLAYER_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444']
const MAX_PER_TEAM = 11

export default function ResultsView({ players, teamsByPlayer, teamScores, ratings, myName, myTeam, onRate }) {
  const sortedByScore = [...players].sort((a, b) => (teamScores[b] || 0) - (teamScores[a] || 0))
  const maxPossible = 5 * MAX_PER_TEAM * (players.length - 1)
  const medals = ['🥇', '🥈', '🥉', '4️⃣']
  const myColor = PLAYER_COLORS[players.indexOf(myName)] || '#f59e0b'

  return (
    <div style={{ padding: '0 16px 32px' }}>
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
              const avg = allPickRatings.length > 0 ? allPickRatings.reduce((s, r) => s + r.rating, 0) / allPickRatings.length : null
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

      <div style={{ background: '#0d1117', border: `1px solid ${myColor}33`, borderRadius: 10 }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a2332', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: myColor, flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>Mon équipe</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4a5568' }}>Notes reçues</span>
        </div>
        {myTeam.map(pick => {
          const allPickRatings = ratings.filter(r => r.pick_id === pick.id)
          const avg = allPickRatings.length > 0 ? allPickRatings.reduce((s, r) => s + r.rating, 0) / allPickRatings.length : null
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
}
