import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Product3, Product4 } from '../models/models'; // Import both Product3 and Product4 models
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {

  products: Product3[] = [];
  selectedProduct: Product3 | null = null;
  isEditMode: boolean = false;
  newProduct: Product4 = new Product4();
  categories: string[] = [];
  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;
  filteredProducts: Product3[] = [];
  isAddMode:boolean=false;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.getAllProducts();
    
  }

  getAllProducts(): void {
    this.navigationService.getAllProducts()
      .subscribe(
        (response: Product3[]) => {
          this.products = response;
          this.categories = this.getCategoryNames(); // Initialize categories
          this.filterProducts(); // Initialize filtered products
        },
        error => {
          console.error('Error getting products:', error);
        }
      );
  }

  getCategoryNames(): string[] {
    // Extract unique category names
    return Array.from(new Set(this.products.map(product => product.categoryName)));
  }

  getSubcategoryNames(category: string): string[] {
    // Extract unique subcategory names for a given category
    const productsInCategory = this.products.filter(product => product.categoryName === category);
    return Array.from(new Set(productsInCategory.map(product => product.subCategoryName)));
  }

  filterProducts(): void {
    if (this.selectedCategory && this.selectedSubcategory) {
      this.filteredProducts = this.products.filter(product =>
        product.categoryName === this.selectedCategory && product.subCategoryName === this.selectedSubcategory
      );
    } else if (this.selectedCategory && !this.selectedSubcategory) {
      this.filteredProducts = this.products.filter(product =>
        product.categoryName === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  onCategoryChange(): void {
    // Reset subcategory selection when category changes
    this.selectedSubcategory = null;
    this.filterProducts();
  }

  onSubcategoryChange(): void {
    // Filter products when subcategory changes
    this.filterProducts();
  }


  editProduct(product: Product3) {
    this.selectedProduct = { ...product };
    this.isEditMode = true;
    this.isAddMode = false; // Ensure add mode is off
  }

  cancelEdit(): void {
    this.selectedProduct = null;
    this.isEditMode = false;
  }

  cancelAdd(): void {
    this.isAddMode = false; // Turn off add mode
    this.newProduct = new Product4(); // Reset newProduct
  }
addProductForm(){
  this.isAddMode = true;
  this.isEditMode=true;
}
  addProduct(): void {
    
    this.navigationService.addProduct(this.newProduct)
        .subscribe(
          response => {
            console.log('Product added successfully:', response);
            this.getAllProducts(); // Refresh the product list
            this.newProduct = new Product4(); // Reset newProduct for adding more products
          },
          error => {
            console.error('Error adding product:', error);
            // Handle error message as needed
          }
        ); // Turn on add mode
    this.cancelEdit(); // Ensure edit mode is off
  }

  saveProduct(): void {
    // If selectedProduct exists, it's in edit mode
    if (this.selectedProduct) {
      this.navigationService.updateProduct(this.selectedProduct.productId, this.selectedProduct)
        .subscribe(
          response => {
            console.log('Product updated successfully:', response);
            this.getAllProducts(); // Refresh the product list
            this.cancelEdit(); // Exit edit mode
          },
          error => {
            console.error('Error updating product:', error);
            // Handle error message as needed
          }
        );
    } else { // If selectedProduct is null, it's in add mode
      this.navigationService.addProduct(this.newProduct)
        .subscribe(
          response => {
            console.log('Product added successfully:', response);
            this.getAllProducts(); // Refresh the product list
            this.newProduct = new Product4(); // Reset newProduct for adding more products
          },
          error => {
            console.error('Error adding product:', error);
            // Handle error message as needed
          }
        );
    }
  }

  deleteProduct(id: string): void {
    this.navigationService.deleteProduct(id)
      .subscribe(
        response => {
          console.log('Product deleted successfully:', response);
          this.getAllProducts(); // Refresh the product list
        },
        error => {
          console.error('Error deleting product:', error);
          // Handle error message as needed
        }
      );
  }
}
