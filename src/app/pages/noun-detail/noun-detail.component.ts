import { Component, OnInit } from '@angular/core';
import { Noun } from '../../models/noun.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NounService } from '../../services/noun.service';

@Component({
    selector: 'app-noun-detail',
    templateUrl: './noun-detail.component.html',
    styleUrls: ['./noun-detail.component.css']
})
export class NounDetailComponent implements OnInit {

    noun: Noun | undefined; // ask about variables in typescript.

    constructor(
        private route: ActivatedRoute,
        private nounService: NounService,
        private location: Location
    ){}

    ngOnInit(): void {
        this.getNoun();
    }
    getNoun(): void {
        // I have no idea what the second argument being based to parseInt is doing.
        // could be the base or smth but idk.
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

        this.nounService.getNoun(id)
            /* This line is dog shit. It shouldn't want an array index to make it work.
               data at the server end probably needs to be formatted differently before
               being sent to the client. */
            .subscribe(incoming_noun => this.noun = incoming_noun[0]);
    }
    save(): void {
        if(this.noun) {
            // discuss the uses for this being a subscription.
            this.nounService.updateNoun(this.noun)
                .subscribe(() => this.goBack());
        }
    }
    goBack(): void {
        this.location.back();
    }
}
