/** Maximum players per team */
export const MAX_PER_TEAM = 11

/** Maximum players allowed per nationality (global across all teams) */
export const MAX_NAT = 2

/** Player color palette indexed by player order */
export const PLAYER_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444']

/** All valid football positions */
export const ALL_POSITIONS = ['GB', 'DC', 'DD', 'DG', 'MDC', 'MC', 'MO', 'AD', 'AG', 'ATT']

/** Criteria used to vote on the other teams once the draft is done */
export const VOTE_CRITERIA = [
  { key: 'technique', emoji: '🧠', label: 'Cohérence technique', hint: 'L\'équipe tient tactiquement' },
  { key: 'ambiance', emoji: '🎉', label: 'Ambiance & esprit d\'équipe', hint: 'Le fun, la personnalité du onze' },
  { key: 'audace', emoji: '🎲', label: 'Audace', hint: 'Les paris plutôt que l\'évident' },
  { key: 'beau_jeu', emoji: '⚽', label: 'Beau jeu', hint: 'Ça jouerait bien, si c\'était réel' },
]
