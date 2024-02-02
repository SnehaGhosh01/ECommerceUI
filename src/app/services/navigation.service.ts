import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import {
  Category,
  Order,
  Payment,
  PaymentMethod,
  User,
  UserRegistration,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  baseurl = 'https://localhost:7149/api/Shopping/';
  baseurl2 = 'http://localhost:5073/api/';

  constructor(private http: HttpClient) {}

  getCategoryList() {
    let url = this.baseurl2 + 'Category';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.name,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }

  getProducts(category: string, subcategory: string, count: number) {
    return this.http.get<any[]>(this.baseurl2 + 'Product/GetSuggestedProduct', {
      params: new HttpParams()
        .set('category', category)
        .set('subcategory', subcategory)
        .set('count', count),
    });
  }

  getProduct(id: string) {
    let url = this.baseurl2 + 'Product/' + id;
    return this.http.get(url);
  }
  getSerachedProducts(name:string){
    const params = new HttpParams().set('name', name);
  const url = `${this.baseurl2}Product/SearchByProductName`;
  return this.http.get(url, { params });
  }

  registerUser(user: UserRegistration) {
    let url = this.baseurl2 + 'Auth/UserRegister';
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseurl2 + 'Auth/Login';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userid: number, productid: number, review: string) {
    let obj: any = {
      User: {
        Id: userid,
      },
      Product: {
        Id: productid,
      },
      Value: review,
    };

    let url = this.baseurl + 'InsertReview';
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseurl + 'GetProductReviews/' + productId;
    return this.http.get(url);
  }

  addToCart(userid: number, productid: string) {
    let url = this.baseurl + 'InsertCartItem/' + userid + '/' + productid;
    return this.http.post(url, null, { responseType: 'text' });
  }

  getActiveCartOfUser(userid: number) {
    let url = this.baseurl + 'GetActiveCartOfUser/' + userid;
    return this.http.get(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseurl + 'GetAllPreviousCartsOfUser/' + userid;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseurl + 'GetPaymentMethods';
    return this.http.get<PaymentMethod[]>(url);
  }

  insertPayment(payment: Payment) {
    return this.http.post(this.baseurl + 'InsertPayment', payment, {
      responseType: 'text',
    });
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseurl + 'InsertOrder', order);
  }
}
