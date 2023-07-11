import { Component, Input } from '@angular/core';
import { Noun } from '../../models/noun.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NounService } from '../../services/noun.service';
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
               ){
    }
    ngOnInit(): void {
        this.getNoun();
    }
    getNoun(): void {
        const id: number = Number(this.route.snapshot.paramMap.get('id'));
        this.nounService.getNoun(id).subscribe(incoming_noun => this.noun = incoming_noun);
    }
    save(): void {
        if(this.noun) {
            this.nounService.updateNoun(this.noun)
                .subscribe(() => this.goBack());
        }
    }
    goBack(): void {
        this.location.back();
    }
}
