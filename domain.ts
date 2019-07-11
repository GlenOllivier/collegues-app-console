
export class Collegue {
    constructor(public matricule?:string,
        public lastName?:string,
        public firstName?:string,
        public email?:string,
        public pictureUrl?:string,
        public birthDate?:string
    ) {
    }

    public static toCollegue(object:any) :Collegue {
        return new Collegue(
            object.matricule,
            object.lastName,
            object.firstName,
            object.email,
            object.pictureUrl,
            object.birthDate
        );
    }

    public static promiseCollegue(object:any) :Promise<Collegue> {
        return new Promise((resolve, reject)=>resolve(
            Collegue.toCollegue(object)
        ));
    } 
}

export class CollegueDto {
    public email:string = "";
    public pictureUrl:string = "";
}