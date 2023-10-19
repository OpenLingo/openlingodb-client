import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {Form, FormBuilder, FormControl, FormArray, FormsModule, ReactiveFormsModule} from "@angular/forms";

import { Dialect } from "../../models/dialect.model";
import { Language } from "../../models/language.model";
import { Level } from "../../models/level.model";
import { User } from "../../models/user.model";

import { DialectService } from "../../services/dialect.service";
import { LanguageService } from "../../services/language.service";
import { LevelService } from "../../services/level.service";
import { UserService } from "../../services/user.service";
import { User_languageService } from "../../services/user_language.service";
import {User_language} from "../../models/user_language.model";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    dialects: Dialect[] = [];
    languages: Language[] = [];
    levels: Level[] = [];
    users: User[] = [];

    email: string | null = null;
    confirm_email: string | null = null;
    password: string | null = null;
    confirm_password: string | null = null;

    selected_language: number | null = null;
    selected_dialect: number | null = null;
    selected_proficiency: string | null = null;
    selected_proficiency_options: string[] = [
        "Beginner", "Elementary", "Intermediate", "Advanced", "Highly Competent", "Native"
    ];
    user_languages: {language_id: number, dialect_id: number, proficiency: string}[] = [];

    constructor(
        private dialectService: DialectService,
        private languageService: LanguageService,
        private levelService: LevelService,
        private userService: UserService,
        private user_languageService: User_languageService,

        private location: Location
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
        this.userService.getUsers()
            .subscribe((incoming_users: User[]): void => {
                this.users = incoming_users;
            })
    }
    submit(): void {
        if (this.user_languages.length < 1) {
            console.log('you must add at least one language.')
            return;
        }
        this.addUser();

    }
    addLanguage(): void {
        if (!this.selected_language || !this.selected_dialect || !this.selected_proficiency) {
            console.log('empty fields');
            return;
        }
        this.user_languages.push({
            language_id: this.selected_language,
            dialect_id: this.selected_dialect,
            proficiency:this.selected_proficiency
        });
        this.selected_language = this.selected_dialect = this.selected_proficiency = null;
    }
    removeLanguage(language_id: number, dialect_id: number): void {
        this.user_languages.forEach((user_language, index: number): void => {
           if (user_language['language_id'] == language_id && user_language['dialect_id'] == dialect_id) {
               this.user_languages.splice(index, 1);
           }
        });
    }
    addUser(): void {
        if (!this.email || !this.confirm_email || !this.password || !this.confirm_password) {
            console.log('please fill out all fields.');
            return;
        }
        if (this.email != this.confirm_email) {
            console.log('emails do not match.');
            return;
        }
        if (this.password != this.confirm_password) {
            console.log('passwords do not match.');
            return;
        }
        let user = new User(0, this.email, this.password, 'Contributor', 'UTC+10');
        this.userService.insertUser(user).subscribe(_ => this.addUserLanguages());
    }
    addUserLanguages(): void {
        if(this.user_languages.length < 1) {
            console.log('you must add at least one language.')
            return;
        }
        this.userService.getUserByEmail(this.email!).subscribe((incoming_user: User): void => {
           let user_id: number = incoming_user['id'];
            this.user_languages.forEach(user_language => {
                let outgoing_user_language: User_language = new User_language(
                    0,
                    user_language['dialect_id'],
                    1,
                    user_id,
                    user_language['proficiency']
                );
                console.log(outgoing_user_language)
                this.user_languageService.insertUserLanguage(outgoing_user_language)
                    .subscribe(_ => this.location.back());
            });
        });
    }
}
