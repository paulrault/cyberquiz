# CyberQuiz — Version 2.0

Quiz interactif en français sur les réseaux, les systèmes, la cybersécurité et l'informatique générale.

## Nouveautés
- 32 questions au total (8 par catégorie).
- Questions mélangées à chaque nouvelle partie.
- Choix d'une catégorie ou mode toutes catégories.
- Correction immédiate avec explication.
- Score final et possibilité de recommencer.

## Fichiers
- `index.html` : structure
- `style.css` : design bleu nuit et bleu clair
- `script.js` : questions et fonctionnement

## Lancer en local
Ouvrir `index.html` dans un navigateur. Aucune dépendance n'est nécessaire.

## Mettre à jour GitHub Pages
Remplacer les fichiers du dépôt par ceux de cette version, en conservant les trois fichiers à la racine. GitHub Pages republiera le site automatiquement.

## Ajouter une question
Ajouter un objet dans le tableau `questions` au début de `script.js`. Les catégories disponibles sont `Réseaux`, `Systèmes`, `Cybersécurité` et `Informatique générale`. `correct` correspond à l'index de la bonne réponse (de 0 à 3).
