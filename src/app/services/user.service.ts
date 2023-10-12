import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private usersUrl: string = 'http://127.0.0.1:5000/api/user';
    // No idea what this does.
    httpOptions = {
        headers: new HttpHeaders({'Content-type': 'application/json'})
    }

    constructor(
        private http: HttpClient,
        private messageService : MessageService
    ) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.usersUrl}`)
            .pipe(
                tap(_ => this.log('fetched dialects')),
                catchError(this.handleError<User[]>('getDialects', ))
            );
    }
    insertUser(user: User): Observable<any> {
        return this.http.put(`${this.usersUrl}/insert`, user, this.httpOptions)
            .pipe(
                tap(_ => this.log(
                    `inserted user having email: '${user.email}'`
                )),
                catchError(this.handleError<User>(`insertUser email=${user.email}`))
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
