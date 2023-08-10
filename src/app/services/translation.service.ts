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
    private translationUrl: string = 'http://127.0.0.1:5000/api/noun_translation';
    // No idea what this does.
    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        })
    }

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getTranslations(noun: Noun): Observable<Translation[]> {
        return this.http.get<Translation[]>(`${this.translationUrl}/${noun.id}`)
            .pipe(
                tap(_ => this.log('fetched translations')),
                catchError(this.handleError<Translation[]>('getTranslations', []))
            );
    }

    insertTranslation(translation: Translation): Observable<any> {
        return this.http.put(`${this.translationUrl}/insert`, translation, this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `inserted translation: '${translation.from_noun_id}' to '${translation.to_noun_id}'`
                )),
                catchError(this.handleError<Translation>(`insertTranslation translation=${translation}`))
            )
    }

    insertTranslations(translations: Translation[]): Observable<any> {
        return this.http.put(`${this.translationUrl}/insert`, translations, this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `inserted translation: '${translations}', for noun '${translations}'`
                )),
                catchError(this.handleError<Translation>(`insertTranslation word=${translations}`))
            );
    }

    deleteTranslation(translationID: number, nounID: number): Observable<any> {
        console.log([translationID, nounID]);
        return this.http.put(`${this.translationUrl}/delete`, [translationID, nounID], this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `deleted translation between nouns with ID's: ${nounID} and ${translationID}.`
                )),
                catchError(this.handleError<any>(`deleteTranslation IDs=[${nounID}, ${translationID}]`))
            );
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
