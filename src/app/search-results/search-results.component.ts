import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../shared/property.model';
import { Apartment } from '../shared/apartment.model';
import { Reservation } from '../shared/reservation.model';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: "search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"],
})

export class SearchResult implements OnInit {
  constructor(private api: ApiService, private router: Router,private route: ActivatedRoute) {
    
  }
  @ViewChild("loader") detailModal: LoaderComponent;
  
  properties:Property[]=[];
  reservations: Reservation[] = [];
  apartments: Apartment[] = [];
  period:number;
  propertyResults:Property[]=[];
  searchText=this.route.snapshot.queryParamMap.get('searchText');
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  persons=parseInt(this.route.snapshot.queryParamMap.get('persons'));
  isLoaded=false;

  counter(i: number) {
    return new Array(i);
  }
  set(property:Property){
    this.router.navigate(["/property-profile"],
    {queryParams:{propertyId:property.id, dateRange0:this.dateRange0, dateRange1:this.dateRange1, persons:this.persons, period:this.period}});
    
  }
  
  searchProperty(){
    for (var property of this.properties) {
      if (property.name.toLowerCase().includes(this.searchText.toLowerCase())) {
        for (var apartment of this.apartments) {
          if (
            property.id == apartment.propertyId &&
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
                  this.period = Math.floor((Date.UTC(this.dateRange1.getFullYear(), this.dateRange1.getMonth(), this.dateRange1.getDate()) - Date.UTC(this.dateRange0.getFullYear(), this.dateRange0.getMonth(), this.dateRange0.getDate()) ) /(1000 * 60 * 60 * 24));
                  this.propertyResults.push(property)

                }
              }
            }
          }
        }
        
      }
    }
  }
  ngOnInit() {
    this.api.getProperties().subscribe((properties: Property[]) => {
      this.properties=properties
    });

    this.api.getApartments().subscribe((apartments: Apartment[]) => {
      this.apartments=apartments;
    });
    this.api.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations=reservations;
    });
    setTimeout(() => {
      this.searchProperty();
  }, 1000);
    setTimeout(() => {
      this.isLoaded=true;
  }, 1500);
    }
}
