import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormArray, FormsModule, ReactiveFormsModule} from "@angular/forms";

import { Dialect } from "../../models/dialect.model";
import { Language } from "../../models/language.model";
import { Level } from "../../models/level.model";
import { DialectService } from "../../services/dialect.service";
import { LanguageService } from "../../services/language.service";
import { LevelService } from "../../services/level.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    dialects: Dialect[] = [];
    languages: Language[] = [];
    levels: Level[] = [];

    user_dialects: Dialect[] = [];

    constructor(
        private dialectService: DialectService,
        private languageService: LanguageService,
        private levelService: LevelService,
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
        this.levelService.getLevels()
            .subscribe((incoming_levels: Level[]): void => {
                this.levels = incoming_levels;
            });
    }
    submit(): void {
        console.log(this.user_dialects);
    }
    filterDialects(language_id: number | undefined): Dialect[] { // I hate red squiggly lines
        let dialects: Dialect[] = [];
        this.dialects.forEach((dialect: Dialect): void => {
            if (dialect['language_id'] == language_id!) { // I really hate red squiggly lines
                dialects.push(dialect);
            }
        });
        return dialects;
    }
    filterLevels(language_id: number | undefined): Level[] {
        let levels: Level[] = [];
        this.levels.forEach((level: Level): void => {
            if (level['language_id'] == language_id!) {
                levels.push(level);
            }
        });
        return levels;
    }
    addUserDialect(dialect_id: number | undefined): void {
        this.user_dialects.forEach((dialect: Dialect, index: number): void => {
            if (dialect['id'] == dialect_id) {
                this.user_dialects.splice(index, 1);
                return;
            }
        });
        this.dialects.forEach((dialect: Dialect): void => {
            if (dialect['id'] == dialect_id) {
                this.user_dialects.push(dialect);
            }
        });
    }
}
