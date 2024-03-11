import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cashcheckout',
  templateUrl: './cashcheckout.component.html',
  styleUrls: ['./cashcheckout.component.css'],
})
export class CashcheckoutComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  cashData: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });

  cashId: any = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cashId = param.get('id');
        console.log(this.cashId);
      },
    });
  }

  handleForm() {
    console.log(this.cashData.value);
    this._CartService.Cashcheckout(this.cashId, this.cashData.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
