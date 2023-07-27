import { Component, OnInit } from '@angular/core';
import { Noun } from '../../models/noun.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NounService } from '../../services/noun.service';
import { Language } from "../../models/language.model";
import { LanguageService } from "../../services/language.service";
import { Translation } from "../../models/translation.model";
import { TranslationService } from "../../services/translation.service";

@Component({
    selector: 'app-noun-detail',
    templateUrl: './noun-detail.component.html',
    styleUrls: ['./noun-detail.component.css']
})

export class NounDetailComponent implements OnInit {
    noun: Noun | undefined; // ask about variables in typescript.
    nouns: Noun[] | undefined;

    language: Language | undefined;

    translations: Translation[] | undefined;
    newTranslation: Translation | undefined;
    newTranslations: Translation[] | undefined;

    constructor(
        private route: ActivatedRoute,
        private nounService: NounService,
        private languageService: LanguageService,
        private translationService: TranslationService,
        private location: Location
    ){}

    ngOnInit(): void {
        this.getNoun();
        this.getNouns();
    }
    getNouns(): void {
        this.nounService.getNouns().subscribe(incoming_nouns => this.nouns = incoming_nouns);
    }
    getNoun(): void {
        // I have no idea what the second argument being based to parseInt is doing.
        // could be the base or smth but idk.
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

        this.nounService.getNoun(id)
            .subscribe(incoming_noun => {
                this.noun = incoming_noun;
                console.log(incoming_noun)
                // Interpreter refuses to let me call this function in ngOnInit for some reason.
                this.getLanguage(incoming_noun)
            });
    }
    getLanguage(noun: Noun): void {
        this.languageService.getLanguage(noun.language_id)
            .subscribe(incoming_language => {
                this.language = incoming_language;
                console.log(incoming_language)

            })
    }
    getTranslations(noun: Noun): void {
        // no point in implementing quite yet. prioritising adding translations so there's something to search.
    }
    addTranslation(): void {
        if (this.noun && this.newTranslation) {
            if (this.newTranslations) {
                this.newTranslations.push(new Translation(
                    0, // just to make the model happy
                    this.noun.id,
                    this.newTranslation.id,
                    100 // just to make the model happy atm
                ))
            } else {
                this.newTranslations = [new Translation(
                    0, // just to make the model happy
                    this.noun.id,
                    this.newTranslation.id,
                    100)]
            }
        }
    }
    save(): void {
        if(this.noun) {
            // discuss the uses for this being a subscription.
            this.nounService.updateNoun(this.noun)
                .subscribe(() => this.goBack());
            if (this.newTranslations) {
                for (let i = 0; i < this.newTranslations.length; i++) {
                    this.translationService.insertTranslation(this.newTranslations[i]);
                }
            }
        }
    }
    goBack(): void {
        this.location.back();
    }
}
