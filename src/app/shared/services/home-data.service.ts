import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {
  constructor(
    private _HttpClient: HttpClient,
    private _BaseUrlService: BaseUrlService
  ) {}

  getAllProduct(): Observable<any> {
    return this._HttpClient.get(
      `${this._BaseUrlService.BaseUrl}/api/v1/products`
    );
  }

  getDetails(Id: string): Observable<any> {
    return this._HttpClient.get(
      `${this._BaseUrlService.BaseUrl}/api/v1/products/${Id}`
    );
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(
      `${this._BaseUrlService.BaseUrl}/api/v1/categories`
    );
  }

  getBrands(): Observable<any> {
    return this._HttpClient.get(
      `${this._BaseUrlService.BaseUrl}/api/v1/brands`
    );
  }

  getSpecific(type: string, id: string): Observable<any> {
    return this._HttpClient.get(
      `${this._BaseUrlService.BaseUrl}/api/v1/products?${type}=${id}`
    );
  }
}
