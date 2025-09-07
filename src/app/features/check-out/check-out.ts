import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckOutService } from '../../core/services/checkOut/check-out-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.html',
  styleUrl: './check-out.scss'
})
export class CheckOut {
  private readonly _CheckOutService = inject(CheckOutService)
  private readonly _ActivatedRoute = inject(ActivatedRoute) // to get id from url

  isLoading!: boolean;
  cartId!: string | null;
  errorMsg: string = '';

  checkOutForm = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.getIdFromUrl()
  }

  getIdFromUrl() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id')
      },
    })
  }

  submitBtn() {
    this.isLoading = true
    if (this.checkOutForm.valid) {
      this._CheckOutService.CheckOut(this.checkOutForm.value, this.cartId).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            window.location.href = res.session.url
            this.isLoading = false
          }
        },
        error: (err) => {
          this.errorMsg = err.error.message
        },
      })
    } else {
      this.checkOutForm.markAllAsTouched()
    }
  }
}
