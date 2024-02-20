import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private utilityService: UtilityService,private router:Router,private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadAccountDetails();
    this.loadCartItems();

    // Initialize form controls for checkout
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phone_Number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      paymentMethod: ['', Validators.required],
      ewalletPassword: [''],
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
    const address = this.checkoutForm.get('address')?.value;
    const pin = this.checkoutForm.get('pin')?.value;
  
    // Check if the pin is already included in the address
    const updatedAddress = address.includes(pin) ? address : `${address} -${pin}`;
    // Prepare payload for placing order
    debugger;
    let payment:PlaceOrderDto={
      address:updatedAddress,
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
