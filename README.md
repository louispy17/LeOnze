# Draft CDM 2026 ⚽

Jeu de draft en temps réel — construisez votre XI CDM 2026 avec vos amis.

## Stack
- React + Vite (frontend)
- Vercel Serverless Function (validation joueurs via Claude)
- Supabase (BDD + Realtime)

## Déploiement

### 1. Supabase
- Ouvre ton projet Supabase existant (celui d'Upgame)
- Va dans **SQL Editor** et exécute le contenu de `supabase-setup.sql`

### 2. Vercel
```bash
# Clone / crée un nouveau repo GitHub avec ces fichiers
# Puis dans Vercel : "New Project" → importe le repo

# Variables d'environnement à ajouter dans Vercel :
VITE_SUPABASE_URL=        # Settings > API > Project URL
VITE_SUPABASE_ANON_KEY=   # Settings > API > anon public key
ANTHROPIC_API_KEY=         # console.anthropic.com > API Keys
```

### 3. C'est tout !
- L'URL Vercel générée est partageable directement
- Chaque session a un lien unique : `https://ton-app.vercel.app?session=XXXXXX`
- Les picks apparaissent en temps réel chez tous les participants

## Règles du jeu
- 4 joueurs max
- 11 joueurs par équipe (formation libre)
- Max 2 joueurs de la même nationalité
- Un joueur pris est bloqué pour tous
- Claude valide chaque pick (participation CDM 2026)
