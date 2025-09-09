import { Component, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { ECommerceService } from '../../core/services/e-commerce/e-commerce-service';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search-pipe';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FormsModule, SearchPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  // private readonly _ProductsService = inject(ECommerceService);
  constructor(private _ProductsService: ECommerceService) { }

  // productSubId!:Subscription;
  inputText: string = ''

  dataList: WritableSignal<IProduct[]> = signal([])

  ngOnInit(): void {
    // this.productSubId = this._ProductsService.getProducts().subscribe({
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.dataList.set(res.data)
      }
    })
  }

  // ngOnDestroy():void{
  //   this.productSubId.unsubscribe()
  // }
}
