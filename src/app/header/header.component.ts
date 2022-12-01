import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api-service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  products: any = [];

  constructor(private _apiservice: ApiService) { }

  ngOnInit() {
    this._apiservice.getProducts().subscribe(products => {
      this.products = products;
    })
  }
}