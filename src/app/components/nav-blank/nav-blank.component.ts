import { count } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent {
  count: number = 0;
  constructor(
    private _AuthService: AuthService,
    private _WishlistService: WishlistService,
    private _CartService: CartService
  ) {
    _WishlistService.count.subscribe((res) => {
      this.count = res;
    });

    this._CartService.numOfCartItems.subscribe({
      next: (res) => {
        this.numOfCartItems = res;
      },
    });
  }

  numOfCartItems: number = 0;

  logOut(): void {
    this._AuthService.logOutUser();
  }
}
