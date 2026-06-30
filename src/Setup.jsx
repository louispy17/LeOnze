import { useState } from 'react'
import { getAllNationalities } from './players.js'
import { COACHES } from './data/coaches.js'

const allNats = getAllNationalities()

const PLACEHOLDERS = [
  'Ton prénom',
  'Prénom du pote 2',
  'Pote 3 (optionnel)',
  'Pote 4 (optionnel)',
]

const RULES = [
  { emoji: '🔄', title: 'Le draft tourne', desc: "On choisit chacun son tour, dans un ordre qui s'inverse à chaque round" },
  { emoji: '👤', title: 'Un joueur à la fois', desc: 'Pas de rush, tu réfléchis et tu picks' },
  { emoji: '🌍', title: 'Max 2 par nation', desc: 'Sur tout le draft, pas juste ton équipe' },
  { emoji: '🚫', title: 'Premier arrivé, premier servi', desc: 'Un joueur pris ? Il disparaît du pool' },
  { emoji: '⚽', title: 'CDM 2026 only', desc: 'Seuls les vrais qualifiés passent la validation' },
  { emoji: '🏆', title: '11 joueurs et c'est parti', desc: 'Complète ton XI pour comparer avec tes potes' },
]

const styles = {
  label: { fontSize: 14, color: '#9ca3af', marginBottom: 10 },
  helperText: { fontSize: 12, color: '#9ca3af', marginTop: 8 },
  section: { marginBottom: '2rem' },
  select: {
    width: '100%',
    background: '#111',
    border: '1px solid #333',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    outline: 'none',
  },
}

export default function Setup({ onCreate }) {
  const [names, setNames] = useState(['', '', '', ''])
  const [coaches, setCoaches] = useState({})
  const [bannedNationality, setBannedNationality] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [creating, setCreating] = useState(false)
  const [rulesOpen, setRulesOpen] = useState(false)
  const [gameMode, setGameMode] = useState('remote')

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
    const url = await onCreate(trimmedNames, bannedNationality || null, coachMap)
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
          borderRadius: 8,
          background: isActive ? '#1a3a2a' : '#111',
          border: `1px solid ${isActive ? '#4ade80' : '#333'}`,
          color: isActive ? '#4ade80' : '#888',
          fontSize: 14,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 10 }}>⚽ LeOnze</h1>
        <p style={{ fontSize: 18, color: '#ccc', marginBottom: 8 }}>Le jeu de draft de foot entre potes</p>
        <p style={{ fontSize: 13, color: '#666' }}>1249 joueurs · 48 équipes · CDM 2026</p>
      </div>

      {/* Rules accordion */}
      <button
        onClick={() => setRulesOpen(!rulesOpen)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '14px 0',
          marginBottom: rulesOpen ? 0 : '2.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 15, color: '#9ca3af' }}>Comment ça marche ? 👀</span>
        <span style={{
          fontSize: 12,
          color: '#666',
          transform: rulesOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
        }}>▼</span>
      </button>

      {rulesOpen && (
        <div style={{ marginBottom: '2.5rem', paddingTop: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {RULES.map(rule => (
              <div key={rule.title} style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.5 }}>
                <span style={{ color: '#fff' }}>{rule.emoji} {rule.title}</span> — {rule.desc}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Player names */}
      <div style={styles.section}>
        <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 }}>C'est parti 👊</p>
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
        <div style={styles.section}>
          <p style={{ ...styles.label, marginBottom: 12 }}>Ton avatar pour cette partie 🎭</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filledNames.map(name => {
              const trimmed = name.trim()
              const selectedCoach = coaches[trimmed] || ''
              return (
                <div key={trimmed} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 14, color: '#ccc', minWidth: 90 }}>{trimmed}</span>
                  <select
                    value={selectedCoach}
                    onChange={e => updateCoach(trimmed, e.target.value || null)}
                    style={{ ...styles.select, flex: 1, color: selectedCoach ? '#fff' : '#666' }}
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

      {/* Banned nationality */}
      <div style={styles.section}>
        <p style={styles.label}>Envie de pimenter ? Banni une nation 🔥</p>
        <select
          value={bannedNationality}
          onChange={e => setBannedNationality(e.target.value)}
          style={{ ...styles.select, color: bannedNationality ? '#fff' : '#666' }}
        >
          <option value="">Aucune</option>
          {allNats.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <p style={styles.helperText}>
          Les joueurs de cette nationalité seront hors-jeu pour tout le monde
        </p>
      </div>

      {/* Game mode */}
      <div style={styles.section}>
        <p style={styles.label}>Vous jouez comment ?</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <GameModeButton mode="remote" label="📡 Chacun sur son écran" />
          <GameModeButton mode="local" label="🤝 On se passe le téléphone" />
        </div>
      </div>

      {/* Submit */}
      <button
        className="primary"
        onClick={handleCreate}
        disabled={creating}
        style={{ width: '100%', marginBottom: '1.5rem', padding: '14px 20px', fontSize: 16 }}
      >
        {creating ? 'Création...' : 'Lancer la partie 🚀'}
      </button>

      {/* Share URL */}
      {shareUrl && (
        <div style={{ background: '#111', border: '1px solid #2a4a2a', borderRadius: 8, padding: '12px 16px' }}>
          <p style={{ fontSize: 12, color: '#6b9b6b', marginBottom: 6 }}>
            ✅ Session créée ! Partage ce lien à tes potes :
          </p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={shareUrl} readOnly style={{ fontSize: 12, color: '#aaa' }} />
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
        borderRadius: 16,
        padding: '24px 20px',
        textAlign: 'center',
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
