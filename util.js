
const readlineImport = require('readline');

class ReadlinePromise{
    constructor() {
        this.readline = readlineImport.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    question(questionPosee) {
        let readline = this.readline;
        return new Promise(function(resolve, reject) {
            readline.question(questionPosee, function(saisie) {
                resolve(saisie);
            });
        });
    }
    
    
    close() {
        this.readline.close();
    }
}

exports.ReadlinePromise = ReadlinePromise;