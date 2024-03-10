import { Product } from 'src/app/shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) {}

  cartData: any = {};

  ngOnInit(): void {
    this._CartService.userCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProduct(id: string): void {
    this._CartService.deletItem(id).subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.changeProductCount(id, count).subscribe({
        next: (res) => {
          this.cartData = res.data;
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }
}
