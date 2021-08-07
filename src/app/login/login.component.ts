import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private snackBar: MatSnackBar)
  {
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  loginUser()
  {
    this.userService.loginUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((res:any) => {
        console.log("Success!", res);
        //@TODO: use httponly cookie to secure it more
        localStorage.setItem('token', res.token);
        sessionStorage.setItem('token', res.token);
          this.snackBar.open(`Welcome back, ${this.loginForm.value.username}!`, "Close", {duration: 3000});
        this.router.navigate(['/pokemons']);
        },
          error => {
            console.log("Error!", error);
            this.snackBar.open("Wrong username or password!", "Close", {duration: 3000});
          });
  }
}
