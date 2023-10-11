import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

import { Dialect } from "../../models/dialect.model";
import { Language } from "../../models/language.model";
import { LanguageService } from "../../services/language.service";
import { DialectService } from "../../services/dialect.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    languages: Language[] = [];
    dialects: Dialect[] = [];

    // language form controls
    english_form_control: FormControl = new FormControl<boolean>(false);
    german_form_control: FormControl = new FormControl<boolean>(false);
    // dialect form controls
    en_au_form_control: FormControl = new FormControl<boolean>({value: false, disabled: true});
    en_gb_form_control: FormControl = new FormControl<boolean>({value: false, disabled: true});
    en_us_form_control: FormControl = new FormControl<boolean>({value: false, disabled: true});
    en_ca_form_control: FormControl = new FormControl<boolean>({value: false, disabled: true});
    de_de_form_control: FormControl = new FormControl<boolean>({value: false, disabled: true});
    de_at_form_control: FormControl = new FormControl<boolean>({value: false, disabled: true});
    de_ch_form_control: FormControl = new FormControl<boolean>({value: false, disabled: true});
    // proficiency form controls
    en_au_proficiency_form_control: FormControl = new FormControl({disabled: true});
    en_gb_proficiency_form_control: FormControl = new FormControl({disabled: true});
    en_us_proficiency_form_control: FormControl = new FormControl({disabled: true});
    en_ca_proficiency_form_control: FormControl = new FormControl({disabled: true});
    de_de_proficiency_form_control: FormControl = new FormControl({disabled: true});
    de_at_proficiency_form_control: FormControl = new FormControl({disabled: true});
    de_ch_proficiency_form_control: FormControl = new FormControl({disabled: true});

    constructor(
        private dialectService: DialectService,
        private languageService: LanguageService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.languageService.getLanguages()
            .subscribe((incoming_languages: Language[]): void => {
                this.languages = incoming_languages;
            });
        this.dialectService.getDialects()
            .subscribe((incoming_dialects: Dialect[]): void => {
                this.dialects = incoming_dialects;
            });
    }
    submit(): void {
        console.log(this.en_au_proficiency_form_control.value)
    }
}
