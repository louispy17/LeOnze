import { PLAYERS as CDM_PLAYERS } from './players.js'
import { UCL_PLAYERS } from './data/uclPlayers.js'

export const COMPETITIONS = {
  ucl: {
    id: 'ucl',
    label: 'Ligue des Champions',
    shortLabel: 'LDC 2025-26',
    emoji: '🏆',
    players: UCL_PLAYERS,
    groupLabel: 'club',
    groupLabelPlural: 'clubs',
    allGroupsLabel: 'Tous les clubs',
    noneLabel: 'Aucun',
    bannedTitle: 'Envie de pimenter ? Banni un club 🔥',
    bannedHelper: 'Les joueurs de ce club seront hors-jeu pour tout le monde',
    poolLabel: 'la Ligue des Champions 2025-26',
  },
  cdm: {
    id: 'cdm',
    label: 'Coupe du Monde',
    shortLabel: 'CDM 2026',
    emoji: '🌍',
    players: CDM_PLAYERS,
    groupLabel: 'nation',
    groupLabelPlural: 'nations',
    allGroupsLabel: 'Toutes les nations',
    noneLabel: 'Aucune',
    bannedTitle: 'Envie de pimenter ? Banni une nation 🔥',
    bannedHelper: 'Les joueurs de cette nation seront hors-jeu pour tout le monde',
    poolLabel: 'la CDM 2026',
  },
}

export const DEFAULT_COMPETITION = 'ucl'

export function getCompetition(id) {
  return COMPETITIONS[id] || COMPETITIONS[DEFAULT_COMPETITION]
}
