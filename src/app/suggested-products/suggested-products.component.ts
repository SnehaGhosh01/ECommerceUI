import { Component, Input, OnInit } from '@angular/core';
import { Category, Product, Product2 } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css'],
})
export class SuggestedProductsComponent implements OnInit {
  @Input() category: Category = {
    id: 0,
    category: '',
    subCategory: '',
  };
  @Input() count: number = 3;
  products: Product2[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService
    .getProducts(
      this.category.category,
      this.category.subCategory,
      this.count
    )
    .subscribe((res: any[]) => {
      for (let product of res) {
        this.products.push(product);
      }
    });
  }
}
