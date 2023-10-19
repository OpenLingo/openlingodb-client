export class User_language {
    [key: string]: any; // Make the model string indexable, eg  w['surname']

    constructor(
        public id: number = 0,
        public dialect_id: number = 0,
        public level_id: number = 0,
        public user_id: number = 0,
        public qual_level: string = ''
    ) {}

    public static assign(newUserLanguage: User_language) {
        const n = Object.assign(new User_language(), newUserLanguage);

        return n;
    }
}
