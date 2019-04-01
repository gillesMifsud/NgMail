import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

    title: string;
    description: string;
    subject: string;

    constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.title;
        this.description = data.description;
        this.subject = data.subject;
    }

    ngOnInit() {
    }

    save() {
        console.log('save');
    }

    close() {
        this.dialogRef.close();
        console.log('close');
    }
}
