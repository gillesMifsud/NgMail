import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isLoggedIn = false;
    menuOpened = true;

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

    openMenu($event) {
        $event.preventDefault();
        this.menuOpened = true;
    }
}
