import { Component, Input, OnInit } from '@angular/core';
import { Product2 } from '../models/models';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid';
  @Input() product: Product2 = {
    productId: '',
    productName: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl:'',
    categoryId: 0,// Assuming Category is another TypeScript interface
    venderId:''
  };

  constructor(public utilityService: UtilityService) {}

  ngOnInit(): void {}
}
