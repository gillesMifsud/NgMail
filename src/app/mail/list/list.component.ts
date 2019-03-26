import {Component, OnInit} from '@angular/core';
import {MailService} from '../../services/mail.service';
import {UserService} from '../../services/user.service';
import {error} from '@angular/compiler/src/util';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    threadList;
    user;
    isLoading = true;
    sender: string;
    private messages = [];
    private threadListFull: any;

    constructor(private userService: UserService,
                private mailService: MailService) {
    }

    ngOnInit() {
        this.getThreadList();
        this.getUserProfile();
        this.getAllThreadsWithDetail();
    }

    getUserProfile() {
        this.mailService.getUserProfile()
            .subscribe(
                (user: any) => {
                    this.user = user.emailAddress;
                },
                (error) => console.log(error)
            );
    }

    getThreadList() {
        return this.mailService.getThreadsList()
            .subscribe(
                (threadlist) => {
                    this.threadList = threadlist;
                    this.isLoading = false;
                    // console.log(this.threadList);
                },
                (error) => console.log(error)
            );
    }

    /**
     * Get latest threads with their messages
     */
    getAllThreadsWithDetail() {
        return this.mailService.getThreadsList()
            .subscribe(
                response => {
                    const threadList = response;
                    let threadObsArray = [];

                    for (let i = 0; i <= threadList.length; i++) {
                        if (threadList[i] && threadList[i].id) {
                            threadObsArray.push(this.mailService.getThreadDetail(response[i].id));
                        }
                    }
                    forkJoin(...threadObsArray)
                        .subscribe(results => {
                            this.threadListFull = results;
                            console.log(this.threadListFull);
                        });
                },
                error => console.log(error),
            );
    }
}
