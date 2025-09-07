import { Component, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands-service';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands {
  // private readonly _BrandsService = inject(BrandsService);
  constructor(private _BrandsService:BrandsService){}

  // productSubId!:Subscription;

  dataList:WritableSignal<IBrand[]> = signal([])

  ngOnInit(): void {
    // this.productSubId = this._BrandsService.getAllCategories().subscribe({
    this._BrandsService.getAllBrands().subscribe({
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
