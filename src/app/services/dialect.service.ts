import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { Definition } from "../models/definition.model";
import { Injectable } from "@angular/core";
import {Dialect} from "../models/dialect.model";

@Injectable({
    providedIn: 'root'
})

export class DialectService {
    private dialectsUrl: string = 'http://127.0.0.1:5000/api/dialect';
    // No idea what this does.
    httpOptions = {
        headers: new HttpHeaders({'Content-type': 'application/json'})
    }

    constructor(
        private http: HttpClient,
        private messageService : MessageService
    ) {}

    getDialectByID(dialect_id: number): Observable<Dialect> {
        return this.http.get<Dialect>(`${this.dialectsUrl}/${dialect_id}`)
            .pipe(
                tap(_ => this.log('fetched dialects')),
                catchError(this.handleError<Dialect>('getDialects', ))
            );
    }
    getDialectsByLanguage(language_id: number): Observable<Dialect[]> {
        return this.http.get<Dialect[]>(`${this.dialectsUrl}/get_by_language/${language_id}`)
            .pipe(
                tap(_ => this.log('fetched dialects')),
                catchError(this.handleError<Dialect[]>('getDialects', []))
            );
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
