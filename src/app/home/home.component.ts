import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ApiService } from "../api-service";
import { renderedProduct } from "../product-data";

const ROW_HEIGHT: { [id: number]: number } = { 1: 210, 5: 210 };

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  columns = 1;
  rowHeight = ROW_HEIGHT[this.columns];
  products: any = [];
  formattedProducts: any = [];
  filter: boolean = false;
  dataSubscription: Subscription | undefined;

  constructor(private _apiservice: ApiService) { }


  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.getProducts();
  }


  /**
   * Sets the input columns and corresponding row height
   * 
   * @param columnsNumber input number for columns, changes on layout buttons
   */
  onColumnsOnChange(columnsNumber: number): void {
    this.columns = columnsNumber;
    this.rowHeight = ROW_HEIGHT[this.columns];
  }


  /**
   * calls sortProducts() to sort the displayed data
   * 
   * @param sort string
   */
  onSortChange(sort: string): void {
    this.sortProducts(sort);
  }

  /**
   * sets the new filter value
   * 
   * @param newFilter boolean
   */
  onChangeFilter(newFilter: boolean) {
    this.filter = newFilter;
  }


  /**
   * calls apiservice and sets provided data
   */
  getProducts(): void {
    this._apiservice.getProducts().subscribe(products => {
      this.products = products;
      this.formatProducts();
    })
  }


  /**
   * formats products for easier handling later, creates an object for each article in product and saves it in formattedProducts
   */
  formatProducts(): void {
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.products[i].articles.length; j++) {
        let toAdd: renderedProduct = {
          name: this.products[i].name,
          shortDescription: this.products[i].articles[j].shortDescription,
          pricePerUnitText: this.products[i].articles[j].pricePerUnitText,
          image: this.products[i].articles[j].image,
          price: this.products[i].articles[j].price
        };
        this.formattedProducts?.push(toAdd);
      }
    }
  }


  /**
   * sorts products by price, either ascending or descending
   * 
   * @param sort string, 'asc' or 'dsc'
   */
  sortProducts(sort: string): void {
    if (sort == 'asc') {
      this.formattedProducts = this.formattedProducts.sort((n1: any, n2: any) =>
        n1.price - n2.price)
    }
    if (sort == 'dsc') {
      this.formattedProducts = this.formattedProducts.sort((n1: any, n2: any) =>
        n2.price - n1.price)
    }
  }

  /**
   * checks the price of current product and if it is supposed to be rendered
   * 
   * @param products products fetched by api
   * @returns isFilter boolean if price is higher than 2.00€ 
   */
  checkPrice(products: renderedProduct): boolean {
    let renderTile = true;
    
    if (this.filter) {
      let price = parseInt(products.pricePerUnitText.replace(/[^0-9]/g, ''));

      if (price > 200) {
        renderTile = false;
      }
    }
    return renderTile;
  }
}