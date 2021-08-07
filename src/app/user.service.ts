import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "./model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = "http://localhost:8080/api/auth";

  constructor(private _http: HttpClient, private router: Router) { }

  registerUser(user: any)
  {
    return this._http.post(`${this._url}/register`, user)
  }

  loginUser(username: string, password: string)
  {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this._http.post(`${this._url}/login`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded'),
      withCredentials: true
    });
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

  getToken()
  {
    return localStorage.getItem('token');
  }
}
