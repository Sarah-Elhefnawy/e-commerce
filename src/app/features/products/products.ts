import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { ECommerceService } from '../../core/services/e-commerce/e-commerce-service';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search-pipe';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FormsModule, SearchPipe, TranslateModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  private readonly _ProductsService = inject(ECommerceService);
  public _MyTranslateService = inject(MyTranslateService)
  productSubId!:Subscription;
  inputText: string = ''

  dataList: WritableSignal<IProduct[]> = signal([])

  ngOnInit(): void {
    this.productSubId = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.dataList.set(res.data)
      }
    })
  }

  ngOnDestroy():void{
    this.productSubId.unsubscribe()
  }
}
