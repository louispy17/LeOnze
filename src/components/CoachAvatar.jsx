import { useState } from 'react'
import { getCoach, getCoachInitials } from '../data/coaches.js'

/**
 * Displays a coach avatar with image, emoji, or initials fallback.
 * @param {string} coachId - Coach identifier
 * @param {number} size - Avatar size in pixels
 */
export default function CoachAvatar({ coachId, size = 24 }) {
  const [imgError, setImgError] = useState(false)
  const coach = getCoach(coachId)

  if (!coach) return null

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a2332',
    border: '1px solid #2d3748',
  }

  if (coach.emoji) {
    return (
      <div style={containerStyle}>
        <span style={{ fontSize: size * 0.6 }}>{coach.emoji}</span>
      </div>
    )
  }

  if (coach.image && !imgError) {
    return (
      <div style={containerStyle}>
        <img
          src={coach.image}
          alt={coach.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div style={{ ...containerStyle, fontSize: size * 0.4, fontWeight: 700, color: '#9ca3af' }}>
      {getCoachInitials(coach.name)}
    </div>
  )
}
