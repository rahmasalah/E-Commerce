import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private _HttpClient: HttpClient,
    private _BaseUrlService: BaseUrlService
  ) {}

  AddToCart(id: string): Observable<any> {
    return this._HttpClient.post(this._BaseUrlService.BaseCartUrl, {
      productId: id,
    });
  }

  userCart(): Observable<any> {
    return this._HttpClient.get(this._BaseUrlService.BaseCartUrl);
  }

  deletItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${this._BaseUrlService.BaseCartUrl}/${id}`);
  }

  changeProductCount(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this._BaseUrlService.BaseCartUrl}/${id}`, {
      count: count,
    });
  }

  checkout(cartId: string, userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://rahmasalah.github.io/E-Commerce/login`,
      {
        shippingAddress: userData,
      }
    );
  }
}
