import { useState, useMemo } from 'react'

const MAX_PER_TEAM = 11
const MAX_NAT = 2

export default function Draft({ session, picks, onPick, onEnd }) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [myName, setMyName] = useState('')
  const [nameSet, setNameSet] = useState(false)
  const [copied, setCopied] = useState(false)

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

  function currentTurnPlayer() {
    let idx = 0
    let pickCount = 0
    while (pickCount < totalPicks) {
      const p = players[idx % players.length]
      if ((teamsByPlayer[p] || []).length < MAX_PER_TEAM) pickCount++
      if (pickCount < totalPicks) idx++
    }
    while ((teamsByPlayer[players[idx % players.length]] || []).length >= MAX_PER_TEAM) idx++
    return players[idx % players.length]
  }

  const currentPlayer = allDone ? null : currentTurnPlayer()
  const isMyTurn = nameSet && currentPlayer === myName

  const usedPlayers = picks.map(p => p.player_name.toLowerCase())

  async function handleSubmit() {
    if (!input.trim() || !isMyTurn || loading) return
    setLoading(true)
    setStatus({ type: 'loading', msg: 'Validation en cours...' })

    const myTeam = teamsByPlayer[myName] || []
    try {
      const resp = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: input.trim(),
          team: myTeam.map(p => ({ name: p.player_name, nationality: p.nationality, position: p.position })),
          usedPlayers,
          pickedBy: myName
        })
      })
      const result = await resp.json()

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
        setStatus({ type: 'ok', msg: `✅ ${result.name} (${result.position}, ${result.nationality}) ajouté !` })
        setInput('')
        if (myTeam.length + 1 >= MAX_PER_TEAM) {
          const allNowDone = players.every(p => p === myName ? myTeam.length + 1 >= MAX_PER_TEAM : (teamsByPlayer[p] || []).length >= MAX_PER_TEAM)
          if (allNowDone) onEnd()
        }
      }
    } catch {
      setStatus({ type: 'err', msg: 'Erreur réseau, réessaie.' })
    }
    setLoading(false)
  }

  const shareUrl = window.location.href

  function copyLink() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!nameSet) {
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Draft CDM 2026 ⚽</h1>
          <p style={{ fontSize: 14, color: '#888' }}>Tu es qui ?</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1rem' }}>
          {players.map(p => (
            <button key={p} onClick={() => { setMyName(p); setNameSet(true) }} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 15 }}>
              {p}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#555' }}>Lien de la session : <span style={{ color: '#888' }}>{shareUrl}</span></p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>Draft CDM 2026 ⚽</h1>
          <p style={{ fontSize: 13, color: '#888' }}>Tu joues en tant que <strong style={{ color: '#f0f0f0' }}>{myName}</strong></p>
        </div>
        <button onClick={copyLink} style={{ fontSize: 12 }}>{copied ? '✅ Copié !' : '🔗 Partager'}</button>
      </div>

      {!allDone && (
        <div style={{ background: '#151515', border: '1px solid #2a2a2a', borderRadius: 10, padding: '12px 16px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14 }}>
            {isMyTurn ? '🎯 C\'est ton tour !' : `⏳ Tour de ${currentPlayer}`}
          </span>
          <span style={{ fontSize: 13, color: '#888' }}>{picks.length} picks total</span>
        </div>
      )}

      {allDone && (
        <div style={{ background: '#1a2a1a', border: '1px solid #2a4a2a', borderRadius: 10, padding: '12px 16px', marginBottom: '1rem' }}>
          <p style={{ fontSize: 14, color: '#6b9b6b' }}>✅ Draft terminé ! Comparez les équipes ci-dessous.</p>
        </div>
      )}

      {isMyTurn && !allDone && (
        <div style={{ marginBottom: '1rem', display: 'flex', gap: 8 }}>
          <input
            placeholder="Entrez un joueur (ex: Mbappé)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            disabled={loading}
          />
          <button className="primary" onClick={handleSubmit} disabled={loading || !input.trim()} style={{ whiteSpace: 'nowrap' }}>
            {loading ? '...' : 'Valider'}
          </button>
        </div>
      )}

      {status && (
        <div style={{
          fontSize: 13, padding: '8px 12px', borderRadius: 8, marginBottom: '1rem',
          background: status.type === 'ok' ? '#1a2a1a' : status.type === 'err' ? '#2a1a1a' : '#1a1a1a',
          border: `1px solid ${status.type === 'ok' ? '#2a4a2a' : status.type === 'err' ? '#4a2a2a' : '#2a2a2a'}`,
          color: status.type === 'ok' ? '#6b9b6b' : status.type === 'err' ? '#c97070' : '#888'
        }}>
          {status.msg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        {players.map(p => {
          const team = teamsByPlayer[p] || []
          const natCount = {}
          team.forEach(e => { natCount[e.nationality] = (natCount[e.nationality] || 0) + 1 })
          return (
            <div key={p} style={{
              background: '#111',
              border: `1px solid ${p === currentPlayer && !allDone ? '#2a4a6a' : '#222'}`,
              borderRadius: 10,
              padding: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #222' }}>
                <span style={{ fontWeight: 500, fontSize: 14 }}>{p} {p === myName ? '(toi)' : ''}</span>
                <span style={{ fontSize: 12, color: '#666' }}>{team.length}/11</span>
              </div>
              {team.length === 0 && <p style={{ fontSize: 12, color: '#555', fontStyle: 'italic' }}>Aucun joueur</p>}
              {team.map((entry, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0', fontSize: 13 }}>
                  <span style={{ fontSize: 11, background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, padding: '1px 5px', color: '#888', minWidth: 30, textAlign: 'center' }}>{entry.position}</span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.player_name}</span>
                  <span style={{
                    fontSize: 10, padding: '1px 5px', borderRadius: 4,
                    background: natCount[entry.nationality] >= MAX_NAT ? '#2a1a00' : '#1a1a2a',
                    color: natCount[entry.nationality] >= MAX_NAT ? '#b87a00' : '#6688aa',
                    border: `1px solid ${natCount[entry.nationality] >= MAX_NAT ? '#4a3000' : '#2a3a4a'}`
                  }}>
                    {entry.nationality}
                  </span>
                </div>
              ))}
              {team.length > 0 && (
                <p style={{ fontSize: 11, color: '#555', marginTop: 6 }}>
                  {Object.entries(natCount).map(([n, c]) => `${n}: ${c}`).join(' · ')}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
