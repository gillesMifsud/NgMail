import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
    @Input() index: number;
    @Input() thread: any;
    step = 0;

    constructor() {
    }

    ngOnInit() {
    }

    setStep(index: number) {
        this.step = index;
        console.log('setStep : ' + this.step);
    }

    nextStep() {
        this.step++;
        console.log('nextStep : ' + this.step);
    }

    prevStep() {
        this.step--;
        console.log('prevStep : ' + this.step);
    }

}
