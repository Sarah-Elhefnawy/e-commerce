import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loggedInGuard } from './core/guards/logged-in-guard';
import { OrderChild } from './features/order-child/order-child';
import { OrderUserChild } from './features/order-user-child/order-user-child';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/home').then(c => c.Home), title: 'Home' },
    { path: 'products', loadComponent: () => import('./features/products/products').then(c => c.Products), title: 'Products' },
    {
        path: 'product-details/:id',
        data: { prerender: false },
        loadComponent: () => import('./features/product-details/product-details').then(c => c.ProductDetails),
        title: 'Product Details'
    },
    { path: 'cart', loadComponent: () => import('./features/cart/cart').then(c => c.Cart), title: 'Cart', canActivate: [authGuard] },
    { path: 'wishList', loadComponent: () => import('./features/wish-list/wish-list').then(c => c.WishList), title: 'Wish List', canActivate: [authGuard] },
    {
        path: 'allorders', loadComponent: () => import('./features/all-orders/all-orders').then(c => c.AllOrders), canActivate: [authGuard], title: 'All Orders',
        children: [
            { path: '', redirectTo: 'userOrder', pathMatch: 'full' },
            { path: 'userOrder', component: OrderChild },
            { path: 'userData', component: OrderUserChild }]
    },
    {
        path: 'checkOut/:id',
        data: { prerender: false },
        loadComponent: () => import('./features/check-out/check-out').then(c => c.CheckOut),
        title: 'Payment',
        canActivate: [authGuard]
    },
    { path: 'categories', loadComponent: () => import('./features/categories/categories').then(c => c.Categories), title: 'Categories' },
    { path: 'brands', loadComponent: () => import('./features/brands/brands').then(c => c.Brands), title: 'Brands' },
    { path: 'logIn', loadComponent: () => import('./features/log-in/log-in').then(c => c.LogIn), title: 'LogIn', canActivate: [loggedInGuard] },
    { path: 'signUp', loadComponent: () => import('./features/sign-up/sign-up').then(c => c.SignUp), title: 'SignUp', canActivate: [loggedInGuard] },
    { path: 'resetPassword', loadComponent: () => import('./features/password/password').then(c => c.Password), title: 'Forgot Password', canActivate: [loggedInGuard] },
    { path: '**', loadComponent: () => import('./features/not-found/not-found').then(c => c.NotFound), title: 'Not Found' },
];