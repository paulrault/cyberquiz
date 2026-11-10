# CyberQuiz

Petit quiz interactif en français sur les réseaux, les systèmes, la cybersécurité et l'informatique générale.

## Fichiers
- `index.html` : structure de la page
- `style.css` : design bleu nuit et bleu clair
- `script.js` : questions, réponses, score et navigation

## Lancer en local
Ouvrir `index.html` dans un navigateur. Aucun serveur ni dépendance n'est nécessaire.

## Publier avec GitHub Pages
1. Créer un dépôt GitHub nommé `cyberquiz` (ou un autre nom).
2. Ajouter les trois fichiers `index.html`, `style.css` et `script.js` à la racine du dépôt.
3. Ouvrir **Settings > Pages**.
4. Dans **Build and deployment**, choisir **Deploy from a branch**.
5. Choisir la branche `main` et le dossier `/ (root)`, puis enregistrer.
6. Attendre la publication : l'adresse sera du type `https://TON-PSEUDO.github.io/cyberquiz/`.

## Personnaliser
Les questions sont dans le tableau `questions` au début de `script.js`. Chaque question contient une catégorie, un énoncé, quatre réponses, l'index de la bonne réponse (en commençant à 0) et une explication.
