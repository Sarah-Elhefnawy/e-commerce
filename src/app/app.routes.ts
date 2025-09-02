import { RouterModule, Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Categories } from './features/categories/categories';
import { Brands } from './features/brands/brands';
import { LogIn } from './features/log-in/log-in';
import { SignUp } from './features/sign-up/sign-up';
import { Products } from './features/products/products';
import { NotFound } from './features/not-found/not-found';
import { Cart } from './features/cart/cart';
import { ProductDetails } from './features/product-details/product-details';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'', component:Home, title:'Home'},
    {path:'cart', component:Cart, title:'Cart'},
    {path:'products', component:Products, title:'Products'},
    {path:'product-details/:id', component:ProductDetails, title:'Product Details'},
    {path:'cart', component:Cart, title:'Cart'},
    {path:'categories', component:Categories, title:'Categories'},
    {path:'brands', component:Brands, title:'Brands'},
    {path:'logIn', component:LogIn, title:'LogIn'},
    {path:'signUp', component:SignUp, title:'SignUp'},
    {path:'notFound', component:NotFound, title:'Not Found'},
];