/* imports */

const rl = new (require('./util.js').ReadlinePromise)();
const service = new (require('./service.js').Service)();

class Presentation {
    constructor() {
    }
    
    start() {
    
        console.log("1. Rechercher un collègue par nom");
        console.log("2. Créer un collegue");
        console.log("3. Modifier un collegue");
        console.log("99. Sortir");

        rl.question("Votre choix : ")
        .then(saisie => {
        
            switch(saisie) {
                case '1' :
                    this.rechercheCollegue();
                    break;
                case '2' :
                    this.creerCollegue();
                    break;
                case '3' :
                    this.modifierCollegue();
                    break;
                case '99' :
                    console.log("Au revoir.");
                    rl.close();
                    break;
                default :
                    console.log("Choix inconnu.");
                    this.start();
            }
        });
    } 
    
    rechercheCollegue() {
        rl.question("Nom des collegues à rechercher : ")
        .then(saisie => {
            console.log(`Recheche des collegues ${saisie} ...`);
            return service.rechercheCollegueParNom(saisie.trim());
        })
        .then((collegues) => {
            console.log(collegues);
            this.start();
        });
    }
    
    creerCollegue(){
        let collegue = {};
        rl.question("Nom du collegue à ajouter : ")
        .then(saisie => {
            collegue.lastName = saisie.trim();
            return rl.question("Prenom du collegue : ");
        })
        .then(saisie => {
            collegue.firstName = saisie.trim();
            return rl.question("Email du collegue : ");
        })
        .then(saisie => {
            collegue.email = saisie.trim();
            return rl.question("Photo du collegue : ");
        })
        .then(saisie => {
            collegue.pictureUrl = saisie.trim();
            return rl.question("Date de naissance : ");
        })
        .then (saisie => {
            collegue.birthDate = saisie.trim();
            return service.ajouterCollegue(collegue);
        })
        .then(collegue => {
            console.log(collegue);
            this.start();
        })
        .catch(error => {
            console.log("Parametre(s) incorrect(s)");
            this.start();
        });
    }
    
    modifierCollegue() {

        let nouveauCollegue = {};
        let matricule;
        rl.question("Matricule du collegue modifier : ")
        .then(saisie => service.rechercheCollegueParMatricule(saisie.trim()))
        .then(collegue => {
            console.log(collegue);
            matricule = collegue.matricule;
            return rl.question("Nouvel email (ne rien saisir pour ne pas modifier) : ");
        })
        .then (saisie => {
            if (saisie.trim() != "") {
                nouveauCollegue.email = saisie.trim();
            }
            return rl.question("Nouvel image (ne rien saisir pour ne pas modifier) : ");
        })
        .then (saisie => {
            if (saisie.trim() != "") {
                nouveauCollegue.pictureUrl = saisie.trim();
            }
            return service.updateCollegue(matricule, nouveauCollegue);
        })
        .then (collegue => {
            console.log(collegue);
            this.start();
        })
        .catch(error => {
            console.log(error.error);
            this.start();
        });
    }
}




/* exports */
exports.Presentation = Presentation;
 