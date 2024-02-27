import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, Product2, Product3} from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  imageIndex: number = 1;
  product!: Product2;
  reviewControl = new FormControl('');
  showError = false;
  reviewSaved = false;
  category: Category = {
    id: 0,
    category: '',
    subCategory: '',
  };
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;
        this.category = {
          id:this.product.categoryId,
          category: res.categoryName,
          subCategory: res.subCategoryName,
        }
        //this.getRelatedProducts(res.categoryName, res.subCategoryName); // Corrected function call
      });
    });
  
  }
  // getRelatedProducts(category: string, subcategory: string): void {
  //   // Make API call to get related products
  //   this.navigationService.getProducts(
  //     category,subcategory,5
  //   )
  //     .subscribe((products: Product2[]) => {
  //       this.relatedProducts = products;
  //     });
  // }
    splitDescriptionByNewLine(): string[] {
      if (this.product && this.product.description) {
        return this.product.description.split(/\r?\n/);
      }
      return [];
    }
  }

  

  
