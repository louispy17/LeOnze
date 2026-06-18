export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { playerName, team, usedPlayers, pickedBy } = req.body

  const natCount = {}
  team.forEach(e => { natCount[e.nationality] = (natCount[e.nationality] || 0) + 1 })

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `Tu es l'arbitre d'un jeu de draft CDM 2026. Le joueur proposé est : "${playerName}".

Équipe actuelle de ${pickedBy} : ${JSON.stringify(team)}
Joueurs déjà pris par tous les participants : ${JSON.stringify(usedPlayers)}
Nationalités déjà dans l'équipe : ${JSON.stringify(natCount)}
Maximum 2 joueurs par nationalité.

Réponds UNIQUEMENT en JSON valide, sans markdown :
{
  "valid": true/false,
  "reason": "explication courte si invalide (laisser vide si valide)",
  "name": "nom normalisé du joueur",
  "nationality": "nationalité en français (ex: France, Brésil, Argentine, Espagne)",
  "position": "poste abrégé parmi : GB, DD, DC, DG, MDC, MC, MO, AD, AG, ATT"
}

Règles :
1. Le joueur doit avoir participé à la CDM 2026 (juin-juillet 2026, USA/Canada/Mexique)
2. Le joueur ne doit pas déjà être pris (vérifie usedPlayers, comparaison insensible à la casse)
3. Max 2 joueurs de même nationalité dans l'équipe de ${pickedBy}
4. Si le nom est ambigu, choisis le joueur CDM 2026 le plus connu`
        }]
      })
    })

    const data = await response.json()
    const text = data.content?.map(i => i.text || '').join('').replace(/```json|```/g, '').trim()
    const result = JSON.parse(text)
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ valid: false, reason: 'Erreur serveur, réessaie.' })
  }
}
