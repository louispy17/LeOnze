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
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)
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
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from('draft_picks').select('*').eq('session_id', id).order('turn_index'),
      supabase.from('draft_ratings').select('*').eq('session_id', id)
    ])
    setSession(sess)
    setPicks(p || [])
    setRatings(r || [])
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
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'draft_ratings', filter: `session_id=eq.${id}` }, payload => {
        setRatings(prev => [...prev.filter(r => !(r.pick_id === payload.new.pick_id && r.rated_by === payload.new.rated_by)), payload.new])
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'draft_ratings', filter: `session_id=eq.${id}` }, payload => {
        setRatings(prev => prev.map(r => r.id === payload.new.id ? payload.new : r))
      })
      .subscribe()
  }

  async function createSession(playerNames) {
    const id = generateId()
    const { data } = await supabase.from('draft_sessions').insert({ id, players: playerNames, status: 'active' }).select().single()
    setSession(data)
    setPicks([])
    sessionIdRef.current = id
    const url = window.location.origin + '?session=' + id
    window.history.pushState({}, '', '?session=' + id)
    subscribeRealtime(id)
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

  async function endSession() {
    await supabase.from('draft_sessions').update({ status: 'done' }).eq('id', sessionIdRef.current)
    setSession(prev => ({ ...prev, status: 'done' }))
  }

  async function addRating(pickId, ratedBy, rating) {
    setRatings(prev => [
      ...prev.filter(r => !(r.pick_id === pickId && r.rated_by === ratedBy)),
      { pick_id: pickId, rated_by: ratedBy, rating, session_id: sessionIdRef.current }
    ])
    await supabase.from('draft_ratings').upsert(
      { session_id: sessionIdRef.current, pick_id: pickId, rated_by: ratedBy, rating },
      { onConflict: 'pick_id,rated_by' }
    )
  }

  if (loading) return (
    <div style={{ textAlign: 'center', paddingTop: '4rem', color: '#666' }}>Chargement...</div>
  )

  if (!session) return <Setup onCreate={createSession} />

  return (
    <Draft
      session={session}
      picks={picks}
      onPick={addPick}
      onEnd={endSession}
      ratings={ratings}
      onRate={addRating}
      onUpdatePos={updatePickPosition}
    />
  )
}
