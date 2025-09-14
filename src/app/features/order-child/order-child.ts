import { Component } from '@angular/core';
import { IOrder } from '../../core/interfaces/iorder';
import { OrderService } from '../../core/services/orders/order-service';
import { CurrencyPipe } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-child',
  imports: [CurrencyPipe,TranslateModule, TranslatePipe],
  templateUrl: './order-child.html',
  styleUrl: './order-child.scss'
})
export class OrderChild {
  constructor(private _OrderService: OrderService,private _MyTranslateService: MyTranslateService) { }

  myorders: IOrder[] = []
    productSubId!: Subscription;

  getUserOrders() {
    this.productSubId = this._OrderService.getUserOrders().subscribe({
      next: (res) => {
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
