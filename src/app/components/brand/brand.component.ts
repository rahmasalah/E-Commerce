import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { HomeDataService } from 'src/app/shared/services/home-data.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent {
  constructor(
    private _HomeDataService: HomeDataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  brandData: Product[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        let brandId: any = param.get('id');
        this._HomeDataService.getSpecific('brand', brandId).subscribe({
          next: (res) => {
            this.brandData = res.data;
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
