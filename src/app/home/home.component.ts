import { Component, ViewChild } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { Property } from "../shared/property.model";
import { DetailModalComponent } from "./detail-modal/detail-modal.component";
import { Apartment } from "../shared/apartment.model";
import { Reservation } from "../shared/reservation.model";
import { Router } from "@angular/router";
import { City } from "../shared/city.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  properties: Property[] = [];
  // propr1: Property = {
  //   id: 1,
  //   name: "Alex",
  //   type: "Vila",
  //   description: "sadsa",
  //   numberOfStars: 3,
  //   cityName: "Constanta",
  //   street: "Salciilor",
  //   streetNumber: 41,
  //   photo: "2cazino-constanta1.jpg",
  //   cityId: 1,
  //   ownerId: 1,
  // };
  // ap1: Apartment = {
  //   id: 1,
  //   numberofRooms: 2,
  //   pricePerNight: 100,
  //   maxPersons: 3,
  //   description: "lalala",
  //   propertyId: 1,
  // };
  // res1: Reservation = {
  //   id: 1,
  //   numberOfDays: 3,
  //   price: 300,
  //   review: "",
  //   checkIn: "",
  //   checkOut: "",
  //   userId: 1,
  //   apartmentId: 1,
  // };
  searchText: string = "";
  place: string;
  bsRangeValue: Date;
  checkin: String;
  checkout: string;
  public static results: Property[] = [];
  result: Property[] = [];
  public static apartamente: Apartment[] = [];
  apartament: Apartment[] = [];
  apartments: Apartment[] = [];
  maxPers: number;
  reservations: Reservation[] = [];
  cities: City[] = [];
  @ViewChild("detailModal") detailModal: DetailModalComponent;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getProperties().subscribe((data: Property[]) => {
      for (let i = 0; i < data.length; i++) {
        this.api.getProperty(data[i].id).subscribe((info: Property) => {
          info.id = data[i].id;
          this.properties.push(info);
        });
      }
    });
    // this.properties.push(this.propr1);
    this.api.getApartments().subscribe((data: Apartment[]) => {
      for (let i = 0; i < data.length; i++) {
        this.api.getApartment(data[i].id).subscribe((info: Apartment) => {
          info.id = data[i].id;
          this.apartments.push(info);
        });
      }
    });
    //this.apartments.push(this.ap1);
    this.api.getReservations().subscribe((data: Reservation[]) => {
      for (let i = 0; i < data.length; i++) {
        this.api.getReservation(data[i].id).subscribe((info: Reservation) => {
          info.id = data[i].id;
          this.reservations.push(info);
        });
      }
    });
    this.api.getCities().subscribe((data: City[]) => {
      for (let i = 0; i < data.length; i++) {
        this.api.getCity(data[i].id).subscribe((info: City) => {
          info.id = data[i].id;
          this.cities.push(info);
        });
      }
    });
  }
  showDM(id: number): void {
    this.detailModal.initialize(id);
  }

  onSubmit() {
    for (var property of this.properties) {
      if (property.name.toLowerCase().includes(this.searchText.toLowerCase())) {
        for (var apartment of this.apartments) {
          if (
            property.id == apartment.propertyId &&
            apartment.maxPersons >= this.maxPers
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
                  (cIn > this.bsRangeValue[0] && cOut > this.bsRangeValue[1]) ||
                  (cIn < this.bsRangeValue[0] && cOut < this.bsRangeValue[1])
                ) {
                  this.result.push(property);
                  this.apartament.push(apartment);
                }
              }
            }
          }
        }
      }
    }
    console.log(this.result);
    HomeComponent.results = this.result;
    console.log(this.apartament);
    HomeComponent.apartamente = this.apartament;
    this.router.navigate(["/search-results"]);
  }
}
