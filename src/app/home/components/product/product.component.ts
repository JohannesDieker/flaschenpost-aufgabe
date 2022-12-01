import { Component, Input } from '@angular/core';
import { renderedProduct } from 'src/app/product-data';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  @Input() fullWidth: boolean = false;
  @Input() product: renderedProduct | undefined;
}
