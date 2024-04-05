import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../Services/Login/login.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url)
    if(!request.url.includes("/authenticate")){
      let newRequest = request.clone({
        headers : request.headers.set('Authorization','Bearer '+this.loginService.accessToken)
      })
      return next.handle(newRequest);
    } else return next.handle(request);

  }
}
