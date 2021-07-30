import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = "http://localhost:8080/user";

  constructor(private _http: HttpClient, private router: Router) { }

  registerUser(user: any)
  {
    return this._http.post(this._url, user)
  }

  loginUser(username: string, password: string)
  {
    return this._http.get(`${this._url}?username=${username}&password=${password}`);
  }

  logoutUser()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/pokemons']);
  }

  loggedIn()
  {
    return !!localStorage.getItem('token');
  }

}
