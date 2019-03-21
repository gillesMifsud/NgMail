import {Injectable, NgZone} from '@angular/core';
import * as _ from 'lodash';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class UserService {

    public static readonly SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser = undefined;
    private logger = new Subject<boolean>();
    private loggedIn = false;

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
            console.log('no token set , authentication required');
        }
        return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    }

    public signIn() {
        this.googleAuthService.getAuth()
            .subscribe((auth) => {
                auth.signIn().then(
                    (res) => {
                        this.ngZone.run(
                            () => {
                                this.router.navigate(['mail-list']);
                                this.signInSuccessHandler(res);
                            }
                        );
                    },
                    (err) => this.signInErrorHandler(err));
            });
    }

    // TODO: Rework
    public signOut(): void {
        this.googleAuthService.getAuth().subscribe(
            (auth) => {
                this.ngZone.run(
                    () => {
                        this.router.navigate(['home']);
                        auth.signOut();
                        this.removeToken();
                        this.loggedIn = false;
                        this.logger.next(this.loggedIn);
                    }
                );
            },
            (error) => console.log(error)
        );
    }

    public removeToken() {
        return sessionStorage.removeItem(UserService.SESSION_STORAGE_KEY);
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
            // Subject next here
            this.loggedIn = true;
            this.logger.next(this.loggedIn);
        });
    }

    private signInErrorHandler(err) {
        console.warn(err);
    }

    isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
    }
}
