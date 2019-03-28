import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule,
    MatCardModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import {ClickOutsideDirective} from '../directives/click-outside.directive';

@NgModule({
    declarations: [
        ClickOutsideDirective
    ],
    imports: [
        MatMenuModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSidenavModule
    ],
    exports: [
        CommonModule,
        ClickOutsideDirective,
        MatMenuModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSidenavModule
    ]
})
export class SharedModule {
}
