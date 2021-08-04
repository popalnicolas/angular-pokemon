import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServer: UserService, private router: Router) {
  }

  canActivate(): boolean
  {
    if(this.authServer.loggedIn())
      return true;
    else
    {
      this.router.navigate(['/login'])
      return false;
    }
  }
}
