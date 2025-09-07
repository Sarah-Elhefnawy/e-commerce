import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../core/interfaces/iproduct';
import { CartService } from '../../../core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, UpperCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() cardDetails!: IProduct
  private _CartService = inject(CartService)
  private _ToastrService = inject(ToastrService)

  addProduct(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'success')
        this._CartService.cartNum.next(res.numOfCartItems)
      }, error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'Error')
      },
    })
  }
}