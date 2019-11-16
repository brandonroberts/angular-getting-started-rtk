import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get('/assets/products.json')
      .pipe(map((res: any) => res.products))
  }  
}
