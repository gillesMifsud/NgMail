import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.userService.getToken();
        return true;
    }
}
