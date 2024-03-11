import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { HomeDataService } from 'src/app/shared/services/home-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _HomeDataService: HomeDataService) {}

  categoriesData: Product[] = [];

  ngOnInit(): void {
    this._HomeDataService.getCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
