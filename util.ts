
import * as readlineImport from 'readline';

export class ReadlinePromise{
    readline: readlineImport.Interface;
    constructor() {
        this.readline = readlineImport.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    question(questionPosee: string):Promise<string> {
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