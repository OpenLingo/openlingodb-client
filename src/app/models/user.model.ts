export class User {
    [key: string]: any; // Make the model string indexable, eg  w['surname']

    constructor(
        public id: number = 0,
        public email: string = '',
        public password: string = '',
        public role: string = '',
        public timezone: string = ''
    ) {}

    public static assign(newUser: User) {
        const n = Object.assign(new User(), newUser);

        return n;
    }
}
