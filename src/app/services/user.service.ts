import {Injectable, NgZone} from '@angular/core';
import * as _ from 'lodash';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
    public static readonly SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser = undefined;

    constructor(private googleAuthService: GoogleAuthService,
                private router: Router,
                private ngZone: NgZone) {
    }

    public setUser(user: GoogleUser): void {
        this.user = user;
    }

    public getCurrentUser(): GoogleUser {
        return this.user;
    }

    public getToken(): string {
        const token: string = sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
        if (!token) {
            this.signOut();
            this.router.navigate(['/home']);
            console.log('no token set , authentication required');
        }
        return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    }

    public signIn() {
        this.googleAuthService.getAuth().subscribe((auth) => {
            auth.signIn().then(
                res => this.signInSuccessHandler(res),
                err => this.signInErrorHandler(err));
        });
    }

    // TODO: Rework
    public signOut(): void {
        this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            sessionStorage.removeItem(UserService.SESSION_STORAGE_KEY);
        });
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(sessionStorage.getItem(UserService.SESSION_STORAGE_KEY));
    }

    private signInSuccessHandler(res: GoogleUser) {
        this.ngZone.run(() => {
            this.user = res;
            sessionStorage.setItem(
                UserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
            );
        });
    }

    private signInErrorHandler(err) {
        console.warn(err);
    }
}
