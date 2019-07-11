
import {Collegue, CollegueDto} from './domain';
import request from 'request-promise-native';




export default class Service {
    constructor() {
    }

    rechercheCollegueParNom (nomRecherche:string) :Promise<Collegue[]> {
        return request(`https://glen-collegue-api.herokuapp.com/collegues?nom=${nomRecherche}`, {json:true})
        .then(matricules => { 
            return Promise.all(matricules.map((matricule: string) => this.rechercheCollegueParMatricule(matricule)))
        });
    }

    rechercheCollegueParMatricule (matricule:string) :Promise<Collegue> {
        return request(`https://glen-collegue-api.herokuapp.com/collegues/${matricule}`, {json:true})
        .then(Collegue.promiseCollegue);
    }

    ajouterCollegue (collegue:Collegue) :Promise<Collegue> {
        return request(`https://glen-collegue-api.herokuapp.com/collegues`, {json:true, method:"POST", body:collegue})
        .then(Collegue.promiseCollegue);
    }

    updateCollegue (matricule:string, collegue:CollegueDto) :Promise<Collegue> {
        return request(`https://glen-collegue-api.herokuapp.com/collegues/${matricule}`, {json:true, method:"PATCH", body:collegue})
        .then(Collegue.promiseCollegue);
    }
}