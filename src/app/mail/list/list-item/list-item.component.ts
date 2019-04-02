import {Component, Input, OnInit} from '@angular/core';
import {MailService} from '../../../services/mail.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {Router} from '@angular/router';
import {StepService} from '../../../services/step.service';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
    @Input() itemIndex: number;
    @Input() thread: any;
    @Input() threadId: number;
    step: number;

    constructor(
        private router: Router,
        private mailService: MailService,
        private stepService: StepService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.stepService.step.subscribe(step => this.step = step);
    }

    setStep(step: number) {
        this.stepService.changeStep(step);
    }

    nextStep() {
        this.stepService.changeStep(this.step = this.step + 1);
    }

    prevStep() {
        this.stepService.changeStep(this.step = this.step - 1);
    }

    openDialog(threadId: number, subject: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            // Shorthand syntax : threadId: threadId
            threadId,
            subject,
            title: 'Delete mail?',
            description: '  Do you really want to delete : '
        };

        const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

        dialogRef.afterClosed()
            .subscribe(
                data => {
                    if (data === this.threadId) {
                        this.deleteThread(this.threadId);
                        console.log('Deleted!');
                    }
                },
                error => console.log(error)
            );
    }

    deleteThread(threadId: number) {
        this.mailService.deleteThread(threadId)
            .subscribe(
                response => {
                    console.log(response);
                },
                error => console.log(error),
            );
    }
}
