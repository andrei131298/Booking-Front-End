import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../shared/api.service";
import { Apartment } from '../shared/apartment.model';
import { DatePipe, formatDate } from '@angular/common';
import { Reservation } from '../shared/reservation.model';
import { User } from '../shared/user.model';

@Component({
  selector: "reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  apartment:Apartment;
  constructor(private api: ApiService,
    private router:Router,
    private route: ActivatedRoute
  ) {}
  pipe = new DatePipe('en-US');
  propertyId=parseInt(this.route.snapshot.queryParamMap.get('propertyId'));
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  persons=parseInt(this.route.snapshot.queryParamMap.get('persons'));
  period=parseInt(this.route.snapshot.queryParamMap.get('period'));
  apartmentId=parseInt(this.route.snapshot.queryParamMap.get('apartmentId'));
  dateRange0Formatted = formatDate(this.dateRange0,'MM/dd/yyyy','en-US');
  dateRange1Formatted = formatDate(this.dateRange1,'MM/dd/yyyy','en-US');
  userId = parseInt(JSON.parse(sessionStorage.getItem('userId')));

  ngOnInit(): void {
    this.api.getApartment(this.apartmentId).subscribe((data:Apartment) => {
      this.apartment=data;
    });
    console.log(this.userId)
}
  reserve(){
    var reservation:Reservation=
      {id:0,price:this.apartment.pricePerNight*this.period,
        review:"",checkIn:this.dateRange0Formatted,checkOut:this.dateRange1Formatted,
      userId:this.userId,apartmentId:this.apartmentId}
        console.log(reservation);
    this.api.addReservation(reservation).subscribe();

  }
  
  
}
