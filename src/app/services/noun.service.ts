import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Noun } from '../models/noun.model';
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NounService {
    private nounsUrl: string = 'http://127.0.0.1:5000/api/noun';
    // No idea what this does.
    httpOptions = {
        headers: new HttpHeaders({'Content-type': 'application/json'})
    }

    constructor(
        private http: HttpClient,
        private messageService : MessageService
    ) {}

    getNouns(): Observable<Noun[]> {
        return this.http.get<Noun[]>(this.nounsUrl)
            .pipe(
                tap(_ => this.log('fetched nouns')),
                catchError(this.handleError<Noun[]>('getNouns', []))
            );
    }
    getNoun(id: number): Observable<Noun> {
        const route = `${this.nounsUrl}/${id}`;

        return this.http.get<Noun>(route)
            .pipe(
                tap(_ => this.log(`fetched noun id = ${id}`)),
                catchError(this.handleError<Noun>(`getNoun id=${id}`))
            );
    }
    searchNoun(search_term: string): Observable<Noun[]> {
        const route = `${this.nounsUrl}/search/${search_term}`

        return this.http.get<Noun[]>(route)
            .pipe(
                tap(_ => this.log(
                    `searched for nouns corresponding to the search term: ${search_term}`
                )),
                catchError(this.handleError<Noun[]>(`searchNoun search term=${search_term}`))
            )
    }
    // ask about the benefits of this returning an observable.
    insertNoun(noun: Noun): Observable<any> {
        return this.http.put(`${this.nounsUrl}/insert`, noun, this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `inserted noun '${noun.word}', with language_id=${noun.language_id}, and gender=${noun.gender}`
                )),
                catchError(this.handleError<Noun>(`insertNoun word=${noun.word}`))
            )
    }
    // What is the difference between put and post?
    updateNoun(noun: Noun): Observable<any> {
        return this.http.put(this.nounsUrl + `/update${noun.id}`, noun, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated noun id=${noun.id}`)),
                catchError(this.handleError<any>('updatedNoun'))
            )
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
