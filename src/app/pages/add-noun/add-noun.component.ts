import {Component, OnInit} from '@angular/core';
import { Noun } from "../../models/noun.model";
import { Language} from "../../models/language.model";
import { NounService } from "../../services/noun.service";
import { LanguageService } from "../../services/language.service";
import { Location } from "@angular/common";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-noun',
  templateUrl: './add-noun.component.html',
  styleUrls: ['./add-noun.component.css']
})

export class AddNounComponent implements OnInit {

    GENDERS = [
        {title: 'Masculine', symbol: 'm'},
        {title: 'Feminine', symbol: 'f'},
        {title: 'Neuter', symbol: 'n'}
    ];

    languages: Language[] | null = null;
    language: Language | null = null;
    gender: string | null = null;
    word: string | null = null;


    nouns: Noun[] | null = null;
    translations: Noun[] = [];

    translationFormControl = new FormControl <string>('');
    disableGenderSelect: boolean = true;

    constructor(
        private languageService : LanguageService,
        private location : Location,
        private nounService: NounService
    ) {}

    ngOnInit() : void {
        this.languageService.getLanguages()
            .subscribe(incoming_languages => this.languages = incoming_languages)
    }
    filterNouns(): void {
        if (this.translationFormControl.value == '') {
            this.nouns = null;
            return;
        }
        this.nounService.searchNoun(this.translationFormControl.value!)
            .subscribe(incomingNouns => this.nouns = incomingNouns);
    }
    pushTranslation(noun: Noun): void {
        for (let i: number = 0; i < this.translations.length; i++) {
            if (noun.id == this.translations[i].id) {
                return;
            }
        }
        this.translations.push(noun);
    }
    checkGender(): void {
        if (!this.language) {
            return;
        }
        if (!this.language.is_gendered) {
            this.disableGenderSelect = true;
            return;
        }
        this.disableGenderSelect = false;
    }
    save(): void {
        if (!this.word || !this.language) {
            console.log("Empty fields");
            return
        }
        if (this.language?.is_gendered && !this.gender) {
            console.log("Gender required for gendered languages.");
            return
        }
        let noun: Noun = new Noun(0, this.language.id, null, this.gender, this.word);
        this.nounService.insertNoun(noun)
            .subscribe(() => this.goBack());
    }
    goBack(): void {
        this.location.back();
    }
    debug(): void { // Print stuff to console here

    }
}
