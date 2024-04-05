import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {LoginService} from "../Services/Login/login.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate{
  constructor(private loginService : LoginService, private router :Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isAuthenticated==true) {
      return true;
    }else {
      this.router.navigateByUrl("/pageNotFound")
      return false;
    }
  }
}

