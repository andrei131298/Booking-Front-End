import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { SearchResult } from '../search-results/search-results.component';
import { Apartment } from '../shared/apartment.model';
import { Property } from '../shared/property.model';
import { Reservation } from '../shared/reservation.model';
import { LoaderComponent } from '../loader/loader.component';
import { Favourite } from '../shared/favourite.model';


@Component({
  selector: 'property-profile',
  templateUrl: './property-profile.component.html',
  styleUrls: ['./property-profile.component.css']
})
export class PropertyProfileComponent implements OnInit {

  @ViewChild("loader") detailModal: LoaderComponent;

  constructor(private api: ApiService, private router: Router,private route: ActivatedRoute) {
  }
  propertyId=parseInt(this.route.snapshot.queryParamMap.get('propertyId'));
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  persons=parseInt(this.route.snapshot.queryParamMap.get('persons'));
  period=parseInt(this.route.snapshot.queryParamMap.get('period'));
  properties:Property[]=[];
  reservations: Reservation[] = [];
  apartments: Apartment[] = [];
  propertyResults:Property[]=[];
  apartmentResults: Apartment[] = [];
  apartmentResults2: Apartment[] = [];
  property:Property;
  isLoaded = false;
  favourite=new Favourite();
  userId = parseInt(JSON.parse(sessionStorage.getItem('userId')));


  ngOnInit() {
    this.api.getApartments().subscribe((apartments: Apartment[]) => {
      this.apartments=apartments;
    });
    this.api.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations=reservations;
    });
    this.api.getProperty(this.propertyId).subscribe((property:Property)=>{
      this.property=property;
    });
    setTimeout(() => {
      this.searchApartments();
  }, 1000);
    setTimeout(() => {
      this.isLoaded=true;
  }, 1500);
  }
  searchApartments(){
  for (var apartment of this.apartments) {
    if (
      this.propertyId == apartment.propertyId &&
      apartment.maxPersons >= this.persons
    ) {
      for (var reservation of this.reservations) {
        if (reservation.apartmentId == apartment.id) {
          var chIn = reservation.checkIn.substr(0, 10);
          var cIn = new Date(chIn);
          cIn.setHours(0);
          var chOut = reservation.checkOut.substr(0, 10);
          var cOut = new Date(chOut);
          cOut.setHours(0);
          if (
            (cIn > this.dateRange0 && cOut > this.dateRange1) ||
            (cIn < this.dateRange0 && cOut < this.dateRange1)                  
          ) {
            this.apartmentResults.push(apartment)
          }
        }
      }
    }
  }
  for (var apartment of this.apartments) {
    for (var reservation of this.reservations){
      if(reservation.apartmentId != apartment.id){
        if(apartment.propertyId == this.propertyId){
          if (this.apartmentResults.find((x) => x.id == apartment.id) === undefined) {
            this.apartmentResults.push(apartment)
          }
        }
      }
    }
  }
  console.log(this.apartmentResults)
  for(apartment of this.apartmentResults){
    this.api.getApartment(apartment.id).subscribe((data:Apartment) => {
      this.apartmentResults2.push(data);
    });
  } 
  console.log(this.apartmentResults2)
  
}
  counter(i: number) {
    return new Array(i);
  }

  check(){
    if(JSON.parse(sessionStorage.getItem('isLoggedIn')) == false){
      sessionStorage.setItem("triedWithoutLogin", "true");
      console.log(sessionStorage.getItem("triedWithoutLogin"));
      this.router.navigate(["/login"]);
      setTimeout(() => {
        sessionStorage.setItem("triedWithoutLogin", "false");
    }, 1000);
    }
  }
  addToFavourites(){
    if(JSON.parse(sessionStorage.getItem('isLoggedIn')) == false){
      sessionStorage.setItem("triedWithoutLogin", "true");
      console.log(sessionStorage.getItem("triedWithoutLogin"));
      this.router.navigate(["/login"]);
      setTimeout(() => {
        sessionStorage.setItem("triedWithoutLogin", "false");
    }, 1000);
    }
    else{
      this.favourite.propertyId=this.propertyId;
      this.favourite.userId=this.userId;
      this.api.addFavourite(this.favourite).subscribe();
      console.log(this.favourite);
    }
  }
  set(apartmentId: number){
    console.log(apartmentId);
  this.router.navigate(["/reservation"],
    {queryParams:{propertyId:this.propertyId, dateRange0:this.dateRange0, dateRange1:this.dateRange1, persons:this.persons, apartmentId: apartmentId, period:this.period}});
  }
  
}
