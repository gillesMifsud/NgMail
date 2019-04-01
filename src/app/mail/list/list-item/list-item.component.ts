import {Component, Input, OnInit} from '@angular/core';
import {MailService} from '../../../services/mail.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {Router} from '@angular/router';

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

    constructor(
        private router: Router,
        private mailService: MailService,
        private dialog: MatDialog) {
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
