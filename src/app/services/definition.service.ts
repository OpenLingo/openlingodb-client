import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { Definition } from "../models/definition.model";
import { Injectable } from "@angular/core";
import {Noun} from "../models/noun.model";

@Injectable({
    providedIn: 'root'
})

export class DefinitionService {
    private definitionsUrl: string = 'http://127.0.0.1:5000/api/definition';
    // No idea what this does.
    httpOptions = {
        headers: new HttpHeaders({'Content-type': 'application/json'})
    }

    constructor(
        private http: HttpClient,
        private messageService : MessageService
    ) {}

    getDefinitions(noun_id: number): Observable<Definition[]> {
        return this.http.get<Definition[]>(`${this.definitionsUrl}/${noun_id}`)
            .pipe(
                tap(_ => this.log('fetched nouns')),
                catchError(this.handleError<Definition[]>('getNouns', []))
            );
    }
    insertDefinition(definition: Definition): Observable<any> {
        return this.http.put(`${this.definitionsUrl}/insert`, definition, this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `inserted definition for noun [${definition.noun_id}]`
                )),
                catchError(this.handleError<Noun>(`insertDefinition noun id=${definition.noun_id}`))
            )
    }
    deleteDefinition(definitionID: number): Observable<any> {
        return this.http.put(`${this.definitionsUrl}/delete`, definitionID, this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `Deleted definition having ID = ${definitionID}`
                )),
                catchError(this.handleError<Noun>(`deleteDefinition definition id=${definitionID}`))
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
