import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    AddPokemonComponent,
    PokemonListComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
