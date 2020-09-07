import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Property } from "../../shared/property.model";
import { City } from "../../shared/city.model";
import { ApiService } from "../../shared/api.service";

@Component({
  selector: "app-detail-modal",
  templateUrl: "./detail-modal.component.html",
  styleUrls: ["./detail-modal.component.css"],
})
export class DetailModalComponent implements OnInit {
  @ViewChild("detailModal") modal: ModalDirective;
  property = new Property();
  city: string;

  constructor(private api: ApiService) {}

  ngOnInit() {}

  initialize(id: number): void {
    this.getProperty(id);
    this.modal.show();
  }

  getCity(id: number) {
    this.api.getCity(id).subscribe(
      (data: any) => {
        this.city = data.cityName;
      },
      (err: Error) => {
        console.log("err", err);
      }
    );
  }

  getProperty(id: number) {
    this.api.getProperty(id).subscribe(
      (data: Property) => {
        this.property = data;
        this.property.id = id;
        console.log(this.property);
        // if (!data.img) {
        //   this.album.img = 'https://i.ibb.co/0cBJC3N/3.jpg';
        // }
        this.getCity(this.property.cityId);
      },
      (err: Error) => {
        console.log("err", err);
      }
    );
  }
}
