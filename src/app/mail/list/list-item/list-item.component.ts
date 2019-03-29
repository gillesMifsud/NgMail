import {Component, Input, OnInit} from '@angular/core';
import {MailService} from '../../../services/mail.service';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
    @Input() index: number;
    @Input() thread: any;
    @Input() threadId: number;
    step = 0;

    constructor(private mailService: MailService) {
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

    deleteThread(threadId: number) {
        this.mailService.deleteThread(threadId)
            .subscribe(
                response => console.log(response),
                error => console.log(error),
            );
    }
}
