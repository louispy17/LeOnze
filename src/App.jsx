import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabase.js'
import Setup from './Setup.jsx'
import Draft from './Draft.jsx'

function generateId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export default function App() {
  const [session, setSession] = useState(null)
  const [picks, setPicks] = useState([])
  const [teamVotes, setTeamVotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [realtimeStatus, setRealtimeStatus] = useState('disconnected')
  const [localMode, setLocalMode] = useState(false)
  const sessionIdRef = useRef(null)

  useEffect(() => {
    const urlId = new URLSearchParams(window.location.search).get('session')
    if (urlId) {
      loadSession(urlId)
    } else {
      setLoading(false)
    }
  }, [])

  async function loadSession(id) {
    const { data: sess } = await supabase.from('draft_sessions').select('*').eq('id', id).single()
    if (!sess) { setLoading(false); return }
    const [{ data: p }, { data: v }] = await Promise.all([
      supabase.from('draft_picks').select('*').eq('session_id', id).order('turn_index'),
      supabase.from('draft_team_votes').select('*').eq('session_id', id)
    ])
    setSession(sess)
    setLocalMode(sess.game_mode === 'local')
    setPicks(p || [])
    setTeamVotes(v || [])
    sessionIdRef.current = id
    setLoading(false)
    subscribeRealtime(id)
  }

  function subscribeRealtime(id) {
    supabase.channel('draft-' + id)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'draft_picks', filter: `session_id=eq.${id}` }, payload => {
        setPicks(prev => {
          if (prev.find(p => p.id === payload.new.id)) return prev
          return [...prev, payload.new].sort((a, b) => a.turn_index - b.turn_index)
        })
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'draft_picks', filter: `session_id=eq.${id}` }, payload => {
        setPicks(prev => prev.map(p => p.id === payload.new.id ? payload.new : p))
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'draft_sessions', filter: `id=eq.${id}` }, payload => {
        setSession(payload.new)
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'draft_team_votes', filter: `session_id=eq.${id}` }, payload => {
        setTeamVotes(prev => [...prev.filter(v => !(v.team_player === payload.new.team_player && v.voted_by === payload.new.voted_by)), payload.new])
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'draft_team_votes', filter: `session_id=eq.${id}` }, payload => {
        setTeamVotes(prev => prev.map(v => v.id === payload.new.id ? payload.new : v))
      })
      .subscribe((status) => {
        setRealtimeStatus(status === 'SUBSCRIBED' ? 'connected' : 'disconnected')
      })
  }

  async function createSession(playerNames, bannedNationality = null, coaches = {}, gameMode = 'remote', competition = 'ucl') {
    const id = generateId()
    setLocalMode(gameMode === 'local')
    const insertData = { id, players: playerNames, status: 'active', game_mode: gameMode, competition }
    if (bannedNationality) insertData.banned_nationality = bannedNationality
    if (Object.keys(coaches).length > 0) insertData.coaches = coaches

    // Start the game immediately with the locally-known data instead of waiting
    // on the network round-trip, since the session id is already generated client-side.
    setSession(insertData)
    setPicks([])
    sessionIdRef.current = id
    const url = window.location.origin + '?session=' + id
    window.history.pushState({}, '', '?session=' + id)
    subscribeRealtime(id)

    supabase.from('draft_sessions').insert(insertData).select().single()
      .then(({ data }) => { if (data) setSession(data) })

    return url
  }

  async function addPick(pick) {
    const { data } = await supabase.from('draft_picks').insert({ ...pick, session_id: sessionIdRef.current }).select().single()
    if (data) setPicks(prev => prev.find(p => p.id === data.id) ? prev : [...prev, data].sort((a, b) => a.turn_index - b.turn_index))
    return data
  }

  async function updatePickPosition(pickId, position) {
    setPicks(prev => prev.map(p => p.id === pickId ? { ...p, position } : p))
    await supabase.from('draft_picks').update({ position }).eq('id', pickId)
  }

  async function updatePickCoords(pickId, pos_x, pos_y) {
    setPicks(prev => prev.map(p => p.id === pickId ? { ...p, pos_x, pos_y } : p))
    await supabase.from('draft_picks').update({ pos_x, pos_y }).eq('id', pickId)
  }

  async function endSession() {
    await supabase.from('draft_sessions').update({ status: 'done' }).eq('id', sessionIdRef.current)
    setSession(prev => ({ ...prev, status: 'done' }))
  }

  async function addTeamVote(teamPlayer, votedBy, scores) {
    setTeamVotes(prev => [
      ...prev.filter(v => !(v.team_player === teamPlayer && v.voted_by === votedBy)),
      { team_player: teamPlayer, voted_by: votedBy, ...scores, session_id: sessionIdRef.current }
    ])
    await supabase.from('draft_team_votes').upsert(
      { session_id: sessionIdRef.current, team_player: teamPlayer, voted_by: votedBy, ...scores },
      { onConflict: 'session_id,team_player,voted_by' }
    )
  }

  if (loading) return (
    <div style={{ textAlign: 'center', paddingTop: '4rem', color: 'var(--text-muted)' }}>Chargement...</div>
  )

  if (!session) return <Setup onCreate={createSession} />

  return (
    <Draft
      session={session}
      picks={picks}
      onPick={addPick}
      onEnd={endSession}
      teamVotes={teamVotes}
      onTeamVote={addTeamVote}
      onUpdatePos={updatePickPosition}
      onUpdateCoords={updatePickCoords}
      realtimeStatus={realtimeStatus}
      localMode={localMode}
    />
  )
}
