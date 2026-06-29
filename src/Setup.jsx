import { useState } from 'react'
import { getAllNationalities } from './players.js'
import { COACHES, getCoachInitials } from './data/coaches.js'

const allNats = getAllNationalities()

export default function Setup({ onCreate }) {
  const [names, setNames] = useState(['', '', '', ''])
  const [coaches, setCoaches] = useState({})
  const [bannedNationality, setBannedNationality] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [creating, setCreating] = useState(false)
  const [imgErrors, setImgErrors] = useState({})

  function updateName(i, val) {
    setNames(prev => prev.map((n, idx) => idx === i ? val : n))
  }

  function updateCoach(playerName, coachId) {
    setCoaches(prev => ({ ...prev, [playerName]: coachId }))
  }

  async function handleCreate() {
    const filled = names.filter(n => n.trim())
    if (filled.length < 2) { alert('Entrez au moins 2 noms.'); return }
    const trimmedNames = filled.map(n => n.trim())
    const coachMap = {}
    trimmedNames.forEach(name => {
      if (coaches[name]) coachMap[name] = coaches[name]
    })
    setCreating(true)
    const url = await onCreate(trimmedNames, bannedNationality || null, coachMap)
    setShareUrl(url)
    setCreating(false)
  }

  const filledNames = names.filter(n => n.trim())

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Draft CDM 2026 ⚽</h1>
        <p style={{ color: '#888', fontSize: 14 }}>Construisez votre XI — max 2 joueurs par nationalité</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Noms des participants (2 à 4)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {names.map((n, i) => (
            <input
              key={i}
              placeholder={`Joueur ${i + 1}${i >= 2 ? ' (optionnel)' : ''}`}
              value={n}
              onChange={e => updateName(i, e.target.value)}
              onKeyDown={e => e.key === 'Enter' && i === names.length - 1 && handleCreate()}
            />
          ))}
        </div>
      </div>

      {filledNames.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Choix du coach (optionnel)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filledNames.map(name => {
              const trimmed = name.trim()
              const selectedCoach = coaches[trimmed]
              return (
                <div key={trimmed} style={{ background: '#111', border: '1px solid #222', borderRadius: 8, padding: '10px 12px' }}>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{trimmed}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {COACHES.map(coach => {
                      const isSelected = selectedCoach === coach.id
                      return (
                        <button
                          key={coach.id}
                          onClick={() => updateCoach(trimmed, isSelected ? null : coach.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '6px 10px', borderRadius: 6,
                            background: isSelected ? '#1a3a2a' : '#0a0a0a',
                            border: `1px solid ${isSelected ? '#2a5a4a' : '#333'}`,
                            cursor: 'pointer', transition: 'all 0.15s'
                          }}
                        >
                          {coach.emoji ? (
                            <span style={{ fontSize: 16 }}>{coach.emoji}</span>
                          ) : (
                            <div style={{
                              width: 20, height: 20, borderRadius: '50%', overflow: 'hidden',
                              background: '#1a2332', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              {coach.image && !imgErrors[coach.id] ? (
                                <img
                                  src={coach.image}
                                  alt={coach.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={() => setImgErrors(p => ({ ...p, [coach.id]: true }))}
                                />
                              ) : (
                                <span style={{ fontSize: 8, fontWeight: 700, color: '#666' }}>
                                  {getCoachInitials(coach.name)}
                                </span>
                              )}
                            </div>
                          )}
                          <span style={{ fontSize: 11, color: isSelected ? '#6b9b6b' : '#888' }}>
                            {coach.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Nationalité bannie (optionnel)</p>
        <select
          value={bannedNationality}
          onChange={e => setBannedNationality(e.target.value)}
          style={{
            width: '100%',
            background: '#111',
            border: '1px solid #333',
            borderRadius: 8,
            padding: '10px 12px',
            color: bannedNationality ? '#fff' : '#666',
            fontSize: 14,
            outline: 'none'
          }}
        >
          <option value="">Aucune</option>
          {allNats.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <p style={{ fontSize: 11, color: '#555', marginTop: 6 }}>
          Les joueurs de cette nationalité ne pourront pas être sélectionnés.
        </p>
      </div>

      <button className="primary" onClick={handleCreate} disabled={creating} style={{ width: '100%', marginBottom: '1rem' }}>
        {creating ? 'Création...' : 'Créer la session →'}
      </button>

      {shareUrl && (
        <div style={{ background: '#111', border: '1px solid #2a4a2a', borderRadius: 8, padding: '12px 16px' }}>
          <p style={{ fontSize: 12, color: '#6b9b6b', marginBottom: 6 }}>✅ Session créée ! Partage ce lien à tes potes :</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={shareUrl} readOnly style={{ fontSize: 12, color: '#aaa' }} />
            <button style={{ whiteSpace: 'nowrap' }} onClick={() => navigator.clipboard.writeText(shareUrl)}>
              Copier
            </button>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a
          href="https://buymeacoffee.com/louispy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#555', fontSize: 12, textDecoration: 'none' }}
        >
          ☕ Buy me a coffee
        </a>
      </div>
    </div>
  )
}
