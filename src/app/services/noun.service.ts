import { Injectable } from '@angular/core';
import { Noun } from './noun';
import { NOUNS } from './mock-nouns';
import { Observable, of } from "rxjs";
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class NounService {
  getNouns(): Observable<Noun[]> {
    const nouns = of(NOUNS);
    this.messageService.add('NounService: fetched nouns');
    return nouns;
  }
  getNoun(id: number): Observable<Noun> {
    // For now, assume that a noun with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const noun = NOUNS.find(n => n.id === id)!;
    this.messageService.add(`nounService: fetched noun id=${id}`);
    return of(noun);
  }
  constructor(private messageService : MessageService) { }
}
