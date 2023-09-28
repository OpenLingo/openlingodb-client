import {Dialect} from "./dialect.model";

export class Language {
    [key: string]: any; // Make the model string indexable, eg  w['surname']

    constructor(
        public id: number = 0,
        public code: string = '',
        public title: string = '',
        public is_gendered: boolean = false,
        public dialects: Dialect | null = null
    ) {}

    public static assign(newLanguage: Language) {
        const n = Object.assign(new Language(), newLanguage);

        return n;
    }
}
