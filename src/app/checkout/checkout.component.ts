import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { PlaceOrderDto, ShoppingCartItem } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  accountDetails: any;
  cartItems: ShoppingCartItem[] = [];
  totalCartValue: number = 0;

  constructor(
    private navigationService: NavigationService,
    private utilityService: UtilityService,private router:Router
  ) {}

  ngOnInit(): void {
    this.loadAccountDetails();
    this.loadCartItems();

    // Initialize form controls for checkout
    this.checkoutForm = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      phone_Number: new FormControl(''),
      paymentMethod: new FormControl(''), // Assuming you have a paymentMethod control
      ewalletPassword: new FormControl(''),
    });
  }

  loadAccountDetails() {
    const userId = this.utilityService.getUserIdFromLocalStorage();

    this.navigationService.getAccountDetails(userId).subscribe({
      next: (details: any) => {
        this.accountDetails = details;

        // Update form controls with fetched user details
        this.checkoutForm.patchValue({
          name: this.accountDetails.name || '',
          address: this.accountDetails.address || '',
          phone_Number: this.accountDetails.phone_Number || '',
        });
      },
      error: (error) => {
        console.error('Error fetching account details:', error);
      },
    });
  }

  loadCartItems() {
    const userId = this.utilityService.getUserIdFromLocalStorage();

    this.navigationService.getAllCartItems(userId).subscribe({
      next: (items: ShoppingCartItem[]) => {
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

  placeOrder(): void {
    const userId = this.utilityService.getUserIdFromLocalStorage();

    // Prepare payload for placing order
    debugger;
    let payment:PlaceOrderDto={
      address: this.checkoutForm.get('address')?.value,
      name: this.checkoutForm.get('name')?.value,
      mobile: this.checkoutForm.get('phone_Number')?.value,
      method: this.checkoutForm.get('paymentMethod')?.value,
      password: this.checkoutForm.get('paymentMethod')?.value === 'E-Wallet'
        ? this.checkoutForm.get('ewalletPassword')?.value || ''
        : ''
    };
    console.log('Order Payload:', payment);
    debugger;
    // Call your backend API to place the order
    this.navigationService.placeOrder(userId, payment).subscribe(
      (response: any) => {
        console.log('Place Order Response:', response);
        alert(response);
        this.router.navigate(['/cart']);
        // You can handle the success scenario here
      },
      (error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
        // You can handle the error scenario here
      }
    );
  }
}
