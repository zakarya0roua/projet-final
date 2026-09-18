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
            // Afficher le tableau de bord
            afficherTableauDeBord();
            break;
        case 2:
            // Afficher la liste des apprenants
            for(let i = 0; i < apprenants.length; i++){
               console.log(apprenants[i]);
            }
            break;
        case 3:
            // Ajouter un apprenant
            let id_new = Number(prompt("Entre votre ID: "));
            let nomComplet_new = prompt("Entre le nom complet: ");
            let ville_new = prompt("Entre le ville: ")
            console.log(ajouterApprenant(id_new, nomComplet_new, ville_new));
            break;
        case 4:
            // Consulter un apprenant par identifiant
            let ID_rechercher = Number(prompt("Entre id pour rechercher: "))
            console.log(rechercherApprenant(ID_rechercher));
            break;
        case 5:
            // Ajouter ou modifier le résultat d'une journée
            let idRes = Number(prompt("Entre ID pour result: "))
            let jourRes = Number(prompt("Entre jour pour result: "))
            let exercicesRes = Number(prompt("Entre exrecices pour result: "))
            let totalRes = Number(prompt("Entre total des exercice pour result: "))
            let challengeRes = prompt("Entre challenge complet oui/non " ) === "oui";
            enregistrerResultat(idRes, jourRes, exercicesRes, totalRes, challengeRes)
            break;
        case 6:
            // Rechercher un apprenant par nom
            let nom_recherche = prompt("Entre nom pour recherche: ")
            console.log(rechercherApprenant(nom_recherche));
            break;
        case 7:
            // Filtrer les apprenants par niveau
            let filtration = prompt("Entre le niveau (Solide/ En progression/ À renforcer)")
            console.log(filtrerParNiveau(filtration));
            break;
        case 8:
            // Trier les apprenants par progression décroissante
            console.log(trierParProgression());
            break;
        case 9:
            // Trier les apprenants par ordre alphabétique
            console.log("9. Trier les apprenants par ordre alphabétique");
            break;
        case 0:
            // pour quitter code
            console.log("0. Quitter");
            break;
        default:
            // pour verifier nomber
            console.log("entrer un nomber entre 0 et 9");
            break;
    }

}while(choix !== 0);

// fonction normaiser des nom

function normaliserNom(nom){
    nom = nom.toLowerCase();
    nom = nom.trim();
    nom = nom.split(" ");
    let nomComplet = [];

    for(let i = 0; i < nom.length; i++){
        if(nom[i] === ""){
            continue;
        }
        let motMajuscule = nom[i][0].toUpperCase() + nom[i].slice(1);
        nomComplet.push(motMajuscule);
    }
    
    return nomComplet.join(" ");
}

// fanction valider des resultat

function validerResultat(jour, exercicesTermines, totalExercices, challengeTermine) {
    let data = {}
    if(jour >= 1 && jour <= 7){
        data.jour = jour;
    }else
        return undefined;

    if(exercicesTermines <= totalExercices && exercicesTermines >= 0){
        data.exercicesTermines = exercicesTermines;
        data.totalExercices = totalExercices;
    }else
        return undefined;

    if((challengeTermine === true) || (challengeTermine === false)){
        data.challengeTermine = challengeTermine;
    }else
        return undefined;

    return data;
}

//fonction qui ajouter apprenent

function ajouterApprenant(id, nomComplet, ville){
    for(let i = 0; i < apprenants.length; i++){
        if(id === apprenants[i].id){
            return ("id est existant")
        }
    }

    let newApprrenant = {
        id: id,
        nomComplet: normaliserNom(nomComplet),
        ville: normaliserNom(ville),
        resultats: []
    }

    apprenants.push(newApprrenant);
    return newApprrenant;

}

//fonction qui enregistrer resultat


function enregistrerResultat(id, jour, exercicesTermines, totalExercices, challengeTermine){
    let appTrouve = null;
    let new_objet = {};

    for(let i = 0; i < apprenants.length; i++){
        if(apprenants[i].id === id){
            appTrouve = apprenants[i];
            break;
        }
    }
    
    if(appTrouve == null){
        console.log("Apprenant non trouve");
        return;
    }
    
    if(!(validerResultat(jour, exercicesTermines, totalExercices, challengeTermine))){
        return ("Erreur: validation de resultat");
    }
    
    let resultatDeJour = null;
    for(let i = 0; i < appTrouve.resultats.length; i++){
        if(appTrouve.resultats[i].jour === jour){
            resultatDeJour = appTrouve.resultats[i];
            break;
        }
    }

    if(resultatDeJour !== null){
        resultatDeJour.exercicesTermines = exercicesTermines;
        resultatDeJour.totalExercices = totalExercices;
        resultatDeJour.challengeTermine = challengeTermine;
        console.log("Mise à jour de la journee");
    }
    else {
        appTrouve.resultats.push({
            jour: jour,
            exercicesTermines: exercicesTermines,
            totalExercices: totalExercices,
            challengeTermine: challengeTermine
        });
        console.log("Journee ajoutee");
    }
    return appTrouve;
    
}


// fonctoin des calculer progression

function calculerProgression(appreant){
    let exercicesTer = 0;
    let totalEX = 0;
    let coumptChallenge = 0;

    for(let i = 0; i < appreant.resultats.length; i++){
        exercicesTer += appreant.resultats[i].exercicesTermines;
        totalEX += appreant.resultats[i].totalExercices;
        if(appreant.resultats[i].challengeTermine){
            coumptChallenge++;
        }
    }

    let progress = 0;
    if(totalEX != 0){
        progress = (exercicesTer / totalEX) * 100;
        progress = Number(progress.toFixed(2));
    }

    let joursR = appreant.resultats.length;

    return {
        exercicesTermine: exercicesTer,
        totalExercice: totalEX,
        progress: progress,
        challengeTermine: coumptChallenge,
        joursRs: joursR
    };
}

// fonction rechercher apprenant

function rechercherApprenant(rechercher){
    if(typeof rechercher === "string"){
        rechercher = normaliserNom(rechercher)
    }

    for(let i = 0; i < apprenants.length; i++){
        if((apprenants[i].nomComplet.includes(rechercher)) || apprenants[i].id === rechercher){
            return apprenants[i];
        }
    }
    return null;

}

// fonction filtrer par niveau

function filtrerParNiveau(niveau){
    let result = [];
    let niveauApprenant;

    for(let i = 0; i < apprenants.length; i++){
        let calculer = calculerProgression(apprenants[i]);
        if(calculer.progress >= 80){
            niveauApprenant = "Solide";
        }else if(calculer.progress >= 50){
            niveauApprenant = "En progression";
        }else
            niveauApprenant = "À renforcer";
        if(niveauApprenant === niveau){
            result.push(apprenants[i])
        }
    }

    return result
}

// fonction trier par progression

function trierParProgression(){
    for(let i = 0; i < apprenants.length; i++){
        for(let j = 0; j < apprenants.length - 1; j++){
            let progress1 = calculerProgression(apprenants[j]).progress;
            let progress2 = calculerProgression(apprenants[j + 1]).progress;

            if(progress1 < progress2){
                let temp = apprenants[j];
                apprenants[j] = apprenants[j + 1];
                apprenants[j + 1] = temp;
            }
        }
    }

    return apprenants;
}

// fonction qui afficher tableau de bord

function afficherTableauDeBord(){
    let lenApp = apprenants.length;
    let totalProgress = 0;
    let moyenne;

    console.log("Nomber d'apprenants: " + lenApp)
    for(let i = 0; i < apprenants.length; i++){
        totalProgress += calculerProgression(apprenants[i]).progress;
    }
    if(lenApp !== 0){
        moyenne = totalProgress / lenApp;
        moyenne = moyenne.toFixed(2)
    }
    console.log("Progression moyenne: " + moyenne + "%");


    let nbSolide = filtrerParNiveau("Solide").length;
    let nbEn_progression = filtrerParNiveau("En progression").length;
    let nbA_renforcer = filtrerParNiveau("À renforcer").length;

    console.log("Solide: " + nbSolide);
    console.log("En progresion: " + nbEn_progression);
    console.log("À renforcer: " + nbA_renforcer);

}


