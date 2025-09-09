import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../core/interfaces/iproduct';
import { CartService } from '../../../core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { UpperCasePipe } from '@angular/common';
import { WishListService } from '../../../core/services/wishlist/wish-list-service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() cardDetails!: IProduct
  private _CartService = inject(CartService)
  private _WishListService = inject(WishListService)
  private _ToastrService = inject(ToastrService)

  addProduct(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'success')
        this._CartService.cartNum.next(res.numOfCartItems)
      }
    })
  }

  addProductToWishList(id: string) {
    this._WishListService.addProductToWishList(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'success')
        this._WishListService.wishListNum.next(res.count)
        console.log(res)
      }
    })
  }
}