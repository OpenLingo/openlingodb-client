export class Noun {
    [key: string]: any; // Make the model string indexable, eg  w['surname']

    constructor(
        public id: number = 0,
        public language_id: number = 0,
        public level_id: number = 0,
        public gender: string = '',
        public word: string = ''
    ) {}

    public static assign(newNoun: Noun) {
        const n = Object.assign(new Noun(), newNoun);

        return n;
    }
}
