import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  Category,
  ShoppingCartItem,
  User,
  UserRegistration,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  
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
  updateProfile(userId: string, updatedProfile: any) {
    const url = `${this.baseurl2}Auth/ProfileEdit`;
    const params = new HttpParams().set('userId', userId);
    return this.http.put(url, updatedProfile, { params });
  }
  getAccountDetails(id:string){
    
    const url = `${this.baseurl2}Auth/ProfileView`;  // Adjust the endpoint according to your API
    const params = new HttpParams().set('userId', id);
    // Now you can make the HTTP request with userId included as a query parameter
    return this.http.get(url, { params });
  }
  getProduct(id: string) {
    let url = this.baseurl2 + 'Product/' + id;
    return this.http.get(url);
  }
  registerForEWallet(userId: string, registrationData: any) {
    const url = `${this.baseurl2}EWallet?userId=${userId}`;
    return this.http.post(url, registrationData, { responseType: 'text' });
  }

  rechargeEWallet(userId: string, rechargeData: any) {
    const url = `${this.baseurl2}EWallet/RechargeWallet?userId=${userId}`;
    return this.http.put(url, rechargeData, { responseType: 'text' });
  }

  changeEWalletPassword(userId: string, passwordChangeData: any) {
    const url = `${this.baseurl2}EWallet/ChangePassword?userId=${userId}`;
    return this.http.put(url, passwordChangeData, { responseType: 'text' });
  }

  forgetEWalletPassword(userId: string, forgetPasswordData: any) {
    const url = `${this.baseurl2}EWallet/ForgetPassword?userId=${userId}`;
    return this.http.put(url, forgetPasswordData, { responseType: 'text' });
  }

  checkEWalletBalance(userId: string) {
    const url = `${this.baseurl2}EWallet/CheckBalance?userId=${userId}`;
    return this.http.get(url, { responseType: 'text' });
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

  

  

  getAllCartItems(userId: string): Observable<ShoppingCartItem[]> {
    const url = `${this.baseurl2}ShoppingCart?userId=${userId}`;
    return this.http.get<ShoppingCartItem[]>(url);
  }

  addToCart(userId: string, productId: string): Observable<any> {
    const url = `${this.baseurl2}ShoppingCart/${productId}?userId=${userId}`;
    return this.http.post(url, null);
  }

  deleteCartItem(userId: string, productId: string): Observable<any> {
    const url = `${this.baseurl2}ShoppingCart/${productId}?userId=${userId}`;
    return this.http.delete(url);
  }

  updateItemCountPlus(userId: string, productId: string): Observable<any> {
    const url = `${this.baseurl2}ShoppingCart/IncreaseCountByone/${productId}?userId=${userId}`;
    return this.http.put(url, null);
  }

  updateItemCountMinus(userId: string, productId: string): Observable<any> {
    const url = `${this.baseurl2}ShoppingCart/decreaseCountByone/${productId}?userId=${userId}`;
    return this.http.put(url, null);
  }

  getCartItemById(userId: string, productId: string): Observable<any> {
    const url = `${this.baseurl2}/${productId}?userId=${userId}`;
    return this.http.get(url);
  }
  placeOrder(userId: string, payment: any): Observable<any> {
    const url = `${this.baseurl2}OrderDetails?userId=${userId}`;
    
    // Set the content type to application/json
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      // Set responseType to 'text' to prevent JSON parsing
      responseType: 'text' as 'json'
    };

    // Make the HTTP POST request with the payment data as the request body
    return this.http.post(url, payment, httpOptions);
  }
  cancelOrder(userId: string, orderId: string): Observable<any> {
    const url = `${this.baseurl2}OrderDetails?userId=${userId}&orderId=${orderId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      // Set responseType to 'text' to prevent JSON parsing
      responseType: 'text' as 'json'
    };
    return this.http.delete<any>(url, httpOptions); // Pass httpOptions to the delete method
  }
  getAllOrders(userId: string): Observable<any> {
    const url = `${this.baseurl2}OrderDetails?userId=${userId}`;
    return this.http.get(url);
  }
getTransactionListOfUser(userId: string): Observable<any> {
    const apiUrl = `${this.baseurl2}Auth/TransactionListOfUser?userId=${userId}`;
    return this.http.get(apiUrl);
  }
  getExactOrder(userId: string, orderId: string): Observable<any> {
    const url = `${this.baseurl2}OrderDetails/${orderId}?userId=${userId}`;
    return this.http.get(url);
  }
  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseurl2}Product`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl2}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl2}Product/Add`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseurl2}Product/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl2}Product/${id}`);
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseurl2}Category`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseurl2}/${id}`);
  }

  addCategory(category: any): Observable<Category> {
    return this.http.post<Category>(`${this.baseurl2}Category`, category);
  }

  updateCategory(id: number, category: any): Observable<Category> {
    return this.http.put<Category>(`${this.baseurl2}Category/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl2}Category/${id}`);
  }
  getAllOrdersOfVender(userId: string): Observable<any> {
    return this.http.get(`${this.baseurl2}OrderDetails/Vender?userId=${userId}`);
  }

  getExactOrderOfVender(userId: string, id: string): Observable<any> {
    return this.http.get(`${this.baseurl2}OrderDetails/VenderExactOrder?userId=${userId}&id=${id}`);
  }
  // Add new method...
  // addToCart(userid: number, productid: string) {
    // let url = this.baseurl + 'InsertCartItem/' + userid + '/' + productid;
    // return this.http.post(url, null, { responseType: 'text' });
  // }

}
