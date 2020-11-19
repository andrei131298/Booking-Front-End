import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { User } from "../shared/user.model";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { ApiService } from "../shared/api.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  selectedOption = "User";
  loginForm: FormGroup;
  success: boolean;
  users: User[] = [];
  returnUrl = "/home";
  triedWithoutLogin = JSON.parse(localStorage.getItem('triedWithoutLogin'));

  ngOnInit() {
    console.log(this.triedWithoutLogin)
    this.loginForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.api.getUsers().subscribe((data: User[]) => {
      for (let i = 0; i < data.length; i++) {
        this.api.getUser(data[i].id).subscribe((info: User) => {
          info.id = data[i].id;
          this.users.push(info);
        });
      }
    });
    console.log(this.users);
  }

  isFieldValid(field: string) {
    return (
      !this.loginForm.get(field).valid && this.loginForm.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field),
    };
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      console.log("loginForm submitted");
    } else {
      this.success = false;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.validateAllFormFields(this.loginForm);
    }
    const user = this.users.find(
      (x) =>
        x.firstName === this.f.firstName.value &&
        x.lastName === this.f.lastName.value &&
        x.password === this.f.password.value
    );
    if (!user) this.success = false;
    else {
      localStorage.setItem("isLoggedIn", "true");
      if(this.triedWithoutLogin == true){
        localStorage.setItem("triedWithoutLogin", "false");
        localStorage.setItem("token", this.f.firstName.value);
        this.router.navigate(["/reservation"]);
      }
      else{
        localStorage.setItem("token", this.f.firstName.value);
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 3000);
      }
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  reset() {
    this.loginForm.reset();
  }
}
