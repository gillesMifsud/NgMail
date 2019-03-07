import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
    GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from 'ng-gapi';
import {UserService} from './services/user.service';
import {MailService} from './services/mail.service';

const gapiClientConfig: NgGapiClientConfig = {
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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig
        })
    ],
    providers: [UserService, MailService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
