import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';
import { ICartProduct } from '../../core/interfaces/icart-product';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { WishListService } from '../../core/services/wishlist/wish-list-service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslateModule, TranslatePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  private _CartService = inject(CartService)
  private _WishListService = inject(WishListService)
  private _ToastrService = inject(ToastrService)
  public _MyTranslateService = inject(MyTranslateService)

  cartId!: string
  productList: ICartProduct[] = []
  totalPrice: number = 0
  productSubId!: Subscription;

  getCart() {
    this.productSubId = this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this.cartId = res.data._id
        this.totalPrice = res.data.totalCartPrice
        this.productList = res.data.products
        this._CartService.cartNum.next(res.numOfCartItems)
      },
    })
  }

  addProductToWishList(id: string | null) {
    this._WishListService.addProductToWishList(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'success')
        this._WishListService.wishListNum.next(res.count)
      }
    })
  }

  removeItem(id: string) {
    this._CartService.deleteProductCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product is deleted')
        this.getCart()
      }
    })
  }

  updateProduct(count: number, id: string) {
    this._CartService.updateProductCart(count, id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product is updated')
        this.getCart()
      }
    })
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this._ToastrService.success('Cart is emptied')
        this.getCart()
      }
    })
  }

  ngOnInit(): void {
    this.getCart()
  }

  ngOnDestroy(): void {
    this.productSubId.unsubscribe()
  }
}