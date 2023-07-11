import {Component, OnInit} from '@angular/core';
import { Noun } from "../../models/noun";
import { Language} from "../../models/language.model";
import { NounService } from "../../services/noun.service";
import { LanguageService } from "../../services/language.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-add-noun',
  templateUrl: './add-noun.component.html',
  styleUrls: ['./add-noun.component.css']
})
export class AddNounComponent implements OnInit {
    languages: Language[] = [];

    word: string = '';
    language: number = 0;
    gender: string = ''

    constructor(
        private languageService : LanguageService,
        private messageService : MessageService
    ) {}

    add_noun(): void {

    }
    ngOnInit() {
        this.languageService.getLanguages()
            .subscribe(incoming_languages => this.languages = incoming_languages)
    }
}
