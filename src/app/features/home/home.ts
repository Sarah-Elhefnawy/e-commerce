import { Component, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ECommerceService } from '../../core/services/e-commerce/e-commerce-service';
import { IProduct } from '../../core/interfaces/iproduct';
import { MainSlider } from "../main-slider/main-slider";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Products } from "../products/products";
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';
import { CategoriesService } from '../../core/services/categories/categories-service';
import { CategorySlider } from '../category-slider/category-slider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CategorySlider, MainSlider, Products, CarouselModule, TranslateModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(private _ProductsService: ECommerceService, private _MyTranslateService: MyTranslateService, private _CategoriesService: CategoriesService) { }

  productSubId!: Subscription;
  inputText: string = ''

  dataList: WritableSignal<IProduct[]> = signal([])
  dataListCategory: WritableSignal<any[]> = signal([])

  getAllCategories(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.dataListCategory.set(res.data)
      }
    })
  }

  ngOnInit(): void {
    this.productSubId = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.dataList.set(res.data)
      }
    })
    this.getAllCategories()
  }

  ngOnDestroy(): void {
    this.productSubId.unsubscribe()
  }
}
