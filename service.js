
class Service {
    constructor() {
        this.request = require('request-promise-native');
    }

    rechercheCollegueParNom = function (nomRecherche) {
        let service = this;
        return this.request(`https://glen-collegue-api.herokuapp.com/collegues?nom=${nomRecherche}`, {json:true})
        .then(matricules => { 
            return Promise.all(matricules.map(matricule => service.rechercheCollegueParMatricule(matricule)))
        });
    }

    rechercheCollegueParMatricule = function (matricule) {
        return this.request(`https://glen-collegue-api.herokuapp.com/collegues/${matricule}`, {json:true});
    }

    ajouterCollegue = function(collegue) {
        return this.request(`https://glen-collegue-api.herokuapp.com/collegues`, {json:true, method:"POST", body:collegue});
    }

    updateCollegue = function(matricule, collegue) {
        return this.request(`https://glen-collegue-api.herokuapp.com/collegues/${matricule}`, {json:true, method:"PATCH", body:collegue});
    }
}

exports.Service = Service;