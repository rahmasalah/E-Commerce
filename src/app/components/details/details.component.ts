import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { HomeDataService } from 'src/app/shared/services/home-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  detailSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  productDetails: Product = {} as Product;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _HomeDataService: HomeDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        let productId: any = param.get('id');
        this._HomeDataService.getDetails(productId).subscribe({
          next: (res) => {
            this.productDetails = res.data;
          },
        });
      },
    });
  }

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
}
