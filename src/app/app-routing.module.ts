import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailComponent} from './mail/detail/detail.component';
import {SendComponent} from './mail/send/send.component';

const routes: Routes = [
    {path: '', redirectTo: '/mail-list', pathMatch: 'full'}, // Redirect only if the full path is empty
    {path: 'mail-list', component: HomeComponent},
    {path: 'mail/:threadId', component: DetailComponent},
    {path: 'new', component: SendComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
