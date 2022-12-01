import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Product } from "./product-data";


@Injectable({
   providedIn: 'root'
})
export class ApiService {
   constructor(private _http: HttpClient) { }


   /**
    * Retrieves test data from public api
    * 
    * @returns Observable<Product[]>
    */
   getProducts(): Observable<Product[]> {
      return this._http.get<Product[]>("https://flapotest.blob.core.windows.net/test/ProductData.json");
   }
}