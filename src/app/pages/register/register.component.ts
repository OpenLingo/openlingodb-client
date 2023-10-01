import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

import { Dialect } from "../../models/dialect.model";
import { Language } from "../../models/language.model";
import { LanguageService } from "../../services/language.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    languages: Language[] = [];
    dialects: any = {};
    user_languages: any = {};
    user_dialects: any = {};

    selected_languages: any;
    selected_dialects: any;

    constructor(
        private languageService: LanguageService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.languageService.getLanguages()
            .subscribe(incoming_languages => {
                this.languages = incoming_languages

                let selected_language_form_fields: any = {};
                incoming_languages.forEach(language => {
                    selected_language_form_fields[language['title']] = false;
                    this.dialects[language['title']] = language['dialects'];
                })
                this.selected_languages = this._formBuilder.group(selected_language_form_fields);
                console.log(this.selected_languages);

                incoming_languages.forEach(language => {
                    // creates two dictionaries. The first keeps track of what languages a user selects,
                    // and the second keeps track of the dialects they select within a language.
                    this.user_languages[language['title']] = false;
                    this.user_dialects[language['title']] = {};
                    // I hate this forEach trick, but it works, so it stays
                    language['dialects']['forEach']((dialect: Dialect) => {
                        this.user_dialects[language['title']][`${dialect['title']}`] = false;
                    });
                });
            });
    }

}
