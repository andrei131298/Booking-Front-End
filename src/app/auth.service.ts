import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  logout(): void {
    window.location.reload();
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }
}
