import { Component } from '@angular/core';
import { selectProducts, ProductActions } from '../shared/state';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products$ = this.store.select(selectProducts);

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts());
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
