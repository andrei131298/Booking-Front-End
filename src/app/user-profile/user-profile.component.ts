import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Favourite } from '../shared/favourite.model';
import { Property } from '../shared/property.model';
import { Reservation } from '../shared/reservation.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiService) { }

  userId=parseInt(this.route.snapshot.queryParamMap.get('userId'));
  activeUser:User;
  isLoaded=false;
  options = ['Saved properties', 'Future reservations', 'Reservations history','Current reservations'];
  selectedOption:string;
  savedProperties:Favourite[]=[];
  userReservations:Reservation[]=[];
  currentDate= new Date();

  ngOnInit(): void {
    this.api.getUser(this.userId).subscribe((activeUser: User) => {
      this.activeUser=activeUser;
    });
    this.api.getFavouritesByUser(this.userId).subscribe((data: Favourite[]) => {
      this.savedProperties=data;
    });
    this.api.getReservationsByUser(this.userId).subscribe((reservations: Reservation[]) => {
      this.userReservations=reservations;
    });
    setTimeout(() => {
      this.isLoaded=true;
      this.selectedOption = 'Future reservations';
  }, 1000);
  }
  changeOption(option){
    this.selectedOption=option;
  }
}
