import { Component } from '@angular/core';
import { IOrder } from '../../core/interfaces/iorder';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OrderService } from './../../core/services/orders/order-service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-orders',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, TranslatePipe],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.scss'
})
export class AllOrders {
  constructor(private _OrderService: OrderService, private _MyTranslateService: MyTranslateService) { }

  myorders: IOrder[] = []
  productSubId!: Subscription;

  getUserOrders() {
    this.productSubId = this._OrderService.getUserOrders().subscribe({
      next: (res) => {
        console.log(res.length);
        this._OrderService.orderNum.next(res.length)
        this.myorders = res
      }
    })
  }

  ngOnInit(): void {
    this.getUserOrders()
  }

  ngOnDestroy(): void {
    this.productSubId.unsubscribe()
  }
}
