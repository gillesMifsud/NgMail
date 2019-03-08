import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {GoogleApiService} from 'ng-gapi';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private userService: UserService,
                private gapiService: GoogleApiService) {
        // First make sure gapi is loaded can be in AppInitilizer
        this.gapiService.onLoad().subscribe();
    }

    ngOnInit() {}

    public isLoggedIn(): boolean {
        return this.userService.isUserSignedIn();
    }

    public signIn() {
        this.userService.signIn();
    }
}
