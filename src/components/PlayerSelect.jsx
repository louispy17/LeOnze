import { useState } from 'react'
import { PLAYER_COLORS } from '../constants.js'
import CoachAvatar from './CoachAvatar.jsx'
import { getCoach } from '../data/coaches.js'
import Onboarding from './Onboarding.jsx'

/**
 * "Who are you?" screen shown before draft starts.
 * Each player picks their identity to join the draft.
 */
export default function PlayerSelect({ players, teamsByPlayer, coaches, onSelect }) {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚽</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--ink)', margin: 0 }}>LeOnze</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8 }}>Draft CDM 2026 · Qui es-tu ?</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {players.map((p, i) => {
            const coachId = coaches?.[p]
            const coach = coachId ? getCoach(coachId) : null
            return (
              <button key={p} onClick={() => onSelect(p)}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${PLAYER_COLORS[i]}55`,
                  borderRadius: 14, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  transition: 'all 0.15s', textAlign: 'left',
                  boxShadow: 'var(--shadow)',
                }}>
                {coachId ? (
                  <CoachAvatar coachId={coachId} size={36} />
                ) : (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: PLAYER_COLORS[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: 'var(--ink)', flexShrink: 0 }}>
                    {p[0].toUpperCase()}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <span style={{ color: 'var(--ink)', fontSize: 16, fontWeight: 600, display: 'block' }}>{p}</span>
                  {coach && <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>Coach: {coach.name}</span>}
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{(teamsByPlayer[p] || []).length}/11</span>
              </button>
            )
          })}
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: '1.5rem' }}>
          Partage le lien pour inviter tes potes
        </p>
        <button
          onClick={() => setShowOnboarding(true)}
          style={{ display: 'block', margin: '1.25rem auto 0', borderRadius: 999, padding: '9px 16px', fontSize: 13, color: 'var(--ink-soft)' }}
        >
          Comment ça marche ? 👀
        </button>
        <Onboarding open={showOnboarding} onClose={() => setShowOnboarding(false)} />
      </div>
    </div>
  )
}
