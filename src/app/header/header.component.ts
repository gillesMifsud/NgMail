import {Component, Input, OnInit} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [
        trigger('collapse', [
            state('open', style({
                opacity: '1',
                display: 'block',
                transform: 'translate3d(0, 0, 0)'
            })),
            state('closed',   style({
                opacity: '0',
                display: 'none',
                transform: 'translate3d(0, -100%, 0)'
            })),
            transition('closed => open', animate('200ms ease-in')),
            transition('open => closed', animate('100ms ease-out'))
        ])
    ]
})
export class HeaderComponent implements OnInit {
    isLoggedIn = false;
    show = false;
    collapse = 'closed';

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.isLoggedIn().subscribe(loggedIn => {
                this.isLoggedIn = loggedIn;
                // console.log(this.isLoggedIn);
            }
        );
    }

    logout() {
        this.userService.signOut();
    }

    toggleCollapse() {
        // this.show = !this.show;
        this.collapse = this.collapse === 'open' ? 'closed' : 'open';
    }
}
