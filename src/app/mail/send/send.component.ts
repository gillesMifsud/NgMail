import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewMail} from '../../models/newMail.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MailService} from '../../services/mail.service';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
    mailForm: FormGroup;
    subjectCharLeft: number;
    private subjectCharLeftDefVal = 100;

    constructor(
        private mailService: MailService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.initForm();
        this.subjectCharLeft = this.subjectCharLeftDefVal;
    }

    private initForm() {
        const to = 'gilles.mifsud.netapsys@gmail.com';
        const subject = 'Test mail subject';
        const message = 'This is a message test from ng mail.';

        this.mailForm = new FormGroup({
            'to': new FormControl(to, [
                Validators.required,
                Validators.email
            ]),
            'subject': new FormControl(subject, [
                Validators.required,
                Validators.maxLength(100)
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
        this.mailService.sendMessage(newMail)
            .subscribe(
                (response: Response) => console.log(response),
                (error) => console.log(error),
            );
        console.log(this.mailService.encodeBodySimple(
            this.mailForm.value['to'],
            this.mailForm.value['subject'],
            this.mailForm.value['message']));
        // this.mailForm.reset();
        // console.log(newMail);
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onKey(event: any) {
        this.subjectCharLeft = this.subjectCharLeftDefVal - event.target.value.length;
    }
}
