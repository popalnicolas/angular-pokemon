import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";
import {AddPokemonComponent} from "./add-pokemon/add-pokemon.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'pokemons', pathMatch: 'full'},
  {path: 'pokemons', component: PokemonListComponent},
  {path: 'pokemons/:type', component: PokemonListComponent},
  {
    path: 'add-pokemon',
    component: AddPokemonComponent,
    canActivate:[AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: "**", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
