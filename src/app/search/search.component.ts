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

import { Component, ElementRef, HostListener } from '@angular/core';
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
  showAutocomplete: boolean = false;

  constructor(private productService: NavigationService, private router: Router,private elementRef: ElementRef) {}
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showAutocomplete = false; // Hide autocomplete dropdown
    }
  }
  search() {
    if (this.searchQuery.trim() === '') {
      // Don't perform empty searches
      return;
    }

    this.productService.getSerachedProducts(this.searchQuery).subscribe({
      next: (results: any) => {
        this.searchResults = results;
        this.showAutocomplete=true;
      },
      error: (error: any) => {
        console.error('Error fetching search results:', error);
      }
    });
  }

  displayFn(result: any): string {
    return result && result.productName ? result.productName : '';
  }

  optionSelected(selectedProduct: any): void {
    this.productService.getProduct(selectedProduct.productId).subscribe({
      next: (productDetails: any) => {
        this.router.navigate(['/product-details'], { queryParams: { id: selectedProduct.productId }, state: { product: productDetails } });
        this.showAutocomplete = false; // Hide autocomplete dropdown after selection
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
    this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
    this.showAutocomplete = false;
  }
}
handleSearch(): void {
  if (this.searchResults.length !== 0) {
    this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
    this.showAutocomplete = false;
  } else {
    // If autocomplete dropdown is visible, don't navigate, let the user select from the dropdown
    this.showAutocomplete = true;
  }
}
}
