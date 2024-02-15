export interface SuggestedProduct {
  banerimage: string;
  category: Category;
}

export interface NavigationItem {
  category: string;
  subcategories: string[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobile: string;
  password: string;
  createdAt: string;
  modifiedAt: string;
}
export class WalletRechargeModel {
  cardNumber: number;
  cvvNumber: number;
  cardHolderName: string;
  amount: number;

  constructor(
    cardNumber: number,
    cvvNumber: number,
    cardHolderName: string,
    amount: number
  ) {
    this.cardNumber = cardNumber;
    this.cvvNumber = cvvNumber;
    this.cardHolderName = cardHolderName;
    this.amount = amount;
  }
}
export interface PlaceOrderDto{
  method: string;
  password: string;
  address: string;
  name: string;
  mobile: string;
}
export interface ShoppingCartItem {
  productId: string;
  productName: string;
  count: number;
  stock: number;
  price: number;
  totalPrice: number;
  imageUrl: string;
  // Add other properties as needed
}
export interface UserRegistration {
  email: string;
  name: string;
  address: string;
  phone_Number: string;
  password: string;
}

// #region Product



export interface Category {
  id: number;
  category: string;
  subCategory: string;
}
export interface ApplicationCategory {
  id: number;
  category: string;
}

export interface Product2 {
  productId: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number; // Assuming Category is another TypeScript interface
  venderId: string; // Assuming ApplicationUser is another TypeScript interface
}
export interface Product3 {
  productId: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryName:string;
  subCategoryName:string;
  venderEmail: string; // Assuming Category is another TypeScript interface
   // Assuming ApplicationUser is another TypeScript interface
}
export class Product4 {
 
  productName: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryName: string;
  subCategoryName: string;
  venderEmail: string;

  constructor() {
    
    this.productName = '';
    this.description = '';
    this.price = 0;
    this.stock = 0;
    this.imageUrl = '';
    this.categoryName = '';
    this.subCategoryName = '';
    this.venderEmail = '';
  }
}
export interface GroupedProduct {
  category: string;
  subcategory: string;
  items: Product3[];
}


