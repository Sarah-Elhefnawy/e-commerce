import { Component, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ECommerceService } from '../../core/services/e-commerce/e-commerce-service';
import { IProduct } from '../../core/interfaces/iproduct';
import { MainSlider } from "../main-slider/main-slider";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Categories } from "../categories/categories";
import { Products } from "../products/products";
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';

@Component({
  selector: 'app-home',
  imports: [Categories, MainSlider, Products, CarouselModule, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(private _ProductsService: ECommerceService, private _MyTranslateService: MyTranslateService) { }

  productSubId!: Subscription;
  inputText: string = ''

  dataList: WritableSignal<IProduct[]> = signal([])

  ngOnInit(): void {
    this.productSubId = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.dataList.set(res.data)
      }
    })
  }

  ngOnDestroy(): void {
    this.productSubId.unsubscribe()
  }
}
