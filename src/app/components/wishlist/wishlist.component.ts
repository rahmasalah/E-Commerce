import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  products: Product[] = [];
  wishListData: string[] = [];

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.products = res.data;
        const newData = res.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // this._WishlistService.count.next(res.data.length);

  AddProduct(id: string): void {
    this._CartService.AddToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Fresh Cart');
      },
      error(err) {
        console.log(err);
      },
    });
  }

  AddFav(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Fresh Cart');
        this.wishListData = res.data;
        this._WishlistService.count.next(res.data.length);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.success(err.error.message, 'Fresh Cart');
      },
    });
  }

  RemoveFav(id: string): void {
    this._WishlistService.removeItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Fresh Cart');
        this.wishListData = res.data;
        const fianlData = this.products.filter((item) =>
          this.wishListData.includes(item._id)
        );
        this.products = fianlData;
        this._WishlistService.count.next(res.data.length);
      },

      error: (err) => {
        console.log(err);
        this._ToastrService.success(err.error.message, 'Fresh Cart');
      },
    });
  }
}
