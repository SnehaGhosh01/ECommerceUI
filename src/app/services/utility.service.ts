import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, window } from 'rxjs';
import { Cart, Payment, Product, Product2, ShoppingCartItem, User } from '../models/models';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  changeCart = new Subject();

  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService,
    private router: Router,
  ) {}

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

  // JWT Helper Service : npm install @auth0/angular-jwt

  getUserIdFromLocalStorage() {
    let userString = localStorage.getItem('user');
    if (userString != null) {
      return JSON.parse(userString).userId;
    }
  }
  getUserRoleFromLocalStorage() {
    let userString = localStorage.getItem('user');
    if (userString != null) {
      return JSON.parse(userString).role;
    }
  }
  getUser(): User {
    //let id=this.getUserIdFromLocalStorage();
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdAt,
      modifiedAt: token.modifiedAt,
    };
    return user;
  }

  setUser(token: any) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  // addToCart(product: Product2) {
  //   debugger;
  //   let productid = product.productId;

  //   let userid = this.getUserIdFromLocalStorage();
  //   debugger;
  //   this.navigationService.addToCart(userid, productid).subscribe((res) => {
  //     debugger;
  //     if (res.toString() === 'inserted') {
  //       this.changeCart.next(1);
  //     }
  //   });
  // }
  addToCart(product:Product2) {
    let productid = product.productId;
    let userId = this.getUserIdFromLocalStorage();
    this.navigationService.addToCart(userId, productid).subscribe(
      () => {
        console.log('Item added to cart successfully');
        this.changeCart.next(1);
        
        this.router.navigate(['/cart']);
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartitem of cart.cartItems) {
      payment.totalAmount += cartitem.product.price;

      payment.amountReduced +=
        cartitem.product.price -
        this.applyDiscount(
          cartitem.product.price,
          cartitem.product.offer.discount
        );

      payment.amountPaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offer.discount
      );
    }

    if (payment.amountPaid > 50000) payment.shipingCharges = 2000;
    else if (payment.amountPaid > 20000) payment.shipingCharges = 1000;
    else if (payment.amountPaid > 5000) payment.shipingCharges = 500;
    else payment.shipingCharges = 200;
  }

  calculatePricePaid(cart: Cart) {
    let pricepaid = 0;
    for (let cartitem of cart.cartItems) {
      pricepaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offer.discount
      );
    }
    return pricepaid;
  }

  orderTheCart() {}
}
