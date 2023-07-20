import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Language} from "../models/language.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
    private languagesUrl: string = 'http://127.0.0.1:5000/api/language';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/json'})
    }

    constructor(
        private http: HttpClient,
        private messageService : MessageService) {
    }

    getLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>(this.languagesUrl)
            .pipe(
                tap(_ => this.log('fetched languages')),
                catchError(this.handleError<Language[]>('getLanguages', []))
            );
    }
    getLanguage(id: number): Observable<Language> {
        const route = `${this.languagesUrl}/${id}`;

        return this.http.get<Language>(route)
            .pipe(
                tap(_ => this.log(`fetched language id = ${id}`)),
                catchError(this.handleError<Language>(`getLanguage id=${id}`))
            );
    }
    private log(message: string) {
        this.messageService.add(`NounService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
