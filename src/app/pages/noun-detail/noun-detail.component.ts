import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from "rxjs";
import { FormControl } from "@angular/forms";
import { Location } from '@angular/common';

import { Definition } from "../../models/definition.model";
import { Dialect } from "../../models/dialect.model";
import { Language } from "../../models/language.model";
import { Noun } from '../../models/noun.model';
import { Translation } from "../../models/translation.model";

import { DefinitionService } from "../../services/definition.service";
import { DialectService } from "../../services/dialect.service";
import { NounService } from '../../services/noun.service';
import { LanguageService } from "../../services/language.service";
import { TranslationService } from "../../services/translation.service";

@Component({
    selector: 'app-noun-detail',
    templateUrl: './noun-detail.component.html',
    styleUrls: ['./noun-detail.component.css']
})

export class NounDetailComponent implements OnInit {

    // Variables related to the selected noun
    noun: Noun | null = null; // ask about variables in typescript.
    nouns: Noun[] | undefined
    translations: Translation[] | null = null;

    // variables related to translations
    language: Language | undefined;
    languages: Language[] | undefined;
    newTranslationID: number | undefined;
    nounSearchFormControl = new FormControl <string | Noun>('');
    search_term: string = '';

    // variables related to definitions
    definition_form_control = new FormControl <number[] | null>(null);
    definition_text_form_control = new FormControl <string>('');
    definitions: Definition[] | undefined;
    dialects: Dialect[] | undefined;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private definitionService: DefinitionService,
        private dialectService: DialectService,
        private languageService: LanguageService,
        public nounService: NounService,
        private translationService: TranslationService,
    ){}
    ngOnInit(): void {
        this.getNoun();
        this.getLanguages();
    }
    filterNouns(): void {
        this.searchNouns(this.nounSearchFormControl.value as string);
    }
    searchNouns(search_term: string): void {
        if (search_term != '') {
            this.nounService.searchNoun(search_term)
                .subscribe(incoming_nouns => {
                    this.nouns = incoming_nouns
                });
        } else {
            this.nouns = undefined;
        }
    }
    getNoun(): void {
        const id = +this.route.snapshot.paramMap.get('id')!;

        this.nounService.getNoun(id)
            .subscribe(incoming_noun => {
                this.noun = incoming_noun;
                // Interpreter refuses to let me call these function in ngOnInit for some reason.
                this.getLanguage(incoming_noun);
                this.getTranslations(incoming_noun);
                this.getDefinitions(incoming_noun);
                this.getDialects(incoming_noun);
            });
    }
    getLanguage(noun: Noun): void {
        this.languageService.getLanguage(noun.language_id)
            .subscribe(incoming_language => {
                this.language = incoming_language;
            })
    }
    getLanguages(): void {
        this.languageService.getLanguages().subscribe(incoming_languages => {
            this.languages = incoming_languages;
        })
    }
    getTranslations(noun: Noun): void {
        this.translationService.getTranslations(noun)
            .subscribe(incoming_translations => {
                this.translations = incoming_translations;
            })
    }
    addTranslation(): void {
        if (this.noun && this.newTranslationID) {
            let translation: Translation = new Translation(
                0,
                this.noun.id,
                this.newTranslationID,
                100
            );
            this.translationService.insertTranslation(translation).subscribe(_ => {
                if (this.noun) {
                    this.getTranslations(this.noun)
                }
            })
        }
        this.search_term = '';
        this.nouns = undefined;
    }
    removeTranslation(translationID?: number, nounID?: number): void {
        this.translationService.deleteTranslation(translationID!, nounID!)
            .subscribe(_ => {
                if (this.noun) {
                    this.getTranslations(this.noun);
                }
            });
    }
    addDefinition(): void {
        let definition_dialects: number[];

        if (this.definition_form_control.value) {
            definition_dialects = this.definition_form_control.value;
        } else {
            return;
        }
        if (this.definition_text_form_control.value && this.definition_text_form_control.value != '') {
            let definition_text = this.definition_text_form_control.value;
            definition_dialects.forEach(dialect_id => {
                this.definitionService.insertDefinition(
                    new Definition(0, dialect_id, this.noun?.id, definition_text)
                ).subscribe(_ => {
                    if (this.noun) {
                        this.getDefinitions(this.noun)
                    }
                });
            });
        }
    }
    removeDefinition(definitionID: number): void {
        this.definitionService.deleteDefinition(definitionID)
            .subscribe(_ => {
                if (this.noun) {
                    this.getDefinitions(this.noun);
                }
            })

    }
    getDefinitions(noun: Noun): void {
        this.definitionService.getDefinitions(noun.id).subscribe(incoming_definitions => {
            this.definitions = incoming_definitions;
        });
    }
    getDialects(noun: Noun): void {
        this.dialectService.getDialectsByLanguage(noun.language_id).subscribe(incoming_dialects => {
            this.dialects = incoming_dialects;
        })
    }
    getDialect(dialect_id: number): Dialect {
        let dialect: Dialect = new Dialect();
        this.dialectService.getDialectByID(dialect_id).subscribe(incoming_dialect => {
            dialect = incoming_dialect
        });
        return dialect;
    }
}
