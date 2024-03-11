import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './shared/guard/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandComponent } from './components/brand/brand.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CashcheckoutComponent } from './components/cashcheckout/cashcheckout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'details/:id', component: DetailsComponent, title: 'Details' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout' },
      {
        path: 'cashcheckout/:id',
        component: CashcheckoutComponent,
        title: 'Cash Checkout',
      },
      { path: 'category/:id', component: CategoryComponent, title: 'Category' },
      { path: 'brand/:id', component: BrandComponent, title: 'Brand' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'allorders', component: AllordersComponent, title: 'ALL Orders' },
      { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'forgetpassword',
        component: ForgetpasswordComponent,
        title: 'Forget Password',
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
