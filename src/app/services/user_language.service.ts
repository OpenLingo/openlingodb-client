import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { User_language } from "../models/user_language.model";

@Injectable({
    providedIn: 'root'
})

export class User_languageService {
    private user_languagesUrl: string = 'http://127.0.0.1:5000/api/user_language';
    // No idea what this does.
    httpOptions = {
        headers: new HttpHeaders({'Content-type': 'application/json'})
    }

    constructor(
        private http: HttpClient,
        private messageService : MessageService
    ) {}

    getUserLanguages(): Observable<User_language[]> {
        return this.http.get<User_language[]>(`${this.user_languagesUrl}`)
            .pipe(
                tap(_ => this.log('fetched dialects')),
                catchError(this.handleError<User_language[]>('getDialects', ))
            );
    }
    insertUserLanguage(user_language: User_language): Observable<any> {
        return this.http.put(`${this.user_languagesUrl}/insert`, user_language, this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `inserted language for user having user id: '${user_language.user_id}'`
                )),
                catchError(this.handleError<User_language>(`insertUserLanguage user=${user_language.user_id}`))
            )
    }
    private log(message: string) {
        this.messageService.add(`DefinitionService: ${message}`);
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
