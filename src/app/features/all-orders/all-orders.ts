import { Component } from '@angular/core';
import { IOrder } from '../../core/interfaces/iorder';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OrderService } from './../../core/services/orders/order-service';

@Component({
  selector: 'app-all-orders',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
templateUrl: './all-orders.html',
  styleUrl: './all-orders.scss'
})
export class AllOrders {
  constructor(private _CheckOutService: OrderService) { }

  myorders: IOrder[] = []

  getUserOrders() {
    this._CheckOutService.getUserOrders().subscribe({
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
