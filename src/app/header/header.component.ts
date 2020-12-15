import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  storage = sessionStorage.getItem("isLoggedIn");
  firstName: string;
  userId:number;

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(["/home"]);
  }

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.firstName = sessionStorage.getItem("token");
    this.userId = parseInt(sessionStorage.getItem("userId"));
  }
  openProfile(){
    this.router.navigate(["/user-profile"],
    {queryParams:{userId:this.userId}});
  }
}
