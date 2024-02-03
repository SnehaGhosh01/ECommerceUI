import { Component, OnInit } from '@angular/core';
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
  totalCartValue: number = 0;
  totalProductCount: number = 0;

  constructor(
    private navigationService: NavigationService,
    private router: Router,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.userId = this.utilityService.getUserIdFromLocalStorage();
    this.loadCartItems();
    console.log(this.cartItems);
  }

  loadCartItems() {
    this.navigationService.getAllCartItems(this.userId).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotalCartValue();
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }

  calculateTotalCartValue() {
    this.totalCartValue = this.cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
  }
  calculateTotalProductCount() {
    this.totalProductCount = this.cartItems.reduce(
      (count, item) => count + item.count,
      0
    );
  }
  updateCartCount() {
    // For example, you might want to update some UI element or perform an action
    console.log('Cart count updated:', this.totalProductCount);
    return this.totalProductCount;
    // Add your logic here
  }
  addToCart(productId: string) {
    this.navigationService.addToCart(this.userId, productId).subscribe(
      () => {
        console.log('Item added to cart successfully');
        this.router.navigate(['/cart']);
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
        //this.utilityService.changeCart.next(-1);
        console.log('Item deleted from cart successfully');
        this.updateCartCount();
        this.loadCartItems();
      },
      (error) => {
        console.error('Error deleting item from cart:', error);
      }
    );
  }

  updateItemCountPlus(productId: string) {
    this.navigationService
      .updateItemCountPlus(this.userId, productId)
      .subscribe(
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
    this.navigationService
      .updateItemCountMinus(this.userId, productId)
      .subscribe(
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

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
