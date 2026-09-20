import FootballPitch from './FootballPitch.jsx'
import { VOTE_CRITERIA } from '../constants.js'

export default function WinnerReveal({ winner, ranking, teamsByPlayer, myName }) {
  return (
    <div style={{ padding: '0 16px 32px' }}>
      <div style={{
        textAlign: 'center', padding: '28px 20px 8px',
      }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🏆</div>
        <p className="label-mono" style={{ marginBottom: 6 }}>Vainqueur du soir</p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 44, color: winner.color, lineHeight: 1 }}>
          {winner.name}{winner.name === myName ? ' (toi)' : ''}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 22, flexWrap: 'wrap', marginTop: 18 }}>
          {VOTE_CRITERIA.map(c => (
            <div key={c.key} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22 }}>{c.emoji}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>{winner.avg[c.key].toFixed(1)}</div>
              <div className="label-mono" style={{ fontSize: 9 }}>{c.label.split(' ')[0]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', border: `2px solid ${winner.color}`, margin: '20px 0' }}>
        <FootballPitch
          team={teamsByPlayer[winner.name] || []}
          color={winner.color}
          isActive={false}
          myName={myName}
        />
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px', boxShadow: 'var(--shadow)' }}>
        <p className="label-mono" style={{ marginBottom: 14 }}>Classement final</p>
        {ranking.map((t, i) => (
          <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < ranking.length - 1 ? 10 : 0 }}>
            <span style={{ fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 }}>{['🥇', '🥈', '🥉', '4️⃣'][i]}</span>
            <span style={{ color: t.color, fontWeight: 700, fontSize: 14, minWidth: 90 }}>{t.name}{t.name === myName ? ' (toi)' : ''}</span>
            <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>{t.total} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}
