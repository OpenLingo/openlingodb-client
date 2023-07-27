import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Translation} from '../models/translation.model';
import { Observable, of } from "rxjs";
import { Noun } from "../models/noun.model";

@Injectable({
    providedIn: 'root'
})

export class TranslationService {
    private translationsUrl: string = 'http://127.0.0.1:5000/api/translation';
    // No idea what this does.
    httpOptions = {
        headers: new HttpHeaders({'Content-type': 'application/json'})
    }

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getTranslations(): Observable<Translation[]> {
        return this.http.get<Translation[]>(this.translationsUrl)
            .pipe(
                tap(_ => this.log('fetched translations')),
                catchError(this.handleError<Translation[]>('getTranslations', []))
            );
    }

    insertTranslation(translation: Translation): Observable<any> {
        return this.http.put(`${this.translationsUrl}/insert`, translation, this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `inserted translation: '${translation.to_noun_id}', for noun '${translation.from_noun_id}'`
                )),
                catchError(this.handleError<Noun>(`insertTranslation word=${translation.from_noun_id}`))
            )
    }

    private log(message: string) {
        this.messageService.add(`TranslationService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
