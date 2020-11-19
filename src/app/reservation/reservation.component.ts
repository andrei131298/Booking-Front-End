import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../shared/api.service";
import { Apartment } from '../shared/apartment.model';

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
  propertyId=parseInt(this.route.snapshot.queryParamMap.get('propertyId'));
  dateRange0=new Date(this.route.snapshot.queryParamMap.get('dateRange0'));
  dateRange1=new Date(this.route.snapshot.queryParamMap.get('dateRange1'));
  persons=parseInt(this.route.snapshot.queryParamMap.get('persons'));
  apartmentId=parseInt(this.route.snapshot.queryParamMap.get('apartmentId'));

  ngOnInit(): void {
    this.api.getApartment(this.apartmentId).subscribe((data:Apartment) => {
      this.apartment=data;
    });
    console.log(this.apartmentId)
}
  
  
}
