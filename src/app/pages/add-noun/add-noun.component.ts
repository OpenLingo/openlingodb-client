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
    languages: Language[] = [];
    gender: string | undefined;
    language: Language | undefined;
    word: string | undefined;

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
        let noun: Noun | undefined

        if (this.word && this.language) {
            if (this.language.is_gendered && this.gender) {
                noun = {
                    id: 0, // This is just to make the model happy. The server won't even look at this value.
                    language_id: this.language.id,
                    level_id: 0, // Also just to make the model happy
                    gender: this.gender,
                    word: this.word
                }
            } else {
                noun = {
                    id: 0, // This is just to make the model happy. The server won't even look at this value.
                    language_id: this.language.id,
                    level_id: 0, // Also just to make the model happy
                    gender: 'NULL',
                    word: this.word
                }
            }
            this.nounService.insertNoun(noun)
                .subscribe(() => this.goBack())
        }
    }
    goBack(): void {
        this.location.back();
    }
}
