# désert·à·mer — météo de marche (PWA)

Petite app météo autonome pour le trek Islande. Position GPS + aujourd'hui et les 2 jours
suivants, avec verdict de marche basé sur les rafales. Données Open-Meteo (sans clé API).
Installable sur l'écran d'accueil, et s'ouvre **hors-ligne** en gardant la dernière météo connue.

## Déployer sur Vercel 

### Option A — en ligne de commande (le plus rapide)
```bash
npm i -g vercel      # si pas déjà installé
cd meteo-trek
vercel               # suivre les prompts -> URL de preview
vercel --prod        # passer en production
```

### Option B — drag & drop
1. Va sur https://vercel.com/new
2. Glisse le dossier `meteo-trek` (ou connecte un repo GitHub qui le contient)
3. Aucun build à configurer : c'est un site statique. Deploy.

## Tester en local
```bash
cd meteo-trek
npx serve .          # puis ouvrir l'URL affichée
```
> Le service worker et la géoloc exigent **HTTPS** (ou localhost). En prod Vercel, HTTPS est automatique.

## Installer sur le téléphone
- **Android / Chrome** : ouvre l'URL -> bouton « Installer » en haut, ou menu ⋮ -> « Ajouter à l'écran d'accueil ».
- **iOS / Safari** : Partager -> « Sur l'écran d'accueil ».

## Fichiers
- `index.html` — l'app (HTML/CSS/JS, un seul fichier)
- `manifest.webmanifest` — métadonnées PWA
- `sw.js` — service worker (cache le shell pour l'ouverture hors-ligne)
- `icon-*.png`, `apple-touch-icon.png`, `favicon-32.png` — icônes
- `vercel.json` — en-têtes (SW + manifest)
