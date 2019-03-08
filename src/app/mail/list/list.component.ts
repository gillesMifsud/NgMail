import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {MailService} from '../../services/mail.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    messages;
    threadList;
    user;

    constructor(private userService: UserService,
                private mailService: MailService,
                private route: ActivatedRoute,
                private authService: GoogleAuthService,
                private gapiService: GoogleApiService) {
        // First make sure gapi is loaded can be in AppInitilizer
        this.gapiService.onLoad().subscribe();
    }

    ngOnInit() {
        this.getThreadList();
        this.getUserProfile();
    }

    public isLoggedIn(): boolean {
        return this.userService.isUserSignedIn();
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

    getThreadDetail(id: number) {
        return this.mailService.getThreadDetail(id)
            .subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
            );
    }

}
