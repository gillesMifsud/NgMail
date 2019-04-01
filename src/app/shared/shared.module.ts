import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule,
    MatCardModule, MatDialogModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import {ClickOutsideDirective} from '../directives/click-outside.directive';
import {DeleteDialogComponent} from '../mail/delete-dialog/delete-dialog.component';

@NgModule({
    declarations: [
        ClickOutsideDirective,
        DeleteDialogComponent
    ],
    imports: [
        MatMenuModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDialogModule,
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
        MatDialogModule,
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
    entryComponents: [
        DeleteDialogComponent
    ]
})
export class SharedModule {
}
