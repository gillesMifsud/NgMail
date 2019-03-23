import {Component, OnInit} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {UserService} from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean;

    constructor(
        private gapiService: GoogleApiService,
        private userService: UserService) {
        // First make sure gapi is loaded can be in AppInitilizer
        this.gapiService.onLoad().subscribe();
    }

    ngOnInit() {
        this.userService.isLoggedIn().subscribe(
            loggedIn => {
                this.isLoggedIn = loggedIn;
                console.log(this.isLoggedIn);
            },
            error1 => console.log(error1)
        );
    }
}
