import {Component, OnInit} from '@angular/core';
import { Noun } from "../../models/noun.model";
import { Language} from "../../models/language.model";
import { NounService } from "../../services/noun.service";
import { LanguageService } from "../../services/language.service";
import { Location } from "@angular/common";
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-add-noun',
  templateUrl: './add-noun.component.html',
  styleUrls: ['./add-noun.component.css']
})
export class AddNounComponent implements OnInit {

    languages: Language[] = [];

    word: string | undefined;
    language: Language | undefined;
    gender: string | undefined;

    constructor(
        private languageService : LanguageService,
        private location : Location,
        private nounService: NounService,
        private messageService : MessageService
    ) {}

    ngOnInit() : void {
        this.languageService.getLanguages()
            .subscribe(incoming_languages => this.languages = incoming_languages)
        this.language = this.languages[0]
    }

    save() : void {
        if (this.word && this.language && this.gender) {
            let noun: Noun = {
                id: 0, // This is just to make the model happy. The server won't even look at this value.
                language_id: this.language.id,
                level_id: 0,
                gender: this.gender,
                word: this.word
            }
            this.nounService.insertNoun(noun)
                .subscribe(() => this.goBack())
        }
    }
    goBack(): void {
        this.location.back();
    }
}
