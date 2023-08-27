export class Dialect {
    [key: string]: any; // Make the model string indexable, eg  w['surname']

    constructor(
        public id: number = 0,
        public language_id: number = 0, // to be changed later
        public code: string = '',
        public title: string = '',
    ) {}

    public static assign(newDialect: Dialect) {
        const n = Object.assign(new Dialect(), newDialect);

        return n;
    }
}
