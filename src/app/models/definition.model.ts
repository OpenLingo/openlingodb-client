export class Definition {
    [key: string]: any; // Make the model string indexable, eg  w['surname']

    constructor(
        public id: number = 0,
        public dialect_id: number = 0, // to be changed later
        public noun_id: number = 0,
        public text: string = '',
    ) {}

    public static assign(newDefinition: Definition) {
        const n = Object.assign(new Definition(), newDefinition);

        return n;
    }
}
