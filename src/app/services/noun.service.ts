import { Injectable } from '@angular/core';
import { Noun } from '../models/noun.model';
import { NOUNS } from '../mock-nouns';
import { Observable, of } from "rxjs";
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NounService {

  private nounsUrl = 'https://127.0.0.1:5000/api/noun';

  getNouns(): Observable<Noun[]> {
    return this.http.get<Noun[]>(this.nounsUrl);
  }
  getNoun(id: number): Observable<Noun> {
    const route = `/${id}`;
    // For now, assume that a noun with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    return this.http.get<Noun>(this.nounsUrl + route);
    // const noun = NOUNS.find(n => n.id === id)!;
    // this.messageService.add(`nounService: fetched noun id=${id}`);
    // return of(noun);
  }
  constructor(
    private http: HttpClient,
    private messageService : MessageService) { }
}
