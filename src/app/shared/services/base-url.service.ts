import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlService {
  constructor() {}

  BaseUrl: string = `https://ecommerce.routemisr.com`;
  BaseCartUrl: string = `https://ecommerce.routemisr.com/api/v1/cart`;
}
