import { Component, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ECommerceService } from '../../core/services/e-commerce/e-commerce-service';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { IProduct } from '../../core/interfaces/iproduct';
import { MainSlider } from "../main-slider/main-slider";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Categories } from "../categories/categories";
import { Products } from "../products/products";

@Component({
  selector: 'app-home',
  imports: [Categories, MainSlider, Products, CarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // private readonly _ProductsService = inject(ECommerceService);
  constructor(private _ProductsService:ECommerceService){}

  // productSubId!:Subscription;
  inputText:string = ''

  dataList:WritableSignal<IProduct[]> = signal([])

  ngOnInit(): void {
    // this.productSubId = this._ProductsService.getProducts().subscribe({
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.dataList.set(res.data)
      },
      error: (err) => {
        console.log(err);

      },
    })
  }

  // ngOnDestroy():void{
  //   this.productSubId.unsubscribe()
  // }
}
