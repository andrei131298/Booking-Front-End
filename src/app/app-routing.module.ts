import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SignUpComponent } from "./signUp/signUp.component";
import { SearchResult } from "./search-results/search-results.component";
import { LoginComponent } from "./login/login.component";
import { PropertyProfileComponent } from './property-profile/property-profile.component';
import { AuthGuard } from './auth.guard';
import { ReservationComponent } from './reservation/reservation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signUp", component: SignUpComponent },
  { path: "search-results", component: SearchResult },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "property-profile", component: PropertyProfileComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: "user-profile", component: UserProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
