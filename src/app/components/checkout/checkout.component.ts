import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  checkoutData: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });

  checkOutId: any = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.checkOutId = param.get('id');
        console.log(this.checkOutId);
      },
    });
  }

  handleForm() {
    console.log(this.checkoutData.value);
    this._CartService
      .checkout(this.checkOutId, this.checkoutData.value)
      .subscribe({
        next: (res) => {
          if (res.status == 'success') {
            window.open(res.session.url, '_self');
          }
        },
        error(err) {
          console.log(err);
        },
      });
  }
}
