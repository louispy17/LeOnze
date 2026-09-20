import { useState } from 'react'

const STEPS = [
  {
    emoji: '🏆',
    title: "Le but ? Prouver que t'as le meilleur goût foot",
    desc: "Chacun draft son XI de rêve avec les stars de la CDM 2026. Une fois les équipes bouclées, ce sont tes potes qui notent chaque pick. Meilleure moyenne, meilleur onze.",
  },
  {
    emoji: '🔄',
    title: 'Chacun son tour, un pick à la fois',
    desc: "L'ordre s'inverse à chaque round (1→2→3→4→4→3→2→1...), donc pas toujours le même sens. Un joueur pris ? Il disparaît du pool pour tout le monde, alors dégaine vite.",
  },
  {
    emoji: '🛂',
    title: 'Ton pick peut être recalé, voici pourquoi',
    desc: 'Seuls les vrais qualifiés pour la CDM 2026 sont valides. Et max 2 joueurs par nation sur tout le draft, pas que ton équipe : impossible de rafler toute une sélection.',
  },
  {
    emoji: '🤝',
    title: 'Deux façons de jouer',
    desc: 'Chacun sur son écran avec un lien à partager, ou on se passe le même téléphone à chaque tour. À toi de choisir.',
  },
]

export default function Onboarding({ open, onClose }) {
  const [step, setStep] = useState(0)

  if (!open) return null

  const isLast = step === STEPS.length - 1
  const current = STEPS[step]

  function handleClose() {
    setStep(0)
    onClose()
  }

  function next() {
    if (isLast) { handleClose(); return }
    setStep(s => s + 1)
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={handleClose}
    >
      <div
        style={{ width: '100%', maxWidth: 400, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '24px 22px 18px', position: 'relative', boxShadow: '0 20px 60px rgba(13,35,24,0.25)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Fermer"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 28, height: 28, borderRadius: '50%',
            background: '#f2f6f3', border: '1px solid var(--border)',
            color: 'var(--text-muted)', fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}
        >
          ✕
        </button>

        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'var(--accent-soft)', border: '1px solid #c8ecd4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, marginBottom: 18,
        }}>
          {current.emoji}
        </div>

        <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>{current.title}</h2>
        <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.6, margin: 0, minHeight: 66 }}>{current.desc}</p>

        <div style={{ borderTop: '1px solid var(--border)', marginTop: 20, paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Étape ${i + 1}`}
                style={{
                  width: i === step ? 18 : 6, height: 6, borderRadius: 3,
                  background: i === step ? 'var(--accent-bright)' : '#dfe7e1',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {!isLast && (
              <button
                onClick={handleClose}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13.5, cursor: 'pointer', padding: 0 }}
              >
                Passer
              </button>
            )}
            <button
              onClick={next}
              style={{
                background: 'var(--accent-bright)', border: 'none', borderRadius: 9,
                padding: '9px 18px', color: 'var(--accent-ink)', fontWeight: 700,
                fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              {isLast ? "C'est parti 🚀" : 'Suivant ›'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
