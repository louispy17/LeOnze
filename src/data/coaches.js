/**
 * Coach data for the draft game.
 * Real coaches use Wikimedia Commons URLs (free license).
 * Custom coaches use emoji cards.
 */
export const COACHES = [
  { id: 'zidane', name: 'Zizou', emoji: '🐐' },
  { id: 'jacquet', name: 'Aimé Jacquet', emoji: '🏆' },
  { id: 'deschamps', name: 'Deschamps', emoji: '⭐' },
  { id: 'luis-enrique', name: 'Luis Enrique', emoji: '🔥' },
  { id: 'bielsa', name: 'Bielsa', emoji: '📋' },
  { id: 'ancelotti', name: 'Ancelotti', emoji: '🤨' },
  { id: 'jordan-93', name: 'Jordan du 93', emoji: '🏘️' },
  { id: 'jutos', name: 'Jutos le grand', emoji: '👑' },
]

/**
 * Get coach by ID
 * @param {string} coachId
 * @returns {object|undefined}
 */
export function getCoach(coachId) {
  return COACHES.find(c => c.id === coachId)
}

/**
 * Get initials from coach name for fallback avatar
 * @param {string} name
 * @returns {string}
 */
export function getCoachInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}
