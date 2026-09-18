const prompt = require("prompt-sync")();

const apprenants = [
    {
        id: 1,
        nomComplet: "Sara Dev",
        ville: "Nador",
        resultats: [
            { jour: 1, exercicesTermines: 18,
                totalExercices: 20, challengeTermine: true },
            { jour: 2, exercicesTermines: 14,
                totalExercices: 20, challengeTermine: false }
            ]
    },
    {
        id: 2,
        nomComplet: "Yassine Code",
        ville: "Oujda",
        resultats: [
            { jour: 1, exercicesTermines: 12,
                totalExercices: 20, challengeTermine: false }
            ]
    }
];

console.log("SAS PROGRESS CONSOLE");
console.log("1. Afficher le tableau de bord");
console.log("2. Afficher la liste des apprenants");
console.log("3. Ajouter un apprenant");
console.log("4. Consulter un apprenant par identifiant");
console.log("5. Ajouter ou modifier le résultat d'une journée");
console.log("6. Rechercher un apprenant par nom");
console.log("7. Filtrer les apprenants par niveau");
console.log("8. Trier les apprenants par progression décroissante");
console.log("9. Trier les apprenants par ordre alphabétique");
console.log("0. Quitter");

let choix;
do{
    choix = Number(prompt("votre choix: "));
    switch(choix){
        case 1:
            console.log("1. Afficher le tableau de bord");
            break;
        case 2:
            console.log("2. Afficher la liste des apprenants");
            break;
        case 3:
            console.log("3. Ajouter un apprenant");
            console.log(ajouterApprenant());
            break;
        case 4:
            console.log("4. Consulter un apprenant par identifiant");
            break;
        case 5:
            console.log("5. Ajouter ou modifier le résultat d'une journée");
            break;
        case 6:
            console.log("6. Rechercher un apprenant par nom");
            break;
        case 7:
            console.log("7. Filtrer les apprenants par niveau");
            break;
        case 8:
            console.log("8. Trier les apprenants par progression décroissante");
            break;
        case 9:
            console.log("9. Trier les apprenants par ordre alphabétique");
            break;
        case 0:
            console.log("0. Quitter");
            break;
        default:
            console.log("entrer un nomber entre 0 et 9");
            break;
    }

}while(choix !== 0);

// fonction normaiser des nom

function normaliserNom(nom){
    nom = nom.toLowerCase();
    nom = nom.trim();
    nom = nom.split(" ")
    let nomComplet = "";
    let coump = 1;
    for(let i = 0; i < nom.length; i++){
        if(nom[i] === "" && coump == 1) {
            nomComplet += " "
            coump++;
        }
        if(nom[i] !== ""){
            nomComplet += nom[i]
        }

    }
    return nomComplet;
}


// fanction valider des resultat

function validerResultat(jour, exercicesTermines, totalExercices) {
    if (jour < 1 || jour > 7) {
        return false;
    }
    
    if (totalExercices !== 20) {
        return false;
    }
    
    if (exercicesTermines < 0 || exercicesTermines > totalExercices) {
        return false;
    }
    
    return true;
}

//fonction qui ajouter apprenent

function ajouterApprenant(id, nom, ville){
    id = Number(prompt("Enter votre id: "));
    for(let i = 0; i < apprenants.length; i++){
        while(apprenants[i].id === id){
            id = Number(prompt("Enter nouveau id: "))
        }
    }
   
    nomComplet = prompt("Enter votre nom complet: ");
    ville = prompt("Enter votre ville: ");
    let newApprenant = {
        id: id,
        nomComplet: normaliserNom(nom),
        ville: normaliserNom(ville),
        resultats: []
    }
    apprenants.push(newApprenant);
    return newApprenant;
}

//fonction qui enregistrer resultat

function enregistrerResultat(id, jour, exercicesTermines, totalExercices) {
    // verification des ID
    let appTrouve;
    for(let i = 0; i < apprenants.length;i++){
        if(apprenants[i].id === id){
            appTrouve = apprenants[i];
            break;
        }
    }
    if(appTrouve == null){
        console.log("appreant non Trouve");
    }

    // verification des jour

    let verifieJour = validerResultat(jour, exercicesTermines, totalExercices);
    if(!(verifieJour)){
        console.log("les donne sont valide");
        return;
    }
    let resultatDeJour = null;
    for(let i = 0; apprenants.resultats.length; i++){
        if(appTrouve.resultats[i].jour == jour){
            resultatDeJour = appTrouve.resultats[i];
            break;
        }
    }
    if(resultatDeJour !== null){
        resultatDeJour.exercicesTermines = exercicesTermines;
        resultatDeJour.totalExercices = totalExercices;
        console.log("Mettre à jour une journée");
    }
    else
    {
        apprenants.resultats.push({
            jour: jour,
            exercicesTermines: exercicesTermines,
            totalExercices: totalExercices,
            challengeTermine: challengeTermine
        })
        console.log("Jour ajoute")
    }
}

// fonctoin des calculer progression

function calculerProgression(appreant){
    let result = appreant.resultats[i];
    let totalExercice = 0;
    let totalProgrcice = 0;
    let coumptChallenge = 0;
    let joursRs = appreant.resultats.length;
    if(result.challengeTermine){
        coumptChallenge++;
    }

    let progress;
    if(totalProgrcice != 0){
        progress = ((totalExercice / totalProgrcice) * 100);
        progress = Number(progress.toFixed(2));
    }
    return{
        exercicesTermine: exercicesTermine,
        totalProgrcice: totalProgrcice,
        challengeTermine: coumptChallenge,
        joursRs: joursRs
    }
}