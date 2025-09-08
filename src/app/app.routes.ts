import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Categories } from './features/categories/categories';
import { Brands } from './features/brands/brands';
import { LogIn } from './features/log-in/log-in';
import { SignUp } from './features/sign-up/sign-up';
import { Products } from './features/products/products';
import { NotFound } from './features/not-found/not-found';
import { Cart } from './features/cart/cart';
import { ProductDetails } from './features/product-details/product-details';
import { authGuard } from './core/guards/auth-guard';
import { loggedInGuard } from './core/guards/logged-in-guard';
import { Password } from './features/password/password';
import { CheckOut } from './features/check-out/check-out';
import { AllOrders } from './features/all-orders/all-orders';
import { OrderChild } from './features/order-child/order-child';
import { OrderUserChild } from './features/order-user-child/order-user-child';

export const routes: Routes = [
    { path: '', component: Home, title: 'Home' },
    { path: 'products', component: Products, title: 'Products' },
    { path: 'product-details/:id', component: ProductDetails, title: 'Product Details' },
    { path: 'cart', component: Cart, title: 'Cart', canActivate: [authGuard] },
    {
        path: 'allorders', component: AllOrders, canActivate: [authGuard], title: 'All Orders', children: [
            { path: '', redirectTo: 'userOrder', pathMatch: 'full' },
            { path: 'userOrder', component: OrderChild },
            { path: 'userData', component: OrderUserChild }
        ]
    },
    { path: 'checkOut/:id', component: CheckOut, title: 'Payment', canActivate: [authGuard] },
    { path: 'categories', component: Categories, title: 'Categories' },
    { path: 'brands', component: Brands, title: 'Brands' },
    { path: 'logIn', component: LogIn, title: 'LogIn', canActivate: [loggedInGuard] },
    { path: 'signUp', component: SignUp, title: 'SignUp', canActivate: [loggedInGuard] },
    { path: 'resetPassword', component: Password, title: 'Forot Password', canActivate: [loggedInGuard] },
    { path: '**', component: NotFound, title: 'Not Found' },
];