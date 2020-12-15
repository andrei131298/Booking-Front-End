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
  triedWithoutLogin = JSON.parse(sessionStorage.getItem('triedWithoutLogin'));

  ngOnInit() {
    console.log(this.triedWithoutLogin)
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
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
    var user = this.users.find(
      (x) =>
        x.email === this.f.email.value &&
        x.password === this.f.password.value
    );
    if (!user) this.success = false;
    else {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userId", JSON.stringify(user.id));
      if(this.triedWithoutLogin == true){
        sessionStorage.setItem("triedWithoutLogin", "false");
        sessionStorage.setItem("token", user.firstName);
        this.router.navigate(["/reservation"]);
      }
      else{
        sessionStorage.setItem("token", user.firstName);
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
