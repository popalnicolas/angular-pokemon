import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../pokemon.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css']
})
export class AddPokemonComponent implements OnInit {

  pokemonForm: FormGroup;
  selectedPokemon = '';
  pokemonAdded = false;

  get pokemonName()
  {
    return this.pokemonForm.get('pokemonName');
  }

  get pokemonType()
  {
    return this.pokemonForm.get('pokemonType');
  }

  get pokemonImage()
  {
    return this.pokemonForm.get('pokemonImage');
  }

  get pokemonDescription()
  {
    return this.pokemonForm.get('pokemonDescription');
  }

  constructor(private fb: FormBuilder, private _pokemonService: PokemonService, private _snackBar: MatSnackBar, private router: Router)
  {
    this.pokemonForm = this.fb.group({
      pokemonName:['', Validators.required],
      pokemonType:['', Validators.required],
      pokemonImage:['', Validators.required],
      pokemonDescription:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  getType(type: string)
  {
    switch (type)
    {
      case "grass":
        return 1;
      case "fire":
        return 2;
      case "electric":
        return 3;
      case "water":
        return 4;
      default:
        return 5;
    }
  }

  onSubmit()
  {
    this.pokemonForm.value.pokemonType = this.getType(this.pokemonForm.value.pokemonType);
    this._pokemonService.postPokemon(this.pokemonForm.value)
      .subscribe(
        (response:any) => {
          console.log("Success!", response);
          this._snackBar.open("Pokemon added!", "Close", {duration: 3000});
          this.pokemonAdded = true;
        },
          error => {
            console.log("Error!", error);
            this._snackBar.open("Pokemon could not been added! :(", "Close", {duration: 3000});
        });
  }
}
