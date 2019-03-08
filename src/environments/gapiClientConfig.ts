import {NgGapiClientConfig} from 'ng-gapi';

export const gapiClientConfig: NgGapiClientConfig = {
    client_id: '831651867501-5eogaegfso45ii6qqfua81d1l3u4sb2d.apps.googleusercontent.com',
    discoveryDocs: ['https://gmail.googleapis.com/$discovery/rest?version=v4'],
    fetch_basic_profile: true,
    ux_mode: 'popup',
    scope: [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/gmail.readonly'
    ].join(' ')
};
