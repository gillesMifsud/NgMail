import {Injectable} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NewMail} from '../models/newMail.model';

@Injectable({
    providedIn: 'root'
})
export class MailService {
    private readonly API_URL: string = 'https://www.googleapis.com/gmail/v1/users';

    constructor(
        private gapiService: GoogleApiService,
        private userService: UserService,
        private httpClient: HttpClient) {
        gapiService.onLoad().subscribe(() => {

        });
    }

    private getAuthtoken() {
        return this.userService.getToken();
    }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/messages
     */
    // getListMails() {
    //     return this.httpClient.get(this.API_URL + '/me/messages', {
    //         headers: new HttpHeaders({
    //             Authorization: `Bearer ${this.getAuthtoken()}`
    //         })
    //     })
    //         .pipe(
    //             map((response: any) => response.messages),
    //             catchError((response: any) => throwError(response))
    //         );
    // }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/messages/id
     */
    // getMailDetail(id: number) {
    //     return this.httpClient.get(this.API_URL + '/me/messages/' + id, {
    //         headers: new HttpHeaders({
    //             Authorization: `Bearer ${this.getAuthtoken()}`
    //         })
    //     })
    //         .pipe(
    //             map(res => {
    //                 return res;
    //             })
    //         );
    // }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/profile
     */
    getUserProfile(userId: string = 'me') {
        return this.httpClient.get(this.API_URL + '/' + userId + '/profile', {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getAuthtoken()}`
            })
        })
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/threads
     */
    getThreadsList() {
        return this.httpClient.get(this.API_URL + '/me/threads', {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getAuthtoken()}`
            })
        })
            .pipe(
                map((response: any) => response.threads),
                catchError((response: any) => throwError(response))
            );
    }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/threads/id
     */
    getThreadDetail(id: number) {
        const params = new URLSearchParams();
        params.set('format', 'full');
        return this.httpClient.get(this.API_URL + '/me/threads/' + id + '?' + params, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getAuthtoken()}`
            })
        })
            .pipe(
                map((response: any) => response),
                catchError((response: any) => throwError(response))
            );
    }

    /**
     * POST https://www.googleapis.com/gmail/v1/users/userId/messages/send
     */
    sendMessage(message: NewMail) {
        return this.httpClient.post(this.API_URL + '/me/messages/send', message, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getAuthtoken()}`
            })
        });
    }
}
