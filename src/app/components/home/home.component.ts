import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { count } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { HomeDataService } from 'src/app/shared/services/home-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  proudcts: Product[] = [];
  categories: any[] = [];

  time: any = new Date();
  searchTerm: string = '';

  wishListData: string[] = [];

  constructor(
    private _HomeDataService: HomeDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  numOfCartItems: number = 0;
  mainSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this._HomeDataService.getAllProduct().subscribe({
      next: (res) => {
        this.proudcts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._HomeDataService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });

    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        const newData = res.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  AddProduct(id: string): void {
    this._CartService.AddToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Fresh Cart');
        this._CartService.numOfCartItems.next(res.numOfCartItems);
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
        this._WishlistService.count.next(res.data.length);
      },

      error: (err) => {
        console.log(err);
        this._ToastrService.success(err.error.message, 'Fresh Cart');
      },
    });
  }
}
