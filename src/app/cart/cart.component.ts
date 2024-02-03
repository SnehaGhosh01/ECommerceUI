import { Component, OnInit } from '@angular/core';
import { Cart, Payment } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

import { ShoppingCartItem } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userId: string = ''; // Set the user ID as needed
  cartItems: ShoppingCartItem[] = [];

  constructor(private navigationService: NavigationService,private router: Router,private utilityService: UtilityService) {}

  ngOnInit(): void {
    this.userId = this.utilityService.getUserIdFromLocalStorage();
    this.loadCartItems();
    console.log(this.cartItems);
  }

  loadCartItems() {
    this.navigationService.getAllCartItems(this.userId).subscribe({
      next: (items) => {
        this.cartItems = items;
        console.log(this.cartItems);
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
      // You can include the complete callback if needed
      // complete: () => {
      //   console.log('Subscription completed');
      // }
    });
  }
  

  addToCart(productId: string) {
    this.navigationService.addToCart(this.userId, productId).subscribe(
      () => {
        console.log('Item added to cart successfully');
        this.loadCartItems();
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
  navigateToProductDetails(id: string) {
    this.router.navigate(['/product-details'], { queryParams: { id: id } });
  }

  deleteCartItem(productId: string) {
    this.navigationService.deleteCartItem(this.userId, productId).subscribe(
      () => {
        console.log('Item deleted from cart successfully');
        this.loadCartItems();
      },
      (error) => {
        console.error('Error deleting item from cart:', error);
      }
    );
  }

  updateItemCountPlus(productId: string) {
    this.navigationService.updateItemCountPlus(this.userId, productId).subscribe(
      () => {
        console.log('Item count increased successfully');
        this.loadCartItems();
      },
      (error) => {
        console.error('Error increasing item count:', error);
      }
    );
  }

  updateItemCountMinus(productId: string) {
    this.navigationService.updateItemCountMinus(this.userId, productId).subscribe(
      () => {
        console.log('Item count decreased successfully');
        this.loadCartItems();
      },
      (error) => {
        console.error('Error decreasing item count:', error);
      }
    );
  }

  getCartItemById(productId: string) {
    this.navigationService.getCartItemById(this.userId, productId).subscribe(
      (item) => {
        console.log('Item details:', item);
      },
      (error) => {
        console.error('Error fetching item details:', error);
      }
    );
  }
  checkout(){
    this.router.navigate(['/order']);
  }
}
