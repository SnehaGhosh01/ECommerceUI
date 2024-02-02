import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Product2 } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: Product2[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    // Subscribe to route changes
    this.activatedRoute.queryParams.subscribe((params: any) => {
      // Check if there is a search query
      const searchQuery = params.search;
      if (searchQuery) {
        // Fetch products based on search query
        this.fetchProductsBySearch(searchQuery);
      } else {
        // Fetch products based on category/subcategory
        const category = params.category;
        const subcategory = params.subcategory;
        if (category && subcategory) {
          this.fetchProductsByCategory(category, subcategory);
        }
      }
    });
  }

  // Function to fetch products based on search query
  private fetchProductsBySearch(searchQuery: string): void {
    this.navigationService.getSerachedProducts(searchQuery).subscribe((res: any) => {
      this.products = res;
    });
  }

  // Function to fetch products based on category/subcategory
  private fetchProductsByCategory(category: string, subcategory: string): void {
    this.navigationService.getProducts(category, subcategory, 10).subscribe((res: any) => {
      this.products = res;
    });
  }

  // Function to handle sorting by price
  sortByPrice(sortKey: string): void {
    this.products.sort((a, b) => {
      if (sortKey === 'default') {
        return a.productId > b.productId ? 1 : -1;
      }
      return (
        (sortKey === 'htl' ? 1 : -1) *
        ((a.price) >
        (b.price)
          ? -1
          : 1)
      );
    });
  }
}
