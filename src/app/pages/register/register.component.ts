import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormArray, FormsModule, ReactiveFormsModule} from "@angular/forms";

import { Dialect } from "../../models/dialect.model";
import { Language } from "../../models/language.model";
import { Level } from "../../models/level.model";
import { User } from "../../models/user.model";

import { DialectService } from "../../services/dialect.service";
import { LanguageService } from "../../services/language.service";
import { LevelService } from "../../services/level.service";
import { UserService } from "../../services/user.service";

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
    user_dialects: Dialect[] = [];

    constructor(
        private dialectService: DialectService,
        private languageService: LanguageService,
        private levelService: LevelService,
        private userService: UserService
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
        this.addUser();
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
    addUserDialect(dialect: Dialect | undefined): void {
        if (this.user_dialects.includes(dialect!)) {
            this.user_dialects.splice(this.user_dialects.indexOf(dialect!), 1);
            return;
        }
        this.user_dialects.push(dialect!);
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
        this.userService.insertUser(user).subscribe();
    }
}
