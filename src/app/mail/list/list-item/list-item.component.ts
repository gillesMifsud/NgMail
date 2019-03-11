import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
    @Input() index: number;
    @Input() thread: any;

    constructor() {
    }

    ngOnInit() {
    }

}
