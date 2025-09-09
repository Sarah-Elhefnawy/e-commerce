import { Component, inject } from '@angular/core';
import { WishListService } from '../../core/services/wishlist/wish-list-service';
import { ToastrService } from 'ngx-toastr';
import { IWishList } from '../../core/interfaces/iwish-list';
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-wish-list',
  imports: [CarouselModule],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.scss'
})
export class WishList {
  private _WishListService = inject(WishListService)
  private _ToastrService = inject(ToastrService)

  productList: IWishList[] = []
  imgUrl: string = 'https://ecommerce.routemisr.com/Route-Academy-products/'

  myWishLists: IWishList[] = []

  getWishListProducts() {
    this._WishListService.getWishListProducts().subscribe({
      next: (res) => {
        this.myWishLists = res
        this._WishListService.wishListNum.next(res.count)
        this.productList = res.data
        console.log(this.productList);

      }
    })
  }

  removeItem(id: string) {
    this._WishListService.removeProductFromWishList(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product is removed from wishList')
        this.getWishListProducts()
      }
    })
  }

  ngOnInit(): void {
    this.getWishListProducts()
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
