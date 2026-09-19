# SAS Progress Console

Application console en javaScript (Node.js) pour suivre la progression d'apprenants: exercices faits, challenges reussis, niveau.

# Lancer le programme

    node nom_projet.js

# Le menu 

1. Tableau de bord.
2. Liste des apprenants.
3. Ajouter un apprenant.
4. Chercher un appremant.
5. Ajouter ou modifier le resultat d'un jour.
6. Chercher un apprenant par nom.
7. Filtrer par niveau.
8. Trier par progression.
9. Trier par ordre alphabetique.
10. Quitter.

# Comment la progression est calculee

progression = (exercices faits / exercices proposee) * 100.

Niveaux: Solide >= 80% / En progression 50-79% / A renforver < 50%.

# Tests faits

1. Ajouter un appreant --> ajoute correctement.
2. Ajouter avec un id deja utilise --> refuse.
3. Modifier le resultat d'un jour qui existe --> mis a jour, pas de doublon.
4. Resultat invalide --> refuse.
5. Chercher un nom en majuscules ou minuscules --> trouve quand meme.
6. Trier par progression et par ordre alphabetique --> ordre correct.
