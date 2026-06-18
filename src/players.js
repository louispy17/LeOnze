const PLAYERS = []

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').trim()
}

export function validatePlayer({ playerName, team, usedPlayers }) {
  const input = normalize(playerName)
  const match = PLAYERS.find(p => {
    const n = normalize(p.name)
    const lastName = normalize(p.name.split(' ').pop())
    return n === input || n.includes(input) || (input.length > 3 && lastName === input)
  })
  if (!match) return { valid: false, reason: `"${playerName}" n'a pas participé à la CDM 2026 ou est inconnu.` }
  if (usedPlayers.some(u => normalize(u) === normalize(match.name))) return { valid: false, reason: `${match.name} est déjà pris.` }
  const natCount = {}
  team.forEach(e => { natCount[e.nationality] = (natCount[e.nationality] || 0) + 1 })
  if ((natCount[match.nationality] || 0) >= 2) return { valid: false, reason: `Tu as déjà 2 joueurs de ${match.nationality}.` }
  return { valid: true, name: match.name, nationality: match.nationality, position: match.position }
}
