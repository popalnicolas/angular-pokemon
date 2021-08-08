import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Pokemon} from "./model/pokemon";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _url: string = "http://localhost:8080/api/pokemon";

  constructor(private _http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]>
  {
    return this._http.get<Pokemon[]>(this._url+"/list").pipe(catchError(this.errorHandler));
  }

  getPokemonsByType(type: number): Observable<Pokemon[]>
  {
    return this._http.get<Pokemon[]>(this._url + "/list?type=" + type).pipe(catchError(this.errorHandler));
  }

  postPokemon(pokemon: any)
  {
    return this._http.post(this._url, pokemon).pipe(catchError(this.errorHandler));
  }

  removePokemon(id: number)
  {
    return this._http.delete(this._url+"/"+id).pipe(catchError(this.errorHandler));
  }

  likePokemon(pokemon: Pokemon)
  {
    return this._http.put(this._url+"/like", pokemon).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error);
  }
}
