/**
 * Coach data for the draft game.
 * Real coaches use Wikimedia Commons URLs (free license).
 * Custom coaches use emoji cards.
 */
export const COACHES = [
  {
    id: 'zidane',
    name: 'Zidane',
    image: 'https://en.wikipedia.org/wiki/Special:FilePath/Zinedine_Zidane_by_Tasnim_03.jpg?width=200',
  },
  {
    id: 'jacquet',
    name: 'Aimé Jacquet',
    image: 'https://en.wikipedia.org/wiki/Special:FilePath/Aimé_Jacquet_2008.jpg?width=200',
  },
  {
    id: 'deschamps',
    name: 'Deschamps',
    image: 'https://en.wikipedia.org/wiki/Special:FilePath/Didier_Deschamps_2018.jpg?width=200',
  },
  {
    id: 'luis-enrique',
    name: 'Luis Enrique',
    image: 'https://en.wikipedia.org/wiki/Special:FilePath/Luis_Enrique_-_01.jpg?width=200',
  },
  {
    id: 'bielsa',
    name: 'Bielsa',
    image: 'https://en.wikipedia.org/wiki/Special:FilePath/Marcelo_Bielsa_2012.jpg?width=200',
  },
  {
    id: 'ancelotti',
    name: 'Ancelotti',
    image: 'https://en.wikipedia.org/wiki/Special:FilePath/Carlo_Ancelotti_2017.jpg?width=200',
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
