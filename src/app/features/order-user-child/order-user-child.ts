import { Component, Input } from '@angular/core';
import { IOrder } from '../../core/interfaces/iorder';
import { OrderService } from '../../core/services/orders/order-service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-user-child',
  imports: [TranslateModule, TranslatePipe],
  templateUrl: './order-user-child.html',
  styleUrl: './order-user-child.scss'
})
export class OrderUserChild {
  constructor(private _OrderService: OrderService, private _MyTranslateService: MyTranslateService) { }

  @Input() myorders: IOrder[] = [];
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
