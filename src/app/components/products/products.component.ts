import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { HomeDataService } from 'src/app/shared/services/home-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _HomeDataService: HomeDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  productList: Product[] = [];
  ngOnInit(): void {
    this._HomeDataService.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  addProduct(id: string): void {
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
