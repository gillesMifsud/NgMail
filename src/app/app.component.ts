import {Component, OnInit} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {UserService} from './services/user.service';
import {Observable} from 'rxjs';
import {MailService} from './services/mail.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isLoggedIn: Observable<boolean>;
    user: any;

    constructor(
        private gapiService: GoogleApiService,
        private userService: UserService,
        private mailService: MailService) {
        // First make sure gapi is loaded can be in AppInitilizer
        this.gapiService.onLoad().subscribe();
        this.isLoggedIn = this.userService.isLoggedIn();
    }

    ngOnInit() {
        // this.getThreadList();
        this.getUserProfile();
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
}
