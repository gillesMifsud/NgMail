import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MailService} from '../../services/mail.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    threadId: number;
    thread;
    responseHeaders;
    body;
    fromHeader: any;
    toHeader: any;
    dateHeader: any;

    constructor(
        private router: Router,
        private mailService: MailService,
        private route: ActivatedRoute,
        private domSanitizer: DomSanitizer
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
        this.domSanitizer.bypassSecurityTrustHtml(this.body);
    }

    getThreadDetail(id: number) {
        return this.mailService.getThreadDetail(id)
            .subscribe(
                (response) => {
                    const bodyResponse = response.messages[0].payload.parts[1].body.data;
                    this.body = this.parseMail(bodyResponse);
                    // Headers
                    this.responseHeaders = response.messages[0].payload.headers;

                    Object.values(this.responseHeaders).forEach((item: any) => {
                        if (item.name === 'From') {
                            this.fromHeader = item.value;
                        }
                        if (item.name === 'To') {
                            this.toHeader = item.value;
                        }
                        if (item.name === 'Date') {
                            this.dateHeader = item.value;
                        }
                    });

                    // console.log(this.responseHeaders);
                    // console.log(response);
                },
                (error) => console.log(error)
            );
    }

    private parseMail(content) {
        return atob(content.replace(/-/g, '+').replace(/_/g, '/'));
    }

    back() {
        this.router.navigate(['']);
    }
}
