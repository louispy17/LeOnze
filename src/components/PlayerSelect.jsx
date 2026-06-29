import { PLAYER_COLORS } from '../constants.js'
import CoachAvatar from './CoachAvatar.jsx'
import { getCoach } from '../data/coaches.js'

/**
 * "Who are you?" screen shown before draft starts.
 * Each player picks their identity to join the draft.
 */
export default function PlayerSelect({ players, teamsByPlayer, coaches, onSelect }) {
  return (
    <div style={{ minHeight: '100vh', background: '#080c10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚽</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', margin: 0 }}>LeOnze</h1>
          <p style={{ color: '#4a5568', fontSize: 14, marginTop: 6 }}>Draft CDM 2026 · Qui es-tu ?</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {players.map((p, i) => {
            const coachId = coaches?.[p]
            const coach = coachId ? getCoach(coachId) : null
            return (
              <button key={p} onClick={() => onSelect(p)}
                style={{
                  background: 'linear-gradient(135deg, #111827, #1a2332)',
                  border: `1px solid ${PLAYER_COLORS[i]}44`,
                  borderRadius: 12, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left'
                }}>
                {coachId ? (
                  <CoachAvatar coachId={coachId} size={36} />
                ) : (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: PLAYER_COLORS[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#000', flexShrink: 0 }}>
                    {p[0].toUpperCase()}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#fff', fontSize: 16, fontWeight: 600, display: 'block' }}>{p}</span>
                  {coach && <span style={{ color: '#4a5568', fontSize: 11 }}>Coach: {coach.name}</span>}
                </div>
                <span style={{ color: '#4a5568', fontSize: 12 }}>{(teamsByPlayer[p] || []).length}/11</span>
              </button>
            )
          })}
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
