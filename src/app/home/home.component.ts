import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {MailService} from '../services/mail.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    messages;
    threadList;

    constructor(private userService: UserService,
                private mailService: MailService,
                private route: ActivatedRoute,
                private authService: GoogleAuthService,
                private gapiService: GoogleApiService) {
        // First make sure gapi is loaded can be in AppInitilizer
        this.gapiService.onLoad().subscribe();
    }

    ngOnInit() {
        this.route.fragment.subscribe((fragment) => {
            console.log(fragment);
        });
        if (this.isLoggedIn()) {
            this.getThreadList();
        }
    }

    public isLoggedIn(): boolean {
        return this.userService.isUserSignedIn();
    }

    public signIn() {
        this.userService.signIn();
    }

    signOut() {
        return this.userService.signOut();
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
