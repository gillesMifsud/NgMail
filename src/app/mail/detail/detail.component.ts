import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MailService} from '../../services/mail.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    threadId: number;

    thread;

    constructor(
        private router: Router,
        private mailService: MailService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.threadId = params.threadId;
                    this.thread = this.getThreadDetail(this.threadId);
                },
                (error) => console.log(error)
            );
    }

    getThreadDetail(id: number) {
        return this.mailService.getThreadDetail(id)
            .subscribe(
                (response) => response,
                (error) => console.log(error)
            );
    }
}
