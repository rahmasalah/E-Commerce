import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { HomeDataService } from 'src/app/shared/services/home-data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private _HomeDataService: HomeDataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  categoryData: Product[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        let categoryId: any = param.get('id');
        this._HomeDataService.getSpecific('category', categoryId).subscribe({
          next: (res) => {
            this.categoryData = res.data;
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
