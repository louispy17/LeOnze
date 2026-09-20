import { useState, useEffect, useMemo } from 'react'
import { getAllNationalities } from './players.js'
import { COACHES } from './data/coaches.js'
import { COMPETITIONS, DEFAULT_COMPETITION } from './competitions.js'
import Onboarding from './components/Onboarding.jsx'

const ONBOARDING_SEEN_KEY = 'leonze_onboarding_seen'
const COMPETITION_LIST = Object.values(COMPETITIONS)

const PLACEHOLDERS = [
  'Ton prénom',
  'Prénom du pote 2',
  'Pote 3 (optionnel)',
  'Pote 4 (optionnel)',
]

const styles = {
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    padding: '22px 22px 24px',
    boxShadow: 'var(--shadow)',
  },
  cardTitle: { fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 },
  helperText: { fontSize: 12.5, color: 'var(--text-muted)', marginTop: 10 },
  stack: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: '2rem' },
  select: {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '11px 12px',
    fontSize: 14,
    outline: 'none',
    color: 'var(--ink)',
  },
}

export default function Setup({ onCreate }) {
  const [names, setNames] = useState(['', '', '', ''])
  const [coaches, setCoaches] = useState({})
  const [competitionId, setCompetitionId] = useState(DEFAULT_COMPETITION)
  const [bannedNationality, setBannedNationality] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [creating, setCreating] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [gameMode, setGameMode] = useState('remote')

  const competition = COMPETITIONS[competitionId]
  const allGroups = useMemo(() => getAllNationalities(competition.players), [competition])

  useEffect(() => {
    if (!localStorage.getItem(ONBOARDING_SEEN_KEY)) setShowOnboarding(true)
  }, [])

  useEffect(() => {
    setBannedNationality('')
  }, [competitionId])

  function closeOnboarding() {
    localStorage.setItem(ONBOARDING_SEEN_KEY, '1')
    setShowOnboarding(false)
  }

  const filledNames = names.filter(n => n.trim())

  function updateName(i, val) {
    setNames(prev => prev.map((n, idx) => (idx === i ? val : n)))
  }

  function updateCoach(playerName, coachId) {
    setCoaches(prev => ({ ...prev, [playerName]: coachId }))
  }

  async function handleCreate() {
    const trimmedNames = filledNames.map(n => n.trim())
    if (trimmedNames.length < 2) {
      alert('Entrez au moins 2 noms.')
      return
    }
    const coachMap = {}
    trimmedNames.forEach(name => {
      if (coaches[name]) coachMap[name] = coaches[name]
    })
    setCreating(true)
    const url = await onCreate(trimmedNames, bannedNationality || null, coachMap, gameMode, competitionId)
    setShareUrl(url)
    setCreating(false)
  }

  function GameModeButton({ mode, label }) {
    const isActive = gameMode === mode
    return (
      <button
        onClick={() => setGameMode(mode)}
        style={{
          flex: 1,
          padding: '12px 16px',
          borderRadius: 12,
          background: isActive ? 'var(--accent-bright)' : '#f2f6f3',
          border: `1px solid ${isActive ? 'var(--accent-bright)' : 'var(--border)'}`,
          color: isActive ? 'var(--accent-ink)' : 'var(--ink-soft)',
          fontSize: 13.5,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Draft foot · {competition.shortLabel}</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 46, lineHeight: 1, color: 'var(--ink)', display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            LeOnze
            <span style={{ width: 12, height: 12, background: 'var(--accent-bright)', borderRadius: 3, marginBottom: 6 }} />
          </h1>
          <p style={{ fontSize: 15.5, color: 'var(--text)', marginTop: 12 }}>Le jeu de draft de foot entre potes</p>
          <p className="label-mono" style={{ marginTop: 8 }}>{competition.players.length} joueurs · {allGroups.length} {competition.groupLabelPlural}</p>
        </div>
        <button
          onClick={() => setShowOnboarding(true)}
          style={{ borderRadius: 999, padding: '9px 16px', fontSize: 13, color: 'var(--ink-soft)' }}
        >
          Comment ça marche ? 👀
        </button>
      </div>

      <Onboarding open={showOnboarding} onClose={closeOnboarding} competition={competition} />

      {/* Competition */}
      <div style={{ ...styles.card, marginBottom: 16 }}>
        <p style={styles.cardTitle}>Quelle compétition ?</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {COMPETITION_LIST.map(c => {
            const isActive = c.id === competitionId
            return (
              <button
                key={c.id}
                onClick={() => setCompetitionId(c.id)}
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  borderRadius: 12,
                  background: isActive ? 'var(--accent-bright)' : '#f2f6f3',
                  border: `1px solid ${isActive ? 'var(--accent-bright)' : 'var(--border)'}`,
                  color: isActive ? 'var(--accent-ink)' : 'var(--ink-soft)',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {c.emoji} {c.label}
              </button>
            )
          })}
        </div>
      </div>

      <div style={styles.stack}>
        {/* Player names */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>C'est parti 👊</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {names.map((n, i) => (
              <input
                key={i}
                placeholder={PLACEHOLDERS[i]}
                value={n}
                onChange={e => updateName(i, e.target.value)}
                onKeyDown={e => e.key === 'Enter' && i === names.length - 1 && handleCreate()}
              />
            ))}
          </div>
        </div>

        {/* Avatar picker */}
        {filledNames.length > 0 && (
          <div style={styles.card}>
            <p style={styles.cardTitle}>Ton avatar pour cette partie 🎭</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filledNames.map(name => {
                const trimmed = name.trim()
                const selectedCoach = coaches[trimmed] || ''
                return (
                  <div key={trimmed} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 14, color: 'var(--text)', minWidth: 90 }}>{trimmed}</span>
                    <select
                      value={selectedCoach}
                      onChange={e => updateCoach(trimmed, e.target.value || null)}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">Aucun</option>
                      {COACHES.map(coach => (
                        <option key={coach.id} value={coach.id}>
                          {coach.emoji} {coach.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Banned group */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>{competition.bannedTitle}</p>
          <select
            value={bannedNationality}
            onChange={e => setBannedNationality(e.target.value)}
            style={styles.select}
          >
            <option value="">{competition.noneLabel}</option>
            {allGroups.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <p style={styles.helperText}>
            {competition.bannedHelper}
          </p>
        </div>

        {/* Game mode */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Vous jouez comment ?</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <GameModeButton mode="remote" label="📡 Chacun sur son écran" />
            <GameModeButton mode="local" label="🤝 On se passe le téléphone" />
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        className="primary"
        onClick={handleCreate}
        disabled={creating}
        style={{ width: '100%', marginBottom: '1.5rem', padding: '15px 20px', fontSize: 16, borderRadius: 14 }}
      >
        {creating ? 'Création...' : 'Lancer la partie 🚀'}
      </button>

      {/* Share URL */}
      {shareUrl && (
        <div style={{ ...styles.card, borderColor: 'var(--accent-soft)', background: 'var(--accent-soft)' }}>
          <p style={{ fontSize: 12.5, color: 'var(--accent-ink)', fontWeight: 600, marginBottom: 8 }}>
            ✅ Session créée ! Partage ce lien à tes potes :
          </p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={shareUrl} readOnly style={{ fontSize: 12, background: 'var(--surface)' }} />
            <button style={{ whiteSpace: 'nowrap' }} onClick={() => navigator.clipboard.writeText(shareUrl)}>
              Copier
            </button>
          </div>
        </div>
      )}

      {/* Buy me a coffee */}
      <div style={{
        marginTop: '2rem',
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        borderRadius: 20,
        padding: '24px 20px',
        textAlign: 'center',
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>☕</div>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
          Tu kiffes LeOnze ?
        </p>
        <p style={{ fontSize: 14, color: '#44403c', marginBottom: 16, lineHeight: 1.4 }}>
          Soutiens le dév fan de foot qui t'a fait kiffer ce jeu de draft 🤪
        </p>
        <a
          href="https://buymeacoffee.com/louispy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#1a1a1a',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          ☕ Offrir un café
        </a>
      </div>
    </div>
  )
}
