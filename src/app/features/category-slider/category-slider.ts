import { Component, Input } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.html',
  styleUrl: './category-slider.scss'
})
export class CategorySlider {
  @Input() slideData!: any

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 200,
    autoplayTimeout: 100,
    // autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    rtl: true
  }
}
