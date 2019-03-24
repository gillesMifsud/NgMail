import {Injectable, NgZone} from '@angular/core';
import * as _ from 'lodash';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/share';

@Injectable()
export class UserService {

    public static readonly SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser = undefined;
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

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

    public signOut(): void {
        this.googleAuthService.getAuth().subscribe(
            (auth) => {
                this.ngZone.run(
                    () => {
                        auth.signOut();
                        this.removeToken();
                        this.isLoginSubject.next(false);
                        this.router.navigate(['login']);
                    }
                );
            },
            (error) => console.log(error)
        );
    }

    public removeToken() {
        return sessionStorage.removeItem(UserService.SESSION_STORAGE_KEY);
    }

    public hasToken(): boolean {
        return !!sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    }

    private signInSuccessHandler(res: GoogleUser) {
        this.ngZone.run(() => {
            this.user = res;
            sessionStorage.setItem(
                UserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
            );
            // Subject next here
            this.isLoginSubject.next(true);
            this.router.navigate(['mail-list']);
        });
    }

    private signInErrorHandler(err) {
        console.warn(err);
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable().share();
    }
}
