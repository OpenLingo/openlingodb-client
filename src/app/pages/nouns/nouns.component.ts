import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import { Noun } from '../../models/noun.model';
import { NounService } from "../../services/noun.service";

import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'app-nouns',
    templateUrl: './nouns.component.html',
    styleUrls: ['./nouns.component.css']
})

export class NounsComponent implements OnInit, AfterViewInit {
    dataSource = new MatTableDataSource<Noun>();
    displayedColumns: string[] = ['id', 'word', 'language id', 'gender', 'level id'];
    nouns: Noun[] = [];

    constructor(private nounService : NounService) {}

    @ViewChild(MatSort) sort = new MatSort;

    ngOnInit(): void {
        this.getNouns();
    }
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    getNouns(): void {
        this.nounService.getNouns()
            .subscribe(incoming_nouns => {
                this.nouns = incoming_nouns;
                this.dataSource.data = incoming_nouns;
            })
    }
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}


