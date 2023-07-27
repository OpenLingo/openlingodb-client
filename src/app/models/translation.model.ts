export class Translation {
    [key: string]: any; // Make the model string indexable, eg  w['surname']

    constructor(
        public id: number = 0,
        public from_noun_id: number = 0,
        public to_noun_id: number = 0,
        public accuracy: number = 0
    ) {}

    public static assign(newTranslation: Translation) {
        const n = Object.assign(new Translation(), newTranslation);

        return n;
    }
}
