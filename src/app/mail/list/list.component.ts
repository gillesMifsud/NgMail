import {Component, OnInit} from '@angular/core';
import {MailService} from '../../services/mail.service';
import {UserService} from '../../services/user.service';
import {forkJoin} from 'rxjs';
import {StepService} from '../../services/step.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    $threadList = [];
    user;
    isLoading = true;
    private messages = [];

    constructor(private userService: UserService,
                private stepService: StepService,
                private mailService: MailService) {
    }

    ngOnInit() {
        this.getAllThreadsWithDetail();
    }

    /**
     * Get latest threads with their messages
     */
    getAllThreadsWithDetail() {
        return this.mailService.getThreadsList()
            .subscribe(
                (response) => {
                    const threadList = response;
                    const threadObsArray = [];

                    for (let i = 0; i <= threadList.length; i++) {
                        if (threadList[i] && threadList[i].id) {
                            threadObsArray.push(this.mailService.getThreadDetail(response[i].id));
                        }
                    }
                    forkJoin(...threadObsArray)
                        .subscribe((results) => {
                            results.map((thread, index) => {
                                // Get labelIds [string]
                                const labelsId = thread.messages[0].labelIds;
                                const threadId = thread.id;
                                // ['Subject', 'From', 'To', 'Date']
                                const headers = thread.messages[0].payload.headers;
                                const subject = headers.filter((v) => v.name === 'Subject');
                                const fromexp = headers.filter((v) => v.name === 'From');
                                const to = headers.filter((v) => v.name === 'To');
                                const date = headers.filter((v) => v.name === 'Date');
                                const bodyResponse = thread.messages[0].payload.parts && thread.messages[0].payload.parts[1] &&
                                    this.parseMail(thread.messages[0].payload.parts[1].body.data);
                                const item$ = {
                                    id: threadId,
                                    labelsId,
                                    subject: subject[0].value,
                                    fromexp: fromexp[0].value,
                                    to: to[0].value,
                                    date: date[0].value,
                                    bodyResponse
                                };
                                this.$threadList = this.$threadList.concat([
                                    item$
                                ]);
                                this.isLoading = false;
                                // console.log(item$);
                            });
                            // console.log(this.$threadList);
                        });
                },
                error => console.log(error),
            );
    }

    private parseMail(content) {
        return atob(content.replace(/-/g, '+').replace(/_/g, '/'));
    }
}
