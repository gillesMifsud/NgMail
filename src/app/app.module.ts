import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig} from 'ng-gapi';
import {UserService} from './services/user.service';
import {MailService} from './services/mail.service';
import { HeaderComponent } from './header/header.component';
import { gapiClientConfig } from '../environments/gapiClientConfig';
import { DetailComponent } from './mail/detail/detail.component';
import { ListComponent } from './mail/list/list.component';
import { ListItemComponent } from './mail/list/list-item/list-item.component';
import { SanitizeHtmlPipePipe } from './shared/sanitize-html-pipe.pipe';
import { SendComponent } from './mail/send/send.component';
import {AuthGuard} from './services/auth-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        DetailComponent,
        ListComponent,
        ListItemComponent,
        SanitizeHtmlPipePipe,
        SendComponent
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
    providers: [UserService, MailService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
