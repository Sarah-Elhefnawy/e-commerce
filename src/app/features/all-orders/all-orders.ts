import { Component } from '@angular/core';
import { IOrder } from '../../core/interfaces/iorder';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OrderService } from './../../core/services/orders/order-service';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';

@Component({
  selector: 'app-all-orders',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,TranslateModule,TranslatePipe],
templateUrl: './all-orders.html',
  styleUrl: './all-orders.scss'
})
export class AllOrders {
  constructor(private _CheckOutService: OrderService,private _MyTranslateService: MyTranslateService) { }

  myorders: IOrder[] = []

  getUserOrders() {
    this._CheckOutService.getUserOrders().subscribe({
      next: (res) => {
        this.myorders = res
      }
    })
  }

  ngOnInit(): void {
    this.getUserOrders()
  }
}
