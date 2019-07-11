/* imports */
import {ReadlinePromise} from './util';
const rl = new ReadlinePromise();

import {Collegue, CollegueDto} from './domain';

import Service from './service';
const service = new Service();

/* Presentation */

export default class Presentation {

    // constructeur vide car pas de variable locale
    constructor() {
    }
    
    // methode qui lance un menu
    start() {

        console.log("");
        console.log("** Administration Collegues **");
        console.log("1. Rechercher un collègue par nom");
        console.log("2. Créer un collegue");
        console.log("3. Modifier un collegue");
        console.log("99. Sortir");

        // question a partir du redline de util, qui revoie une promesse
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
                    // pour quitter, on ferme le scanner et on ne relance pas de menu
                    console.log("Au revoir.");
                    rl.close();
                    break;
                default :
                    // en cas de choix inconnu, on relance simplement le menu
                    console.log("Choix inconnu.");
                    this.start();
            }
        });
    } 
    
    // recherche de collegues a partir du nom
    rechercheCollegue() {
        // saisie du nom du collegue
        rl.question("Nom des collegues à rechercher : ")
        // recherche dans la base de donnees
        .then(saisie => {
            console.log(`Recheche des collegues ${saisie} ...`);
            return service.rechercheCollegueParNom(saisie.trim());
        })
        // affichage et relancement d'un menu
        .then((collegues) => {
            console.log(collegues);
            this.start();
        });
    }
    
    //creation de collegue
    creerCollegue(){
        let collegue = new Collegue();

        // renseignement des champs du nouveau collegue
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

            // ajout du collegue dans la bdd
            return service.ajouterCollegue(collegue);
        })
        .then(collegue => {

            // affichage, puis menu
            console.log(collegue);
            this.start();
        })
        .catch(error => {

            // en ca d'erreur on relance le menu
            console.log("Parametre(s) incorrect(s)");
            this.start();
        });
    }
    
    modifierCollegue() {

        let nouveauCollegue = (<CollegueDto>{});
        let matricule:string;

        // recherche de matricule
        rl.question("Matricule du collegue à modifier : ")
        .then(saisie => service.rechercheCollegueParMatricule(saisie.trim()))
        .then(collegue => {
            console.log(collegue);
            matricule = (<string>collegue.matricule);
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
 
