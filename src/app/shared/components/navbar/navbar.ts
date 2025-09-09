import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from './../../../core/services/loginService/login-service';
import { CartService } from '../../../core/services/cart/cart-service';
import { FlowbiteService } from './../../../core/services/FlowBite/flowbite-service';
import { initFlowbite } from 'flowbite';
import { WishListService } from '../../../core/services/wishlist/wish-list-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private _FlowbiteService = inject(FlowbiteService)
  private _LoginService = inject(LoginService)
  private _CartService = inject(CartService)
  private _WishListService = inject(WishListService)

  isLoggedIn!: boolean
  cartNumber: number = 0
  wishListNumber: number = 0

  LogIn() {
    this._LoginService.userData.subscribe({
      next: res => {
        if (res !== null) {
          this.isLoggedIn = true
        } else {
          this.isLoggedIn = false
        }
      }
    })
  }

  CartNums() {
    this._CartService.cartNum.subscribe({
      next: res => {
        this.cartNumber = res
      }
    })
  }

  wishListNums() {
    this._WishListService.wishListNum.subscribe({
      next: res => {
        this.wishListNumber = res
      }
    })
  }
  
  ngOnInit(): void {
    this.LogIn()
    this.CartNums()
    this.wishListNums()

    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite()
    })
  }

  signOut() {
    this._LoginService.logOut()
  }
}
