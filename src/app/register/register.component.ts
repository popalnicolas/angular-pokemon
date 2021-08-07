import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, private router: Router)
  {
    this.registerForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
      email:['', Validators.required],
      rules:[false, Validators.requiredTrue]
    })
  }

  ngOnInit(): void {
  }

  registerUser()
  {
    this.userService.registerUser(this.registerForm.value)
      .subscribe(data => {
        this.snackBar.open("Your account was created. You can now login.", "Okay", {duration: 3000});
        console.log("Success!", data);
        this.router.navigate(['/login']);
      }, error => {
        this.errorMsg = error.error;
      });
  }
}
