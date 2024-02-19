import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { EWalletComponent } from './e-wallet/e-wallet.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { CategoryComponent } from './category/category.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'orders/:orderId', component: OrderComponent },
  { path: 'ewallet-recharge', component: EWalletComponent },
  { path: 'search', component: SearchComponent },
  { path: 'account', component: AccountComponent },
  { path: 'ewallet', component: EWalletComponent },
  { path: 'checkout', component: CheckoutComponent },
  {path: 'transactions', component: TransactionsComponent},
  {path: 'productlist', component: ProductaddComponent},
  {path: 'orderlist', component: OrderlistComponent},
  {path: 'orderlist/:orderId', component: OrderlistComponent},
  { path: 'add-product', component: ProductaddComponent },
  {path: 'category', component: CategoryComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
