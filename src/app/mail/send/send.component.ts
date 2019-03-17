import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewMail} from '../../models/newMail.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
    mailForm: FormGroup;
    subjectCharLeft: number = 50;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        const to = '';
        const subject = '';
        const message = '';

        this.mailForm = new FormGroup({
            'to': new FormControl(subject, [
                Validators.required,
                Validators.email
            ]),
            'subject': new FormControl(to, [
                Validators.required,
                Validators.maxLength(50)
            ]),
            'message': new FormControl(message, [
                Validators.required,
                Validators.minLength(8)
            ]),
        });
    }

    onSubmit() {
        const newMail = new NewMail(
            this.mailForm.value['to'],
            this.mailForm.value['subject'],
            this.mailForm.value['message']
        );
        console.log(newMail);
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}
