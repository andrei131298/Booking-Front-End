import { Component, Input, OnInit, Output, ViewChild } from "@angular/core";
import { EventEmitter } from "events";
import { HomeComponent } from "../home/home.component";
import { ApiService } from "../shared/api.service";
import { Property } from "../shared/property.model";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { City } from "../shared/city.model";

@Component({
  selector: "search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"],
})
export class SearchResult implements OnInit {
  constructor(private api: ApiService, private http: HttpClient) {}
  properties = HomeComponent.results;
  counter(i: number) {
    return new Array(i);
  }
  ngOnInit() {}
}
