/**
 * Coach data for the draft game.
 * Real coaches use Wikimedia Commons URLs (free license).
 * Custom coaches use emoji cards.
 */
export const COACHES = [
  {
    id: 'zidane',
    name: 'Zidane',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg/220px-Zinedine_Zidane_by_Tasnim_03.jpg',
  },
  {
    id: 'jacquet',
    name: 'Aimé Jacquet',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Aim%C3%A9_Jacquet_2008.jpg/220px-Aim%C3%A9_Jacquet_2008.jpg',
  },
  {
    id: 'deschamps',
    name: 'Deschamps',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Didier_Deschamps_2018.jpg/220px-Didier_Deschamps_2018.jpg',
  },
  {
    id: 'luis-enrique',
    name: 'Luis Enrique',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Luis_Enrique_2018_%28cropped%29.jpg/220px-Luis_Enrique_2018_%28cropped%29.jpg',
  },
  {
    id: 'bielsa',
    name: 'Bielsa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Marcelo_Bielsa_2019.jpg/220px-Marcelo_Bielsa_2019.jpg',
  },
  {
    id: 'ancelotti',
    name: 'Ancelotti',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Carlo_Ancelotti_2024.jpg/220px-Carlo_Ancelotti_2024.jpg',
  },
  {
    id: 'jordan-93',
    name: 'Jordan du 93',
    emoji: '🏘️',
  },
  {
    id: 'jutos',
    name: 'Jutos le grand',
    emoji: '👑',
  },
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
