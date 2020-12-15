import { Component, ViewChild } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { Property } from "../shared/property.model";
import { DetailModalComponent } from "./detail-modal/detail-modal.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  properties: Property[] = [];
  searchText: string = "";
  bsRangeValue: Date;
  maxPers: number;
  maxDate=new Date();
  minDate=new Date();
  

  @ViewChild("detailModal") detailModal: DetailModalComponent;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getProperties().subscribe((properties: Property[]) => {
      this.properties=properties
    });
    this.maxDate.setFullYear(this.maxDate.getFullYear()+1);
    
  }
  showDM(id: number): void {
    this.detailModal.initialize(id);
  }

  onSubmit() {
    
    if(this.bsRangeValue[1].valueOf() != this.bsRangeValue[0].valueOf())
    {
        this.router.navigate(["/search-results"],
        {queryParams:{searchText:this.searchText, dateRange0:this.bsRangeValue[0], dateRange1:this.bsRangeValue[1], persons:this.maxPers}});
    }

  }
}
