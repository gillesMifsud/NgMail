import {Injectable} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

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
    //             map(res => res.messages)
    //         );
    // }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/messages/id
     */
    getMailDetail(messageId: number) {
        return this.httpClient.get(this.API_URL + '/me/messages/' + messageId, {
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
                map((response: Response) => response.json()),
                catchError((response: Response) => throwError(response))
            );
    }
}
