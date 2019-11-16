import { Injectable } from '@angular/core';
import { map, filter, exhaustMap, catchError } from 'rxjs/operators';
import { StoreService } from './store.service';
import { ProductActions } from './shared/state';
import { ProductsApiService } from './products-api.service';
import { of, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private loadProducts$ = this.store.actions$.pipe(
    filter(action => action.type === ProductActions.loadProducts.type),
    exhaustMap(() => 
      this.productsApiService.all().pipe(
        map(products => ProductActions.loadProductsSuccess({ products })),
        catchError(error => of(ProductActions.loadProductsFailure({ error })))
    ))
  );

  constructor(
    private store: StoreService,
    private productsApiService: ProductsApiService
  ) {}

  init() {
    merge(this.loadProducts$).subscribe(this.store);
  }  
}
