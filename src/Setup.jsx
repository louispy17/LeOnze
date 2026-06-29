import { useState } from 'react'
import { getAllNationalities } from './players.js'
import { COACHES } from './data/coaches.js'

const allNats = getAllNationalities()

export default function Setup({ onCreate }) {
  const [names, setNames] = useState(['', '', '', ''])
  const [coaches, setCoaches] = useState({})
  const [bannedNationality, setBannedNationality] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [creating, setCreating] = useState(false)

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
      </div>

      <div style={{
        background: '#111',
        border: '1px solid #222',
        borderRadius: 12,
        padding: '20px',
        marginBottom: '1.5rem',
      }}>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 6 }}>🎯 Le but du jeu</p>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>
            Construis le meilleur XI de la Coupe du Monde 2026 et compare-le avec tes potes !
          </p>
        </div>

        <div>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 12 }}>📋 Les règles</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.4 }}>
              <span style={{ color: '#fff' }}>🔄 Draft en serpentin</span> — L'ordre de sélection s'inverse à chaque round : J1→J2→J3→J4→J4→J3→J2→J1...
            </div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.4 }}>
              <span style={{ color: '#fff' }}>👤 1 pick par tour</span> — Chacun choisit un joueur à la fois, à son tour
            </div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.4 }}>
              <span style={{ color: '#fff' }}>🌍 Max 2 par nationalité</span> — Pas plus de 2 joueurs de la même nationalité sur l'ensemble du draft (tous participants confondus)
            </div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.4 }}>
              <span style={{ color: '#fff' }}>🚫 Joueur bloqué</span> — Un joueur sélectionné est retiré du pool pour tout le monde
            </div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.4 }}>
              <span style={{ color: '#fff' }}>⚽ Joueurs CDM 2026 uniquement</span> — Seuls les joueurs qualifiés pour la CDM 2026 sont acceptés
            </div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.4 }}>
              <span style={{ color: '#fff' }}>🏆 11 joueurs</span> — Complète ton XI pour terminer la partie et comparer les équipes
            </div>
          </div>
        </div>
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
          <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Choisis ton avatar 🎭</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filledNames.map(name => {
              const trimmed = name.trim()
              const selectedCoach = coaches[trimmed] || ''
              return (
                <div key={trimmed} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, color: '#aaa', minWidth: 80 }}>{trimmed}</span>
                  <select
                    value={selectedCoach}
                    onChange={e => updateCoach(trimmed, e.target.value || null)}
                    style={{
                      flex: 1,
                      background: '#111',
                      border: '1px solid #333',
                      borderRadius: 8,
                      padding: '10px 12px',
                      color: selectedCoach ? '#fff' : '#666',
                      fontSize: 14,
                      outline: 'none',
                    }}
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
