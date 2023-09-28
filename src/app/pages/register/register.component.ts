import {Component, OnInit} from '@angular/core';
import { Language } from "../../models/language.model";
import { LanguageService } from "../../services/language.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    languages: Language[] = [];
    user_languages = [["English", false], ["German", false]];

    constructor(
        private languageService: LanguageService,
    ) {}

    ngOnInit(): void {
        this.languageService.getLanguages()
            .subscribe(incoming_languages => this.languages = incoming_languages);
    }

}
