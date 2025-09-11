import { Component, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands-service';
import { IBrand } from '../../core/interfaces/ibrand';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands {
  constructor(private _BrandsService: BrandsService) { }

  productSubId!: Subscription;
  dataList: WritableSignal<IBrand[]> = signal([])

  ngOnInit(): void {
    this.productSubId = this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.dataList.set(res.data)
      }
    })
  }

  ngOnDestroy(): void {
    this.productSubId.unsubscribe()
  }
}
