import { Component, OnInit } from '@angular/core';
import { Noun } from '../../models/noun.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NounService } from '../../services/noun.service';
import { Language } from "../../models/language.model";
import { LanguageService } from "../../services/language.service";
import { Translation } from "../../models/translation.model";
import { TranslationService } from "../../services/translation.service";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {filter, map, Observable, startWith} from "rxjs";

@Component({
    selector: 'app-noun-detail',
    templateUrl: './noun-detail.component.html',
    styleUrls: ['./noun-detail.component.css']
})

export class NounDetailComponent implements OnInit {
    myControl = new FormControl <string | Noun>('');

    noun: Noun | undefined; // ask about variables in typescript.
    nouns: Noun[] | undefined;

    language: Language | undefined;

    search_term: string = '';

    translations: Translation[] | undefined;
    newTranslationID: string = '';

    constructor(
        private route: ActivatedRoute,
        public nounService: NounService,
        private languageService: LanguageService,
        private translationService: TranslationService,
        private location: Location
    ){}
    ngOnInit(): void {
        this.getNoun();
    }
    filterNouns(): void {
        this.searchNouns(this.myControl.value as string);
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
        // I have no idea what the second argument being based to parseInt is doing.
        // could be the base or smth but idk.
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

        this.nounService.getNoun(id)
            .subscribe(incoming_noun => {
                this.noun = incoming_noun;
                // Interpreter refuses to let me call this function in ngOnInit for some reason.
                this.getLanguage(incoming_noun);
                this.getTranslations(incoming_noun);
            });
    }
    getLanguage(noun: Noun): void {
        this.languageService.getLanguage(noun.language_id)
            .subscribe(incoming_language => {
                this.language = incoming_language;
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
            // this.newTranslations.push(new Translation(
            //     0, // just to make the model happy
            //     this.noun.id,
            //     parseInt(this.newTranslationID),
            //     100 // just to make the model happy atm
            // ));
            let translation: Translation = new Translation(
                0,
                this.noun.id,
                parseInt(this.newTranslationID),
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
    removeTranslation(translationID: number, nounID: number): void {
        this.translationService.deleteTranslation(translationID, nounID)
            .subscribe(_ => {
                if (this.noun) {
                    this.getTranslations(this.noun)
                }
            });
    }
    save(): void {
        if(this.noun) {
            // discuss the uses for this being a subscription.
            this.nounService.updateNoun(this.noun).subscribe();
            this.goBack();
        }
    }
    goBack(): void {
        this.location.back();
    }

    protected readonly filter = filter;
}
