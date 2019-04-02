import {Injectable} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NewMail} from '../models/newMail.model';
import {Base64} from 'js-base64';

@Injectable({
    providedIn: 'root'
})

export class MailService {
    private readonly API_URL: string = 'https://www.googleapis.com/gmail/v1/users';
    private readonly SEND_API_URL: string = 'https://www.googleapis.com/gmail/v1/users/me/messages/send';
    private readonly SEND_ATTACHMENT_API_URL: string = 'https://www.googleapis.com/upload/gmail/v1/users/me/messages/send';
    private readonly BATCH_API_URL: string = 'https://www.googleapis.com/batch/gmail/v1/users';

    constructor(
        private gapiService: GoogleApiService,
        private httpClient: HttpClient) {
    }
    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/messages
     */
    getUsersMessagesList() {
        return this.httpClient.get(this.API_URL + '/me/messages')
            .pipe(
                map((response: any) => response.messages),
                catchError((response: any) => throwError(response))
            );
    }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/messages/id
     */
    getUsersMessagesDetail(id: number) {
        return this.httpClient.get(this.API_URL + '/me/messages/' + id)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/profile
     */
    getUserProfile(userId: string = 'me') {
        return this.httpClient.get(this.API_URL + '/' + userId + '/profile')
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    /**
     * GET https://www.googleapis.com/gmail/v1/users/userId/threads
     */
    getThreadsList(maxResults: number = 10, labelId: string = 'INBOX') {
        const params = new HttpParams().set('labelIds', labelId).set('maxResults', maxResults.toString());

        return this.httpClient.get(this.API_URL + '/me/threads', {
            params
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
        const params = new HttpParams().set('format', 'full');

        return this.httpClient.get(this.API_URL + '/me/threads/' + id, {
            params
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
        const headers = new HttpHeaders()
            .set('Accept', 'application/json')
            .set('Content-Type', 'message/rfc822');

        const body = this.encodeBodySimple(
            message.to,
            message.subject,
            message.message
        );

        return this.httpClient.post(this.SEND_ATTACHMENT_API_URL, body, {
            headers
        });
    }

    // Base64-encode the mail and make it URL-safe
    encodeBody(to, subject, message) {
        let msg = 'To: ' + to + '\n';
        msg += 'From: ' + 'example@gmail.com' + '\n';
        msg += 'Subject: =?utf-8?B?' + subject + '?=\n';
        msg += 'Date: ' + new Date() + '\n';
        msg += 'Content-Type: multipart/alternative; boundary=boundaryboundary\n\n';
        msg += '--boundaryboundary\n';
        msg += 'Content-Type: text/plain; charset=UTF-8\n';
        msg += 'Content-Transfer-Encoding: base64\n\n';
        msg += message + '\n\n';
        msg += '--boundaryboundary';

        const encodedMsg = Base64.encodeURI(msg);

        return {
            userId: 'me',
            resource: {
                raw: encodedMsg
            }
        };
    }

    encodeBodySimple(to, subject, message) {
        const encodedMessage = btoa([
            'From: ' + 'me' + '\r\n',
            'To: ' + to + '\r\n',
            'Subject: ' + subject + '\r\n\r\n',

            message
        ].join('')).replace(/\+/g, '-').replace(/\//g, '_');

        return {
            userId: 'me',
            resource: {
                raw: JSON.stringify(encodedMessage)
            }
        };
    }

    deleteThread(threadId: number) {
        return this.httpClient.delete(this.API_URL + '/me/messages/' + threadId);
    }
}
