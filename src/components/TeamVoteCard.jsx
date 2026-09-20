import { useState } from 'react'
import Stars from './Stars.jsx'
import { VOTE_CRITERIA } from '../constants.js'

function emptyScores() {
  return { technique: 0, ambiance: 0, audace: 0, beau_jeu: 0 }
}

/**
 * Voting panel for one team, shown right next to its pitch once the draft is done.
 * Renders a progress note if it's your own team (you can't vote for yourself).
 */
export default function TeamVoteCard({ teamPlayer, color, myName, players, teamVotes, onVote }) {
  const [draft, setDraft] = useState(emptyScores())

  const isOwnTeam = teamPlayer === myName
  const votesReceived = teamVotes.filter(v => v.team_player === teamPlayer)
  const myVote = teamVotes.find(v => v.team_player === teamPlayer && v.voted_by === myName)
  const totalVoters = players.length - 1

  if (isOwnTeam) {
    return (
      <div style={{ marginTop: 14, padding: '10px 12px', background: '#f2f6f3', borderRadius: 10, fontSize: 12, color: 'var(--text-muted)' }}>
        En attente des votes de tes potes · {votesReceived.length}/{totalVoters}
      </div>
    )
  }

  if (myVote) {
    return (
      <div style={{ marginTop: 14, padding: '10px 12px', border: `1px solid ${color}33`, borderRadius: 10 }}>
        <p style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, marginBottom: 6 }}>✓ Tu as voté · {votesReceived.length}/{totalVoters}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {VOTE_CRITERIA.map(c => (
            <span key={c.key} style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.emoji} {myVote[c.key]}/5</span>
          ))}
        </div>
      </div>
    )
  }

  const ready = VOTE_CRITERIA.every(c => draft[c.key] > 0)

  return (
    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
      <p className="label-mono" style={{ marginBottom: 10 }}>Note ce onze</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
        {VOTE_CRITERIA.map(c => (
          <div key={c.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 12.5, color: 'var(--text)' }}>{c.emoji} {c.label}</span>
            <Stars value={draft[c.key]} onChange={v => setDraft(prev => ({ ...prev, [c.key]: v }))} size={17} />
          </div>
        ))}
      </div>
      <button
        className={ready ? 'primary' : ''}
        onClick={() => onVote(teamPlayer, myName, draft)}
        disabled={!ready}
        style={{ width: '100%', padding: '8px 14px', fontSize: 13 }}
      >
        Valider mon vote
      </button>
    </div>
  )
}
