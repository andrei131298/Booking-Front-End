import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { Property } from "../shared/property.model";
import { DetailModalComponent } from "./detail-modal/detail-modal.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  properties: Property[] = [];
  searchText: string = "";
  place: string;
  bsRangeValue: Date;
  checkin: Date;
  checkout: string;

  @ViewChild("detailModal") detailModal: DetailModalComponent;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProperties().subscribe((data: Property[]) => {
      for (let i = 0; i < data.length; i++) {
        this.api.getProperty(data[i].id).subscribe((info: Property) => {
          info.id = data[i].id;
          this.properties.push(info);
        });
      }
    });
  }
  showDM(id: number): void {
    this.detailModal.initialize(id);
  }
  getReservation(id: number) {
    this.api.getReservation(id).subscribe(
      (data: any) => {
        this.checkin = data.checkIn;
        this.checkout = data.checkOut;
      },
      (err: Error) => {
        console.log("err", err);
      }
    );
  }
  functie() {
    console.log(this.bsRangeValue[0]);
    this.getReservation(7);
    console.log(this.checkin);
  }
}
