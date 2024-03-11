import { CashcheckoutComponent } from './../../components/cashcheckout/cashcheckout.component';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private _HttpClient: HttpClient,
    private _BaseUrlService: BaseUrlService
  ) {
    this.userCart().subscribe({
      next: (res) => {
        this.numOfCartItems.next(res.numOfCartItems);
      },
    });
  }

  numOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);

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

  Cashcheckout(cartId: string, userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        shippingAddress: userData,
      }
    );
  }
}
