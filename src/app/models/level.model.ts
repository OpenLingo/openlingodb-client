export class Level {
    [key: string]: any; // Make the model string indexable, eg  w['surname']

    constructor(
        public id: number = 0,
        public language_id: number = 0,
        public code: string = '',
        public title: string = ''
    ) {} // TODO: add level service

    public static assign(newLevel: Level) {
        const n = Object.assign(new Level(), newLevel);

        return n;
    }
}
