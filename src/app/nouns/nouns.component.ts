import { Component } from '@angular/core';
import { Noun } from '../noun';
import { NounService } from "../noun.service";
import { MessageService } from "../message.service";
import { OnInit } from "@angular/core";

@Component({
  selector: 'app-nouns',
  templateUrl: './nouns.component.html',
  styleUrls: ['./nouns.component.css']
})
export class NounsComponent implements OnInit {
  nouns : Noun[] = [];

  constructor(private nounService : NounService,
              private messageService : MessageService) {}
  ngOnInit(): void {
    this.getNouns();
  }
  getNouns(): void {
    this.nounService.getNouns().subscribe(nouns => this.nouns = nouns)
  }
}


