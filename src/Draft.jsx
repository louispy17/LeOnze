import { useState, useMemo, useEffect } from 'react'
import { validatePlayer, getAllNationalities } from './players.js'
import { MAX_PER_TEAM, MAX_NAT, PLAYER_COLORS, ALL_POSITIONS } from './constants.js'
import { getCoach } from './data/coaches.js'
import FootballPitch from './components/FootballPitch.jsx'
import PlayerList from './components/PlayerList.jsx'
import PlayerSelect from './components/PlayerSelect.jsx'
import CoachAvatar from './components/CoachAvatar.jsx'
import TeamVoteCard from './components/TeamVoteCard.jsx'
import WinnerReveal from './components/WinnerReveal.jsx'

const allNats = getAllNationalities()

export default function Draft({ session, picks, onPick, onEnd, teamVotes = [], onTeamVote, onUpdatePos, onUpdateCoords, realtimeStatus = 'disconnected', localMode = false }) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedName, setSelectedName] = useState('')
  const [nameSet, setNameSet] = useState(false)
  const [copied, setCopied] = useState(false)
  const [viewTab, setViewTab] = useState(0)
  const [showPlayers, setShowPlayers] = useState(false)
  const [filterNat, setFilterNat] = useState('')
  const [filterPos, setFilterPos] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const [confettis, setConfettis] = useState([])
  const [editingPosId, setEditingPosId] = useState(null)
  const [matches, setMatches] = useState([])
  const [handoffPlayer, setHandoffPlayer] = useState(null)
  const [pendingPick, setPendingPick] = useState(null)
  const [votingIdx, setVotingIdx] = useState(0)

  const players = session.players
  const bannedNationality = session.banned_nationality
  const coaches = session.coaches || {}

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

  const votesComplete = allDone && players.length > 1 && teamVotes.length >= players.length * (players.length - 1)
  const ranking = useMemo(() => {
    if (!votesComplete) return []
    return [...players]
      .map(p => {
        const votes = teamVotes.filter(v => v.team_player === p)
        const avg = key => votes.length ? votes.reduce((s, v) => s + v[key], 0) / votes.length : 0
        return {
          name: p,
          color: PLAYER_COLORS[players.indexOf(p)],
          total: votes.reduce((s, v) => s + v.technique + v.ambiance + v.audace + v.beau_jeu, 0),
          avg: { technique: avg('technique'), ambiance: avg('ambiance'), audace: avg('audace'), beau_jeu: avg('beau_jeu') },
        }
      })
      .sort((a, b) => b.total - a.total)
  }, [votesComplete, players, teamVotes])
  const winner = ranking[0] || null

  useEffect(() => {
    if (winner) {
      launchConfetti()
      setViewTab('final')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!winner])

  // Local mode: once the current voter has rated every other team, hand the
  // phone to the next player so everyone votes on their own without peeking.
  useEffect(() => {
    if (!localMode || !allDone || handoffPlayer || votesComplete) return
    const votesFromMe = teamVotes.filter(v => v.voted_by === players[votingIdx]).length
    if (votesFromMe >= players.length - 1 && votingIdx < players.length - 1) {
      setVotingIdx(i => i + 1)
      setHandoffPlayer(players[votingIdx + 1])
    }
  }, [teamVotes, localMode, allDone, votingIdx, players, handoffPlayer, votesComplete])

  useEffect(() => {
    if (!editingPosId) return
    const close = () => setEditingPosId(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [editingPosId])

  const globalNatCount = useMemo(() => {
    const count = {}
    picks.forEach(p => { count[p.nationality] = (count[p.nationality] || 0) + 1 })
    return count
  }, [picks])

  /**
   * Calculate current turn using serpentine draft order.
   * Goes 1→2→3→4→4→3→2→1→1→2→... pattern.
   */
  function currentTurnPlayer() {
    const n = players.length
    const round = Math.floor(totalPicks / n)
    const pos = totalPicks % n
    const idx = round % 2 === 0 ? pos : n - 1 - pos
    return players[idx]
  }

  const currentPlayer = allDone ? null : currentTurnPlayer()
  // In local (pass-the-phone) mode the active player is always the one whose turn
  // it algorithmically is, no manual "who are you" selection, so there's nothing to mis-tap.
  // Once the draft is done, the same phone-passing mechanism drives the final vote instead.
  const myName = localMode
    ? (allDone ? players[votingIdx] : (currentPlayer || players[0]))
    : (nameSet ? selectedName : '')
  const isMyTurn = !!myName && currentPlayer === myName
  const usedPlayers = picks.map(p => p.player_name.toLowerCase())
  const myIndex = players.indexOf(myName)
  const myColor = PLAYER_COLORS[myIndex] || '#f59e0b'
  const myTeam = teamsByPlayer[myName] || []
  const myCoachId = coaches[myName]
  const myCoach = myCoachId ? getCoach(myCoachId) : null

  function validateAndSetPending(playerName) {
    setMatches([])
    setStatus(null)
    const result = validatePlayer({
      playerName,
      usedPlayers,
      allPicks: picks,
      bannedNationality
    })
    if (result.ambiguous) {
      setMatches(result.matches)
    } else if (!result.valid) {
      setStatus({ type: 'err', msg: '❌ ' + (result.reason || 'Joueur invalide') })
    } else {
      setPendingPick({
        name: result.name,
        position: result.position,
        nationality: result.nationality
      })
      setInput('')
      setShowPlayers(false)
    }
  }

  function cancelPendingPick() {
    setPendingPick(null)
    setStatus(null)
  }

  async function confirmPick() {
    if (!pendingPick) return
    setLoading(true)
    try {
      await onPick({
        player_name: pendingPick.name,
        picked_by: myName,
        nationality: pendingPick.nationality,
        position: pendingPick.position,
        turn_index: totalPicks
      })
      setStatus({ type: 'ok', msg: `✅ ${pendingPick.name} (${pendingPick.position}, ${pendingPick.nationality})` })
      launchConfetti()
      setPendingPick(null)

      const newTotal = totalPicks + 1
      const allNowDone = players.every(p => p === myName
        ? myTeam.length + 1 >= MAX_PER_TEAM
        : (teamsByPlayer[p] || []).length >= MAX_PER_TEAM)

      if (allNowDone) {
        onEnd()
        if (localMode) setHandoffPlayer(players[0])
      } else if (localMode) {
        const n = players.length
        const round = Math.floor(newTotal / n)
        const pos = newTotal % n
        const idx = round % 2 === 0 ? pos : n - 1 - pos
        const nextPlayer = players[idx]
        setHandoffPlayer(nextPlayer)
      }
    } catch {
      setStatus({ type: 'err', msg: '❌ Erreur inattendue, réessaie.' })
    }
    setLoading(false)
  }

  function launchConfetti() {
    const items = Array.from({ length: 32 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: [myColor, '#fff', '#ffd700', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 5)],
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

  if (!localMode && !nameSet) {
    return (
      <PlayerSelect
        players={players}
        teamsByPlayer={teamsByPlayer}
        coaches={coaches}
        onSelect={name => { setSelectedName(name); setNameSet(true) }}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh', color: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
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

      {/* Handoff overlay for local/same-phone mode */}
      {handoffPlayer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(13, 35, 24, 0.45)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24,
            padding: '40px 32px', maxWidth: 340, width: '100%', textAlign: 'center',
            boxShadow: '0 24px 60px rgba(13,35,24,0.3)',
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>📱</div>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 8 }}>
              Passe le téléphone à
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: PLAYER_COLORS[players.indexOf(handoffPlayer)], marginBottom: 20 }}>
              {handoffPlayer}
            </p>
            {coaches[handoffPlayer] && (
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
                <CoachAvatar coachId={coaches[handoffPlayer]} size={64} />
              </div>
            )}
            <button
              onClick={() => {
                if (!allDone) setViewTab(players.indexOf(handoffPlayer))
                setHandoffPlayer(null)
                setStatus(null)
              }}
              style={{
                width: '100%',
                background: PLAYER_COLORS[players.indexOf(handoffPlayer)],
                border: 'none',
                borderRadius: 12,
                padding: '14px 32px',
                color: 'var(--ink)',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Je suis prêt 👊
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>⚽</span>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '-0.3px' }}>LeOnze</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 12, marginLeft: 8 }}>CDM 2026</span>
          </div>
          {bannedNationality && (
            <span style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 6, padding: '2px 8px', fontSize: 10, color: '#dc2626', fontWeight: 600 }}>
              🚫 {bannedNationality}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: realtimeStatus === 'connected' ? 'var(--accent)' : 'var(--text-muted)' }}>
            {realtimeStatus === 'connected' ? '🟢 Connecté' : '🔴 Déconnecté'}
          </span>
          {myCoachId && <CoachAvatar coachId={myCoachId} size={24} />}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{myName}</span>
            {myCoach && <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{myCoach.name}</span>}
          </div>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: myColor }} />
          <button onClick={copyLink} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', color: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}>
            {copied ? '✓ Copié' : '🔗 Partager'}
          </button>
        </div>
      </div>

      {/* Turn banner */}
      <div style={{
        margin: '12px 16px',
        padding: '12px 16px',
        borderRadius: 14,
        background: isMyTurn ? `linear-gradient(135deg, ${myColor}1a, ${myColor}0d)` : 'var(--surface)',
        border: `1px solid ${isMyTurn ? myColor + '55' : 'var(--border)'}`,
        boxShadow: 'var(--shadow)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: isMyTurn ? myColor : 'var(--ink)' }}>
            {allDone ? '🏆 Draft terminé !' : isMyTurn ? '🎯 C\'est ton tour !' : `⏳ Tour de ${currentPlayer}`}
          </p>
          <p className="label-mono" style={{ margin: '4px 0 0' }}>
            {picks.length} picks · {players.map(p => `${p} ${(teamsByPlayer[p] || []).length}/11`).join(' · ')}
          </p>
        </div>
        <button onClick={() => setShowPlayers(true)}
          style={{ background: '#f2f6f3', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px', color: 'var(--ink-soft)', fontSize: 12 }}>
          📋 Joueurs dispo
        </button>
      </div>

      <PlayerList
        show={showPlayers}
        onClose={() => setShowPlayers(false)}
        usedPlayers={usedPlayers}
        filterSearch={filterSearch}
        setFilterSearch={setFilterSearch}
        filterNat={filterNat}
        setFilterNat={setFilterNat}
        filterPos={filterPos}
        setFilterPos={setFilterPos}
        globalNatCount={globalNatCount}
        maxNat={MAX_NAT}
        isMyTurn={isMyTurn}
        myColor={myColor}
        onSelect={name => validateAndSetPending(name)}
        allNats={allNats}
      />

      {/* Input */}
      {isMyTurn && !allDone && !pendingPick && (
        <div style={{ margin: '0 16px 12px', display: 'flex', gap: 8 }}>
          <input
            placeholder="Ex: Mbappé, Bellingham, Vinicius..."
            value={input}
            onChange={e => { setInput(e.target.value); setMatches([]) }}
            onKeyDown={e => e.key === 'Enter' && validateAndSetPending(input.trim())}
            disabled={loading}
            autoFocus
            style={{
              flex: 1, border: `1px solid ${myColor}55`,
              borderRadius: 12, padding: '12px 16px',
              fontSize: 14,
            }}
          />
          <button onClick={() => validateAndSetPending(input.trim())} disabled={loading || !input.trim()}
            style={{
              background: myColor, border: 'none', borderRadius: 12,
              padding: '12px 20px', color: 'var(--ink)', fontWeight: 700,
              fontSize: 14, opacity: loading || !input.trim() ? 0.5 : 1
            }}>
            {loading ? '...' : '✓'}
          </button>
        </div>
      )}

      {/* Pick confirmation, right where you typed it */}
      {pendingPick && (
        <div style={{
          margin: '0 16px 12px',
          background: 'var(--surface)',
          border: `1px solid ${myColor}55`,
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {pendingPick.name}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>
              {pendingPick.position} · {pendingPick.nationality}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button
              onClick={cancelPendingPick}
              style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: 8,
                padding: '10px 16px',
                color: '#dc2626',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              ❌ Annuler
            </button>
            <button
              onClick={confirmPick}
              disabled={loading}
              style={{
                background: myColor,
                border: 'none',
                borderRadius: 8,
                padding: '10px 16px',
                color: 'var(--ink)',
                fontSize: 14,
                fontWeight: 700,
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? '...' : '✅ Confirmer'}
            </button>
          </div>
        </div>
      )}

      {/* Disambiguation */}
      {matches.length > 0 && (
        <div style={{ margin: '0 16px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          <div className="label-mono" style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)' }}>
            Plusieurs joueurs correspondent, lequel ?
          </div>
          {matches.map((m, i) => (
            <div key={i}
              onClick={() => validateAndSetPending(m.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px',
                borderBottom: i < matches.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer', transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f2f6f3'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 10, background: '#f2f6f3', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 5px', color: 'var(--text-muted)', minWidth: 32, textAlign: 'center', fontWeight: 600 }}>
                {m.position}
              </span>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--ink)' }}>{m.name}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.nationality}</span>
            </div>
          ))}
        </div>
      )}

      {/* Status */}
      {status && (
        <div style={{
          margin: '0 16px 12px', padding: '10px 14px', borderRadius: 10, fontSize: 13,
          background: status.type === 'ok' ? 'var(--accent-soft)' : status.type === 'err' ? '#fee2e2' : 'var(--surface)',
          border: `1px solid ${status.type === 'ok' ? '#b9e8c8' : status.type === 'err' ? '#fecaca' : 'var(--border)'}`,
          color: status.type === 'ok' ? '#15803d' : status.type === 'err' ? '#dc2626' : 'var(--text)'
        }}>
          {status.msg}
        </div>
      )}

      {/* Team tabs */}
      <div style={{ margin: '0 16px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {players.map((p, i) => (
          <button key={p} onClick={() => setViewTab(i)}
            style={{
              background: viewTab === i ? PLAYER_COLORS[i] : '#f2f6f3',
              border: `1px solid ${viewTab === i ? PLAYER_COLORS[i] : 'var(--border)'}`,
              borderRadius: 8, padding: '6px 14px', color: viewTab === i ? 'var(--ink)' : 'var(--text-muted)',
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0
            }}>
            {p} {p === myName ? '(toi)' : ''} · {(teamsByPlayer[p] || []).length}/11
          </button>
        ))}
        {winner && (
          <button onClick={() => setViewTab('final')}
            style={{
              background: viewTab === 'final' ? '#ffd700' : '#f2f6f3',
              border: `1px solid ${viewTab === 'final' ? '#ffd700' : 'var(--border)'}`,
              borderRadius: 8, padding: '6px 14px', color: viewTab === 'final' ? 'var(--ink)' : 'var(--text-muted)',
              fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0
            }}>
            🏆 Résultat
          </button>
        )}
      </div>

      {/* Final winner reveal */}
      {viewTab === 'final' && winner && (
        <WinnerReveal winner={winner} ranking={ranking} teamsByPlayer={teamsByPlayer} myName={myName} />
      )}

      {/* Pitch + team, with the vote panel right below when the draft is over */}
      {viewTab !== 'final' && (
      <div className="draft-grid" style={{ padding: '0 16px 24px' }}>
          <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            <FootballPitch
              team={teamsByPlayer[players[viewTab]] || []}
              color={PLAYER_COLORS[viewTab]}
              isActive={players[viewTab] === myName}
              myName={myName}
              onUpdateCoords={onUpdateCoords}
            />
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px', boxShadow: 'var(--shadow)' }}>
            <p className="label-mono" style={{ marginBottom: 10 }}>
              Équipe de {players[viewTab]}
            </p>
            {(teamsByPlayer[players[viewTab]] || []).length === 0 && (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucun joueur encore</p>
            )}
            {(teamsByPlayer[players[viewTab]] || []).map((entry, i) => {
              const isMyPick = entry.picked_by === myName
              const isEditing = editingPosId === entry.id
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  {isMyPick ? (
                    <div style={{ position: 'relative', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                      <span
                        onClick={() => setEditingPosId(isEditing ? null : entry.id)}
                        title="Changer le poste"
                        style={{ fontSize: 10, background: isEditing ? 'var(--accent-soft)' : '#f2f6f3', border: `1px solid ${isEditing ? myColor + '88' : 'var(--border)'}`, borderRadius: 4, padding: '2px 5px', color: isEditing ? myColor : 'var(--ink-soft)', minWidth: 30, textAlign: 'center', fontWeight: 600, cursor: 'pointer', display: 'block', userSelect: 'none' }}>
                        {entry.position}
                      </span>
                      {isEditing && (
                        <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 50, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '4px 0', minWidth: 76, boxShadow: '0 12px 32px rgba(13,35,24,0.18)' }}>
                          {ALL_POSITIONS.map(pos => (
                            <div key={pos}
                              onClick={() => { onUpdatePos(entry.id, pos); setEditingPosId(null) }}
                              style={{ padding: '5px 12px', fontSize: 12, color: pos === entry.position ? myColor : 'var(--text)', cursor: 'pointer', fontWeight: pos === entry.position ? 700 : 400, background: pos === entry.position ? myColor + '18' : 'transparent' }}>
                              {pos}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span style={{ fontSize: 10, background: '#f2f6f3', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 5px', color: 'var(--text-muted)', minWidth: 30, textAlign: 'center', fontWeight: 600, flexShrink: 0 }}>
                      {entry.position}
                    </span>
                  )}
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {entry.player_name}
                  </span>
                  <span style={{ fontSize: 10, color: (globalNatCount[entry.nationality] || 0) >= MAX_NAT ? '#b45309' : 'var(--text-muted)' }}>
                    {entry.nationality}
                  </span>
                </div>
              )
            })}
            {allDone && (
              <TeamVoteCard
                key={players[viewTab]}
                teamPlayer={players[viewTab]}
                color={PLAYER_COLORS[viewTab]}
                myName={myName}
                players={players}
                teamVotes={teamVotes}
                onVote={onTeamVote}
              />
            )}
          </div>
        </div>
      )}

    </div>
  )
}
