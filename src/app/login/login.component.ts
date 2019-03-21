import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {GoogleApiService} from 'ng-gapi';

@Component({
    selector: 'app-home',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private userService: UserService,
                private gapiService: GoogleApiService) {
        // First make sure gapi is loaded can be in AppInitilizer
        this.gapiService.onLoad().subscribe();
    }

    ngOnInit() {}

    public signIn() {
        this.userService.signIn();
    }
}
