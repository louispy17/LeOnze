import { useState } from 'react'

export default function Setup({ onCreate }) {
  const [names, setNames] = useState(['', '', '', ''])
  const [shareUrl, setShareUrl] = useState('')
  const [creating, setCreating] = useState(false)

  function updateName(i, val) {
    setNames(prev => prev.map((n, idx) => idx === i ? val : n))
  }

  async function handleCreate() {
    const filled = names.filter(n => n.trim())
    if (filled.length < 2) { alert('Entrez au moins 2 noms.'); return }
    setCreating(true)
    const url = await onCreate(filled.map(n => n.trim()).filter(Boolean))
    setShareUrl(url)
    setCreating(false)
  }

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
    </div>
  )
}
