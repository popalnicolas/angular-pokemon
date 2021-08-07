import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-pokemon-remove-dialog',
  templateUrl: './pokemon-remove-dialog.component.html',
  styleUrls: ['./pokemon-remove-dialog.component.css']
})
export class PokemonRemoveDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PokemonRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
