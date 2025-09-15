import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from './../../../core/services/loginService/login-service';
import { CartService } from '../../../core/services/cart/cart-service';
import { FlowbiteService } from './../../../core/services/FlowBite/flowbite-service';
import { initFlowbite } from 'flowbite';
import { WishListService } from '../../../core/services/wishlist/wish-list-service';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/translateService/my-translate-service';
import { TranslatePipe } from '@ngx-translate/core';
import { DecodeService } from '../../../core/services/decodeService/decode-service';
import { OrderService } from '../../../core/services/orders/order-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslateModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private _FlowbiteService = inject(FlowbiteService)
  private _LoginService = inject(LoginService)
  private _CartService = inject(CartService)
  private _WishListService = inject(WishListService)
  public _MyTranslateService = inject(MyTranslateService)
  private _DecodeService = inject(DecodeService)
  private _OrderService = inject(OrderService)

  isLoggedIn!: boolean
  cartNumber: number = 0
  orderNumber: any = 0
  wishListNumber: number = 0

  LogIn() {
    this._DecodeService.userDataLogIn.subscribe({
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

  orderNums() {
    this._OrderService.orderNum.subscribe({
      next: res => {
        this.orderNumber = res
      }
    })
  }

  ngOnInit(): void {
    this.LogIn()
    this.CartNums()
    this.wishListNums()
    this.orderNums()

    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite()
    })
  }

  signOut() {
    this._LoginService.logOut()
  }
}
