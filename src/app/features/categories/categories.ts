import { Component, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories-service';
import { ICategory } from '../../core/interfaces/icategory';
import { CategorySlider } from "../category-slider/category-slider";

@Component({
  selector: 'app-categories',
  imports: [CategorySlider],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  constructor(private _CategoriesService:CategoriesService){}

  // productSubId!:Subscription;

  dataList:WritableSignal<any[]> = signal([])

  getAllCategories():void{
    // this.productSubId = this._CategoriesService.getAllCategories().subscribe({
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataList.set(res.data)
      },
      error: (err) => {
        console.log(err);

      },
    })
  }

  ngOnInit(): void {
    
    this.getAllCategories()
    
  }

  // ngOnDestroy():void{
  //   this.productSubId.unsubscribe()
  // }
}
