import {Component, OnInit} from '@angular/core';
import { Noun } from "../../models/noun.model";
import { Language} from "../../models/language.model";
import { NounService } from "../../services/noun.service";
import { LanguageService } from "../../services/language.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-noun',
  templateUrl: './add-noun.component.html',
  styleUrls: ['./add-noun.component.css']
})

export class AddNounComponent implements OnInit {
    languages: Language[] | null = null;
    language: Language | null = null;
    gender: string | null = null;
    genders = [
        {title: 'Masculine', symbol: 'm'},
        {title: 'Feminine', symbol: 'f'},
        {title: 'Neuter', symbol: 'n'}
    ];
    word: string | null = null;

    constructor(
        private languageService : LanguageService,
        private location : Location,
        private nounService: NounService
    ) {}

    ngOnInit() : void {
        this.languageService.getLanguages()
            .subscribe(incoming_languages => this.languages = incoming_languages)
    }
    save() : void {
        let noun: Noun | null = null

        if (!this.word || !this.language) {
            console.log("Empty fields");
            return
        }
        if (this.language?.is_gendered && !this.gender) {
            console.log("Gender required for gendered languages.");
            return
        }
        noun = {
            id: 0,
            language_id: this.language.id,
            level_id: null,
            gender: this.gender,
            word: this.word
        }
        this.nounService.insertNoun(noun)
            .subscribe(() => this.goBack());
    }
    goBack(): void {
        this.location.back();
    }
}
