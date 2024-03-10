import { count } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent {
  count: number = 0;
  constructor(
    private _AuthService: AuthService,
    private _WishlistService: WishlistService
  ) {
    _WishlistService.count.subscribe((res) => {
      this.count = res;
    });
  }

  logOut(): void {
    this._AuthService.logOutUser();
  }
}
