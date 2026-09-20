import Stars from './Stars.jsx'
import { PLAYER_COLORS, MAX_PER_TEAM } from '../constants.js'

export default function ResultsView({ players, teamsByPlayer, teamScores, ratings, myName, myTeam, onRate }) {
  const sortedByScore = [...players].sort((a, b) => (teamScores[b] || 0) - (teamScores[a] || 0))
  const maxPossible = 5 * MAX_PER_TEAM * (players.length - 1)
  const medals = ['🥇', '🥈', '🥉', '4️⃣']
  const myColor = PLAYER_COLORS[players.indexOf(myName)] || '#f59e0b'

  return (
    <div style={{ padding: '0 16px 32px' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px', marginBottom: 16, boxShadow: 'var(--shadow)' }}>
        <p className="label-mono" style={{ marginBottom: 14 }}>Classement</p>
        {sortedByScore.map((p, rank) => {
          const score = teamScores[p] || 0
          const idx = players.indexOf(p)
          const color = PLAYER_COLORS[idx]
          const pct = maxPossible > 0 ? Math.min((score / maxPossible) * 100, 100) : 0
          return (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: rank < sortedByScore.length - 1 ? 10 : 0 }}>
              <span style={{ fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 }}>{medals[rank]}</span>
              <span style={{ color, fontWeight: 700, fontSize: 14, minWidth: 70 }}>{p}{p === myName ? ' (toi)' : ''}</span>
              <div style={{ flex: 1, background: '#eef2ee', borderRadius: 4, height: 6 }}>
                <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.5s ease' }} />
              </div>
              <span style={{ fontSize: 13, color: 'var(--text)', minWidth: 48, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                {score > 0 ? `⭐ ${score}` : '-'}
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
          <div key={p} style={{ background: 'var(--surface)', border: `1px solid ${color}44`, borderRadius: 14, marginBottom: 12, boxShadow: 'var(--shadow)' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>Équipe de {p}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: rated === team.length ? 'var(--accent)' : 'var(--text-muted)' }}>
                {rated}/{team.length} notés
              </span>
            </div>
            {team.map(pick => {
              const myRating = ratings.find(r => r.pick_id === pick.id && r.rated_by === myName)
              const allPickRatings = ratings.filter(r => r.pick_id === pick.id)
              const avg = allPickRatings.length > 0 ? allPickRatings.reduce((s, r) => s + r.rating, 0) / allPickRatings.length : null
              return (
                <div key={pick.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, background: '#f2f6f3', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 5px', color: 'var(--text-muted)', minWidth: 30, textAlign: 'center', fontWeight: 600, flexShrink: 0 }}>
                    {pick.position}
                  </span>
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {pick.player_name}
                  </span>
                  <Stars value={myRating?.rating} onChange={v => onRate(pick.id, myName, v)} size={17} />
                  <span style={{ fontSize: 10, color: avg !== null ? 'var(--text-muted)' : 'transparent', minWidth: 26, textAlign: 'right', flexShrink: 0 }}>
                    {avg !== null ? avg.toFixed(1) : ''}
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}

      <div style={{ background: 'var(--surface)', border: `1px solid ${myColor}44`, borderRadius: 14, boxShadow: 'var(--shadow)' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: myColor, flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>Mon équipe</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>Notes reçues</span>
        </div>
        {myTeam.map(pick => {
          const allPickRatings = ratings.filter(r => r.pick_id === pick.id)
          const avg = allPickRatings.length > 0 ? allPickRatings.reduce((s, r) => s + r.rating, 0) / allPickRatings.length : null
          return (
            <div key={pick.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 10, background: '#f2f6f3', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 5px', color: 'var(--text-muted)', minWidth: 30, textAlign: 'center', fontWeight: 600, flexShrink: 0 }}>
                {pick.position}
              </span>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {pick.player_name}
              </span>
              <Stars value={avg !== null ? Math.round(avg) : 0} disabled size={17} />
              <span style={{ fontSize: 10, color: avg !== null ? 'var(--text)' : 'transparent', minWidth: 26, textAlign: 'right', flexShrink: 0 }}>
                {avg !== null ? avg.toFixed(1) : '-'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
