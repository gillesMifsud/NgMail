import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailComponent} from './mail/detail/detail.component';
import {SendComponent} from './mail/send/send.component';
import {ListComponent} from './mail/list/list.component';
import {AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'}, // Redirect only if the full path is empty
    {path: 'home', component: HomeComponent},
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
