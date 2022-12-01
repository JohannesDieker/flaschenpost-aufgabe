import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent {
  @Output() columCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() changeFilter = new EventEmitter<boolean>();
  sort = 'dsc';
  filter = false;

  constructor() { }

  /**
   * sets and emits the new sort-value, 'asc' or 'dsc'
   * 
   * @param newSort string
   */
  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  /**
   * emits the new number of columns to change the layout
   * 
   * @param colNum number
   */
  onColumnsUpdated(colNum: number): void {
    this.columCountChange.emit(colNum);
  }

  /**
   * sets and emits value if filter is activated 
   */
  onChangeFilter(): void {
    this.filter = !this.filter;
    this.changeFilter.emit(this.filter);
  }
}
