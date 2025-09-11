import { Component, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories-service';
import { CategorySlider } from "../category-slider/category-slider";

@Component({
  selector: 'app-categories',
  imports: [CategorySlider],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  constructor(private _CategoriesService: CategoriesService) { }

  dataList: WritableSignal<any[]> = signal([])

  getAllCategories(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.dataList.set(res.data)
      }
    })
  }

  ngOnInit(): void {
    this.getAllCategories()
  }
}
