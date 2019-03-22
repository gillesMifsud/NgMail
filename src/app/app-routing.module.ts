import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DetailComponent} from './mail/detail/detail.component';
import {SendComponent} from './mail/send/send.component';
import {ListComponent} from './mail/list/list.component';
import {AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: '/mail-list', pathMatch: 'full'}, // Redirect only if the full path is empty
    {path: 'login', component: LoginComponent},
    {path: 'mail-list', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'mail/:threadId', component: DetailComponent, canActivate: [AuthGuard]},
    {path: 'new', component: SendComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
