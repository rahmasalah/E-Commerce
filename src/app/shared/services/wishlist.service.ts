import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  count: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(
    private _HttpClient: HttpClient,
    private _BaseUrlService: BaseUrlService
  ) {
    this.getWishlist().subscribe({
      next: (res) => {
        this.count.next(res.count);
        console.log(res);
      },
    });
  }

  addToWishlist(productID: string): Observable<any> {
    return this._HttpClient.post(
      this._BaseUrlService.BaseUrl + `/api/v1/wishlist`,
      {
        productId: productID,
      }
    );
  }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(
      this._BaseUrlService.BaseUrl + `/api/v1/wishlist`
    );
  }

  removeItem(productID: string): Observable<any> {
    return this._HttpClient.delete(
      this._BaseUrlService.BaseUrl + `/api/v1/wishlist/${productID}`
    );
  }
}
