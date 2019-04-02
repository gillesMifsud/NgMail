import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(public userService: UserService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.userService.getToken();

        if (token) {
            console.log('Intercepted!');
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}
