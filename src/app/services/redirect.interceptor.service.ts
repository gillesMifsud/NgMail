import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RedirectInterceptorService implements HttpInterceptor {
    constructor(
        public router: Router,
        private userService: UserService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.router.navigate(['login']);
                    this.userService.removeToken();
                }
            }
        });
    }
}
