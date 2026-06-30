import { useState, useMemo, useEffect } from 'react'
import { validatePlayer, getAllNationalities } from './players.js'
import { MAX_PER_TEAM, MAX_NAT, PLAYER_COLORS, ALL_POSITIONS } from './constants.js'
import { getCoach } from './data/coaches.js'
import FootballPitch from './components/FootballPitch.jsx'
import PlayerList from './components/PlayerList.jsx'
import PlayerSelect from './components/PlayerSelect.jsx'
import ResultsView from './components/ResultsView.jsx'
import CoachAvatar from './components/CoachAvatar.jsx'

const allNats = getAllNationalities()

export default function Draft({ session, picks, onPick, onEnd, ratings = [], onRate, onUpdatePos, onUpdateCoords, realtimeStatus = 'disconnected' }) {
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
  const [editingPosId, setEditingPosId] = useState(null)
  const [matches, setMatches] = useState([])
  const [handoffPlayer, setHandoffPlayer] = useState(null)
  const [pendingPick, setPendingPick] = useState(null)

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

  useEffect(() => {
    if (allDone) setViewTab('results')
  }, [allDone])

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
  const isMyTurn = nameSet && currentPlayer === myName
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
      team: myTeam.map(p => ({ name: p.player_name, nationality: p.nationality, position: p.position })),
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
      } else if (session.game_mode === 'local') {
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

  if (!nameSet) {
    return (
      <PlayerSelect
        players={players}
        teamsByPlayer={teamsByPlayer}
        coaches={coaches}
        onSelect={name => { setMyName(name); setNameSet(true) }}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080c10', color: '#fff', fontFamily: 'system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
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
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>📱</div>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8, textAlign: 'center' }}>
            Passe le téléphone à
          </p>
          <p style={{ fontSize: 32, fontWeight: 800, color: PLAYER_COLORS[players.indexOf(handoffPlayer)], marginBottom: 16, textAlign: 'center' }}>
            {handoffPlayer} !
          </p>
          {coaches[handoffPlayer] && (
            <div style={{ marginBottom: 24 }}>
              <CoachAvatar coachId={coaches[handoffPlayer]} size={64} />
            </div>
          )}
          <button
            onClick={() => {
              setHandoffPlayer(null)
              setMyName('')
              setNameSet(false)
              setStatus(null)
            }}
            style={{
              background: PLAYER_COLORS[players.indexOf(handoffPlayer)],
              border: 'none',
              borderRadius: 12,
              padding: '16px 32px',
              color: '#000',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 16,
            }}
          >
            Je suis prêt 👊
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#0d1117', borderBottom: '1px solid #1a2332', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>⚽</span>
          <div>
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.3px' }}>LeOnze</span>
            <span style={{ color: '#4a5568', fontSize: 12, marginLeft: 8 }}>CDM 2026</span>
          </div>
          {bannedNationality && (
            <span style={{ background: '#4a1a1a', border: '1px solid #6b2a2a', borderRadius: 6, padding: '2px 8px', fontSize: 10, color: '#f87171', fontWeight: 600 }}>
              🚫 {bannedNationality}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: realtimeStatus === 'connected' ? '#4ade80' : '#6b7280' }}>
            {realtimeStatus === 'connected' ? '🟢 Connecté' : '🔴 Déconnecté'}
          </span>
          {myCoachId && <CoachAvatar coachId={myCoachId} size={24} />}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 13, color: '#9ca3af' }}>{myName}</span>
            {myCoach && <span style={{ fontSize: 9, color: '#4a5568' }}>{myCoach.name}</span>}
          </div>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: myColor }} />
          <button onClick={copyLink} style={{ background: 'none', border: '1px solid #1e2d3d', borderRadius: 6, padding: '4px 10px', color: '#6b7280', fontSize: 11, cursor: 'pointer' }}>
            {copied ? '✓ Copié' : '🔗 Partager'}
          </button>
        </div>
      </div>

      {/* Turn banner */}
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
            {picks.length} picks au total · {players.map(p => `${p} ${(teamsByPlayer[p] || []).length}/11`).join(' · ')}
          </p>
        </div>
        <button onClick={() => setShowPlayers(true)}
          style={{ background: '#1a2332', border: '1px solid #2d3748', borderRadius: 8, padding: '6px 12px', color: '#9ca3af', fontSize: 12, cursor: 'pointer' }}>
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
      {isMyTurn && !allDone && (
        <div style={{ margin: '0 16px 12px', display: 'flex', gap: 8 }}>
          <input
            placeholder="Ex: Mbappé, Bellingham, Vinicius..."
            value={input}
            onChange={e => { setInput(e.target.value); setMatches([]); setPendingPick(null) }}
            onKeyDown={e => e.key === 'Enter' && validateAndSetPending(input.trim())}
            disabled={loading}
            style={{
              flex: 1, background: '#0d1117', border: `1px solid ${myColor}44`,
              borderRadius: 10, padding: '12px 16px', color: '#fff',
              fontSize: 14, outline: 'none'
            }}
          />
          <button onClick={() => validateAndSetPending(input.trim())} disabled={loading || !input.trim() || pendingPick}
            style={{
              background: myColor, border: 'none', borderRadius: 10,
              padding: '12px 20px', color: '#000', fontWeight: 700,
              fontSize: 14, cursor: 'pointer', opacity: loading || !input.trim() ? 0.5 : 1
            }}>
            {loading ? '...' : '✓'}
          </button>
        </div>
      )}

      {/* Disambiguation */}
      {matches.length > 0 && (
        <div style={{ margin: '0 16px 12px', background: '#0d1117', border: '1px solid #2d3748', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '8px 14px', borderBottom: '1px solid #1a2332', fontSize: 11, color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Plusieurs joueurs correspondent — lequel ?
          </div>
          {matches.map((m, i) => (
            <div key={i}
              onClick={() => validateAndSetPending(m.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px',
                borderBottom: i < matches.length - 1 ? '1px solid #0f1923' : 'none',
                cursor: 'pointer', transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#111827'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 10, background: '#1a2332', border: '1px solid #2d3748', borderRadius: 4, padding: '2px 5px', color: '#6b7280', minWidth: 32, textAlign: 'center', fontWeight: 600 }}>
                {m.position}
              </span>
              <span style={{ flex: 1, fontSize: 13, color: '#e2e8f0' }}>{m.name}</span>
              <span style={{ fontSize: 11, color: '#4a5568' }}>{m.nationality}</span>
            </div>
          ))}
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

      {/* Team tabs */}
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

      {/* Results view */}
      {viewTab === 'results' && (
        <ResultsView
          players={players}
          teamsByPlayer={teamsByPlayer}
          teamScores={teamScores}
          ratings={ratings}
          myName={myName}
          myTeam={myTeam}
          onRate={onRate}
        />
      )}

      {/* Pitch + player list */}
      {viewTab !== 'results' && (
        <div style={{ padding: '0 16px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #1a2332' }}>
            <FootballPitch
              team={teamsByPlayer[players[viewTab]] || []}
              color={PLAYER_COLORS[viewTab]}
              isActive={players[viewTab] === myName}
              myName={myName}
              onUpdateCoords={onUpdateCoords}
            />
          </div>

          <div>
            <p style={{ fontSize: 11, color: '#4a5568', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Équipe de {players[viewTab]}
            </p>
            {(teamsByPlayer[players[viewTab]] || []).length === 0 && (
              <p style={{ fontSize: 13, color: '#2d3748', fontStyle: 'italic' }}>Aucun joueur encore</p>
            )}
            {(teamsByPlayer[players[viewTab]] || []).map((entry, i) => {
              const isMyPick = entry.picked_by === myName
              const isEditing = editingPosId === entry.id
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #0f1923' }}>
                  {isMyPick ? (
                    <div style={{ position: 'relative', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                      <span
                        onClick={() => setEditingPosId(isEditing ? null : entry.id)}
                        title="Changer le poste"
                        style={{ fontSize: 10, background: isEditing ? '#1e3a5f' : '#1a2332', border: `1px solid ${isEditing ? myColor + '88' : '#3d5a80'}`, borderRadius: 4, padding: '2px 5px', color: isEditing ? myColor : '#93c5fd', minWidth: 30, textAlign: 'center', fontWeight: 600, cursor: 'pointer', display: 'block', userSelect: 'none' }}>
                        {entry.position}
                      </span>
                      {isEditing && (
                        <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 50, background: '#0d1117', border: '1px solid #2d3748', borderRadius: 8, padding: '4px 0', minWidth: 76, boxShadow: '0 8px 24px rgba(0,0,0,0.7)' }}>
                          {ALL_POSITIONS.map(pos => (
                            <div key={pos}
                              onClick={() => { onUpdatePos(entry.id, pos); setEditingPosId(null) }}
                              style={{ padding: '5px 12px', fontSize: 12, color: pos === entry.position ? myColor : '#9ca3af', cursor: 'pointer', fontWeight: pos === entry.position ? 700 : 400, background: pos === entry.position ? myColor + '18' : 'transparent' }}>
                              {pos}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span style={{ fontSize: 10, background: '#1a2332', border: '1px solid #2d3748', borderRadius: 4, padding: '2px 5px', color: '#6b7280', minWidth: 30, textAlign: 'center', fontWeight: 600, flexShrink: 0 }}>
                      {entry.position}
                    </span>
                  )}
                  <span style={{ flex: 1, fontSize: 13, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {entry.player_name}
                  </span>
                  <span style={{ fontSize: 10, color: (globalNatCount[entry.nationality] || 0) >= MAX_NAT ? '#f59e0b' : '#4a5568' }}>
                    {entry.nationality}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Confirmation bar */}
      {pendingPick && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, #0d1117 0%, #0d1117ee 80%, transparent 100%)',
          padding: '24px 16px 16px',
          zIndex: 100,
        }}>
          <div style={{
            background: myColor + '22',
            border: `1px solid ${myColor}44`,
            borderRadius: 12,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {pendingPick.name}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>
                {pendingPick.position} · {pendingPick.nationality}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button
                onClick={cancelPendingPick}
                style={{
                  background: '#1f0f0f',
                  border: '1px solid #4a1a1a',
                  borderRadius: 8,
                  padding: '10px 16px',
                  color: '#f87171',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
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
                  color: '#000',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {loading ? '...' : '✅ Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
