import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { HomeDataService } from 'src/app/shared/services/home-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(private _HomeDataService: HomeDataService) {}

  brandsData: Product[] = [];

  ngOnInit(): void {
    this._HomeDataService.getBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
