import { Component, OnInit } from '@angular/core';
import { Noun } from '../../models/noun';
import { NounService } from '../../services/noun.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  nouns: Noun[] = [];

  constructor(private nounService: NounService) { }

  ngOnInit(): void {
    this.getNouns();
  }

  getNouns(): void {
    this.nounService.getNouns()
      .subscribe(nouns => this.nouns = nouns.slice(1, 5));
  }
}
