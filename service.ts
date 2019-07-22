
import { Collegue, CollegueDto } from './domain';
import baseRequest from 'request-promise-native';

const request = baseRequest.defaults({ jar: true});

const BASE_URL = "https://glen-collegue-api.herokuapp.com";


export default class Service {
  constructor() {
  }

  rechercheCollegueParNom(nomRecherche: string): Promise<Collegue[]> {
    return request(`${BASE_URL}/collegues?nom=${nomRecherche}`, { json: true })
      .then(matricules => {
        if (matricules.length === 0 || matricules.length === undefined) {
          return new Promise((resolve, reject) => {
            reject("aucun collègue avec le nom spécifié");
          });
        } else {
          return Promise.all(matricules.map((matricule: string) => this.rechercheCollegueParMatricule(matricule)));
        }
      });
  }

  rechercheCollegueParMatricule(matricule: string): Promise<Collegue> {
    return request(`${BASE_URL}/collegues/${matricule}`, { json: true })
      .then(Collegue.promiseCollegue);
  }

  ajouterCollegue(collegue: Collegue): Promise<Collegue> {
    return request(`${BASE_URL}/collegues`, { json: true, method: "POST", body: collegue })
      .then(Collegue.promiseCollegue);
  }

  updateCollegue(matricule: string, collegue: CollegueDto): Promise<Collegue> {
    return request(`${BASE_URL}/collegues/${matricule}`, { json: true, method: "PATCH", body: collegue })
      .then(Collegue.promiseCollegue);
  }

  login(username: string, password: string) {
    return request(`${BASE_URL}/auth`, { json: true, method: "POST", body: { "username": username, "password": password } });
  }
}