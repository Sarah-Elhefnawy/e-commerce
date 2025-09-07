import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';
import { ICartProduct } from '../../core/interfaces/icart-product';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  private _CartService = inject(CartService)
  private _ToastrService = inject(ToastrService)

  cartId!: string
  productList!: ICartProduct[]
  totalPrice: number = 0

  getCart() {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this.cartId = res.data._id
        this.totalPrice = res.data.totalCartPrice
        this.productList = res.data.products
        this._CartService.cartNum.next(res.numOfCartItems)
      },
    })
  }

  removeItem(id: string) {
    this._CartService.deleteProductCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product is deleted')
        this.getCart()
      },
      error: err => {
        console.log(err);
      }
    })
  }

  updateProduct(count: number, id: string) {
    this._CartService.updateProductCart(count, id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product is updated')
        this.getCart()
      },
      error: err => {
        console.log(err);
      }
    })
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this._ToastrService.success('Cart is emptied')
        this.getCart()
      },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getCart()
  }
}