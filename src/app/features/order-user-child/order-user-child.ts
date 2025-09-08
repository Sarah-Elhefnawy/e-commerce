import { Component } from '@angular/core';
import { IOrder } from '../../core/interfaces/iorder';
import { OrderService } from '../../core/services/orders/order-service';

@Component({
  selector: 'app-order-user-child',
  imports: [],
  templateUrl: './order-user-child.html',
  styleUrl: './order-user-child.scss'
})
export class OrderUserChild {
constructor(private _OrderService: OrderService) { }

  myorders: IOrder[] = []

  getUserOrders() {
    this._OrderService.getUserOrders().subscribe({
      next: (res) => {
        this.myorders = res
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  ngOnInit(): void {
    this.getUserOrders()
  }
}
