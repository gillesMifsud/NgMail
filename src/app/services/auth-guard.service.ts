import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';


@Injectable()
export class AuthGuard implements CanActivate {

    isLoggedIn: boolean;

    constructor(private userService: UserService) {
        this.userService.isLoggedIn().subscribe(loggedIn => {
                this.isLoggedIn = loggedIn;
                console.log(this.isLoggedIn);
            }
        );
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isLoggedIn;
    }
}
