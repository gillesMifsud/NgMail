import {Component, OnInit} from '@angular/core';
import {MailService} from '../../services/mail.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    threadList;
    user;

    constructor(private userService: UserService,
                private mailService: MailService) {}

    ngOnInit() {
        this.getThreadList();
        this.getUserProfile();
    }

    public isLoggedIn(): boolean {
        return this.userService.isUserSignedIn();
    }

    signOut() {
        return this.userService.signOut();
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

    // getMailDetail(messageId: number) {
    //     return this.mailService.getMailDetail(messageId)
    //         .subscribe(
    //             (messages) => console.log(messages),
    //             (error) => console.log(error)
    //         );
    // }

    getThreadList() {
        return this.mailService.getThreadsList()
            .subscribe(
                (threadlist) => this.threadList = threadlist,
                (error) => console.log(error)
            );
    }

}
