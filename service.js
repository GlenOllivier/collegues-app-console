var request = require('request');

var nbUnfinishedProcess;
var collegues;

rechercheCollegueParNom = function (nomRecherche, callback) {
    request(`https://glen-collegue-api.herokuapp.com/collegues?nom=${nomRecherche}`, {json:true}, function(err, res, body) {
        
        if (body.length > 0) {
            nbUnfinishedProcess = body.length;
            collegues = [];
            body.forEach(matricule => {
                rechercheCollegueParMatriculeApresNom(matricule, callback);
            });
        } else {
            callback(body);
        }
    });
}

rechercheCollegueParMatriculeApresNom = function (matricule, callback) {
    request(`https://glen-collegue-api.herokuapp.com/collegues/${matricule}`, {json:true}, function(err, res, body) {
        collegues.push(body);
        var count =  --nbUnfinishedProcess;
        if(count === 0) {
            callback(collegues);
        }
    });
}

ajouterCollegue = function(collegue, callback) {
    request(`https://glen-collegue-api.herokuapp.com/collegues`, {json:true, method:"POST", body:collegue}, function(err, res, body) {
        callback(body);
    });
}

rechercheCollegueParMatricule = function (matricule, callback) {
    request(`https://glen-collegue-api.herokuapp.com/collegues/${matricule}`, {json:true}, function(err, res, body) {

        callback(body);
    });
}

updateCollegue = function(matricule, collegue, callback) {
    request(`https://glen-collegue-api.herokuapp.com/collegues/${matricule}`, {json:true, method:"PATCH", body:collegue}, function(err, res, body) {
        callback(body);
    });
}

exports.rechercheCollegueParNom = rechercheCollegueParNom;
exports.ajouterCollegue = ajouterCollegue;
exports.rechercheCollegueParMatricule = rechercheCollegueParMatricule;
exports.updateCollegue = updateCollegue;