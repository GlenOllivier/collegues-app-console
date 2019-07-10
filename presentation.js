/* imports */
var readline = require('readline');
var service = require('./service.js');

/* content */

var choix = null;


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var start = function() {
    

    console.log("1. Rechercher un collègue par nom");
    console.log("2. Créer un collegue");
    console.log("3. Modifier un collegue");
    console.log("99. Sortir");


    rl.question("Votre choix : ", function(saisie){
    
        switch(saisie) {
            case '1' :
                rechercheCollegue();
                break;
            case '2' :
                creerCollegue();
                break;
            case '3' :
                modifierCollegue1();
                break;
            case '99' :
                console.log("Au revoir.");
                rl.close();
                break;
            default :
                console.log("Choix inconnu.");
                start();
        }
    });
} 

var rechercheCollegue = function() {
    rl.question("Nom des collegues à rechercher : ", function(saisie) {
        console.log(`Recheche des collegues ${saisie} ...`);
        service.rechercheCollegueParNom(saisie.trim(), function(collegues) {
            console.log(collegues);
            start();
        });
    });
}

var creerCollegue = function() {
    rl.question("Nom du collegue à ajouter : ", function(saisie) {
        var collegue = {};
        collegue.lastName = saisie.trim();
        rl.question("Prenom du collegue : ", function(saisie) {
            collegue.firstName = saisie.trim();
            rl.question("Email du collegue : ", function(saisie) {
                collegue.email = saisie.trim();
                rl.question("Photo du collegue : ", function(saisie) {
                    collegue.pictureUrl = saisie.trim();
                    rl.question("Date de naissance : ", function(saisie) {
                        collegue.birthDate = saisie.trim();
                        service.ajouterCollegue(collegue, function(collegue) {
                            console.log(collegue);
                            start();
                        });
                    })
                });
            });
        });
    });
    
}

var modifierCollegue1 = function() {
    rl.question("Matricule du collegue modifier : ", function(saisie) {
        service.rechercheCollegueParMatricule(saisie.trim(), function(collegue) {
            console.log(collegue);
            if(collegue.matricule == undefined) {
                start();
            } else {
                modifierCollegue2(collegue);
            }
        });
    });
}

var modifierCollegue2 = function(collegue) {
    var nouveauCollegue = {};
    rl.question("Nouvel email (ne rien saisir pour ne pas modifier) : ", function(saisie) {
        if (saisie.trim() != "") {
            nouveauCollegue.email = saisie.trim();
        }
        rl.question("Nouvel image (ne rien saisir pour ne pas modifier) : ", function(saisie) {
            if (saisie.trim() != "") {
                nouveauCollegue.pictureUrl = saisie.trim();
            }
            service.updateCollegue(collegue.matricule, nouveauCollegue, function(collegue) {
                console.log(collegue);
                start();
            });
        });
    });
}

/* exports */
exports.start = start;