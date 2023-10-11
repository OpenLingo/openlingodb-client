import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { Definition } from "../models/definition.model";
import { Injectable } from "@angular/core";
import { Level } from "../models/level.model";

@Injectable({
    providedIn: 'root'
})

export class LevelService {
    private levelsUrl: string = 'http://127.0.0.1:5000/api/level';
    // No idea what this does.
    httpOptions = {
        headers: new HttpHeaders({'Content-type': 'application/json'})
    }

    constructor(
        private http: HttpClient,
        private messageService : MessageService
    ) {}

    getLevels(): Observable<Level[]> {
        return this.http.get<Level[]>(`${this.levelsUrl}`)
            .pipe(
                tap(_ => this.log('fetched dialects')),
                catchError(this.handleError<Level[]>('getDialects', ))
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
