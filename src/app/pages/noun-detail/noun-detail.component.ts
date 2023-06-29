import { Component, Input } from '@angular/core';
import { Noun } from '../noun';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NounService } from '../services/noun.service';
import { OnInit} from "@angular/core";

@Component({
  selector: 'app-noun-detail',
  templateUrl: './noun-detail.component.html',
  styleUrls: ['./noun-detail.component.css']
})
export class NounDetailComponent implements OnInit{
  @Input() noun?: Noun;

  constructor(private route: ActivatedRoute,
              private nounService: NounService,
              private location: Location
             ) {
  }
  ngOnInit(): void {
    this.getNoun();
  }
  getNoun(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.nounService.getNoun(id)
      .subscribe(noun => this.noun = noun);
  }
  goBack(): void {
    this.location.back();
  }
}
