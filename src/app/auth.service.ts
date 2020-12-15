import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  logout(): void {
    window.location.reload();
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.removeItem("token");
  }
}
