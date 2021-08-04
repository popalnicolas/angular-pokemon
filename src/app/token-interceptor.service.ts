import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userService: UserService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request;
    if (this.userService.loggedIn()) {
      request = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.userService.getToken()
        }
      });
    }
    else {
      request = req.clone();
    }

    return next.handle(request);
  }
}
