import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

    title: string;
    description: string;
    subject: string;
    threadId: number;

    constructor(
        private dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.title;
        this.description = data.description;
        this.subject = data.subject;
        this.threadId = data.threadId;
    }

    save() {
        this.dialogRef.close(this.threadId);
    }

    close() {
        this.dialogRef.close(null);
    }
}
