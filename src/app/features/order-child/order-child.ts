import { Component } from '@angular/core';
import { IOrder } from '../../core/interfaces/iorder';
import { OrderService } from '../../core/services/orders/order-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-child',
  imports: [CurrencyPipe],
  templateUrl: './order-child.html',
  styleUrl: './order-child.scss'
})
export class OrderChild {
  constructor(private _OrderService: OrderService) { }

  myorders: IOrder[] = []

  getUserOrders() {
    this._OrderService.getUserOrders().subscribe({
      next: (res) => {
        this.myorders = res
      }
    })
  }

  ngOnInit(): void {
    this.getUserOrders()
  }
}
