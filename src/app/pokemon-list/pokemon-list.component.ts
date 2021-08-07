import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../model/pokemon";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../user.service";
import {MatDialog} from "@angular/material/dialog";
import {PokemonRemoveDialogComponent} from "../pokemon-remove-dialog/pokemon-remove-dialog.component";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  public pokemons: any = [];
  public pokemonType: any;
  public errorMsg: any;

  constructor(private _pokemonService: PokemonService,
              private route:ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pokemonType = <string>params.get('type');
      this.getFromWebservices(this.pokemonType);
    });
  }

  getType(type: number)
  {
    switch (type)
    {
      case 1:
        return "Grass";
      case 2:
        return "Fire";
      case 3:
        return "Electric";
      case 4:
        return "Water";
      default:
        return "Other";
    }
  }

  getFromWebservices(pokemonType: any)
  {
    delete this.pokemons;
    switch(pokemonType)
    {
      case "grass":
        this._pokemonService.getPokemonsByType(1).subscribe(data => this.pokemons = data, error => this.errorMsg = error);
        break;
      case "fire":
        this._pokemonService.getPokemonsByType(2).subscribe(data => this.pokemons = data, error => this.errorMsg = error);
        break;
      case "electric":
        this._pokemonService.getPokemonsByType(3).subscribe(data => this.pokemons = data, error => this.errorMsg = error);
        break;
      case "water":
        this._pokemonService.getPokemonsByType(4).subscribe(data => this.pokemons = data, error => this.errorMsg = error);
        break;
      case "other":
        this._pokemonService.getPokemonsByType(5).subscribe(data => this.pokemons = data, error => this.errorMsg = error);
        break;
      default:
        this._pokemonService.getPokemons().subscribe(data => this.pokemons = data, error => this.errorMsg = error);
    }
  }

  likePokemon(pokemon: Pokemon)
  {
    this._pokemonService.likePokemon(pokemon).
    subscribe(
      data => {
        pokemon.pokemonLikes++;
        console.log('Success!', data);
      },
      error => {
        console.error('Error!', error)
      });
  }
  removePokemon(pokemon: Pokemon)
  {
    this._pokemonService.removePokemon(pokemon.pokemonId).
    subscribe(
      data => {
        console.log('Success!', data);
        this.refreshPage();
      },
      error => {
        console.error('Error!', error);
        this.snackBar.open("You need to have administration permissions for this action.", "Close", {duration:3000});
      });
    //@TODO: implement this, so it does not need to refresh page:
    //  delete this.pokemons[id]
  }

  openDialog(pokemon: Pokemon)
  {
    const dialogRef = this.dialog.open(PokemonRemoveDialogComponent, {
      width: '250px',
      data: {name: pokemon.pokemonName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.removePokemon(pokemon);
    });
  }

  refreshPage()
  {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }
}
