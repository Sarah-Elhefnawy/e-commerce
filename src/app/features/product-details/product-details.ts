import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ECommerceService } from '../../core/services/e-commerce/e-commerce-service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart-service';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails {
  productId!: string | null;

  productDetails: WritableSignal<any> = signal({});
  private activated = inject(ActivatedRoute);
  private _ProductService = inject(ECommerceService);
  private _CartService = inject(CartService)
  private _ToastrService = inject(ToastrService)

  getId() {
    this.activated.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id')
      }
    })
  }

  getProductDetails() {
    this._ProductService.getOneProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails.set(res.data)
      },
    })
  }


  addProduct(id: string | null) {
    this._CartService.addProductToCart(this.productId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'success')
        this._CartService.cartNum.next(res.numOfCartItems)
      }, error: (err) => {
        this._ToastrService.error(err.error.message, 'Error')
      },
    })
  }

  ngOnInit(): void {
    this.getId();
    this.getProductDetails();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      }
    },
    nav: true
  }
}
