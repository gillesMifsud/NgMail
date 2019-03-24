import {Component, OnInit} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {UserService} from './services/user.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isLoggedIn: Observable<boolean>;

    constructor(
        private gapiService: GoogleApiService,
        private userService: UserService) {
        // First make sure gapi is loaded can be in AppInitilizer
        this.gapiService.onLoad().subscribe();
        this.isLoggedIn = this.userService.isLoggedIn();
    }
}
