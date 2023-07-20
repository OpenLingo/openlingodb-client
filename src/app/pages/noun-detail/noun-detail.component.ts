import { Component, OnInit } from '@angular/core';
import { Noun } from '../../models/noun.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NounService } from '../../services/noun.service';
import {Language} from "../../models/language.model";
import {LanguageService} from "../../services/language.service";

@Component({
    selector: 'app-noun-detail',
    templateUrl: './noun-detail.component.html',
    styleUrls: ['./noun-detail.component.css']
})

export class NounDetailComponent implements OnInit {
    noun: Noun | undefined; // ask about variables in typescript.
    language: Language | undefined;

    constructor(
        private route: ActivatedRoute,
        private nounService: NounService,
        private languageService: LanguageService,
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
            .subscribe(incoming_noun => {
                this.noun = incoming_noun;
                console.log(incoming_noun)
                // Interpreter refuses to let me call this function in ngOnInit for some reason.
                this.getLanguage(incoming_noun)
            });
    }
    getLanguage(noun: Noun): void {
        this.languageService.getLanguage(noun.language_id)
            .subscribe(incoming_language => {
                this.language = incoming_language;
                console.log(incoming_language)

            })
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
