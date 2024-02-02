// search.component.ts

// Import necessary modules and services
/*import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router module
import { NavigationService } from '../services/navigation.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private productService: NavigationService, private router: Router) {}  // Inject the Router module

  search() {
    if (this.searchQuery.trim() === '') {
      // Don't perform empty searches
      return;
    }

    // Call your productService method to get search results
    this.productService.getSerachedProducts(this.searchQuery).subscribe({
      next: (results: any) => {
        this.searchResults = results;
      },
      error: (error: any) => {
        console.error('Error fetching search results:', error);
      }
    });
  }

  // Function to display product name in the input field
  displayFn(result: any): string {
    return result && result.productName ? result.productName : '';
  }

  // Function to handle autocomplete option selected
  optionSelected(event: MatAutocompleteSelectedEvent): void {
    // Extract the selected product from the event
    const selectedProduct = event.option.value;

    // Make an API call to get detailed information for the selected product
    this.productService.getProduct(selectedProduct.productId).subscribe({
      next: (productDetails: any) => {
        // Assuming you have a route for product details, navigate with the fetched details
        this.router.navigate(['/product-details'], { queryParams: { id: selectedProduct.productId }, state: { product: productDetails } });
      },
      error: (error: any) => {
        console.error('Error fetching product details:', error);
      }
    });
  }
}*/
// search.component.ts

// search.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private productService: NavigationService, private router: Router) {}

  search() {
    if (this.searchQuery.trim() === '') {
      // Don't perform empty searches
      return;
    }

    this.productService.getSerachedProducts(this.searchQuery).subscribe({
      next: (results: any) => {
        this.searchResults = results;
      },
      error: (error: any) => {
        console.error('Error fetching search results:', error);
      }
    });
  }

  displayFn(result: any): string {
    return result && result.productName ? result.productName : '';
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedProduct = event.option.value;

    this.productService.getProduct(selectedProduct.productId).subscribe({
      next: (productDetails: any) => {
        this.router.navigate(['/product-details'], { queryParams: { id: selectedProduct.productId }, state: { product: productDetails } });
      },
      error: (error: any) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  // Handle Enter key press
  handleEnterKey(event: Event): void {
  if (event instanceof KeyboardEvent && event.key === 'Enter') {
    // Check if any option is selected, if not, redirect to products
    if (!this.searchResults.find(result => result.productName === this.searchQuery)) {
      // Redirect to the product list based on the current search query
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
    }
  }
}
}
