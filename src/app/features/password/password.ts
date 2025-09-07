import { Component, inject } from '@angular/core';
import { ForgetPassword } from '../../core/services/forgetPassword/forget-password';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password',
  imports: [ReactiveFormsModule],
  templateUrl: './password.html',
  styleUrl: './password.scss'
})
export class Password {
  private readonly _ForgetPassword = inject(ForgetPassword)
  private readonly _Router = inject(Router)
  private readonly _ToastrService = inject(ToastrService)

  isLoading!: boolean
  errorMsg: string = ''
  step: number = 1

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  submitForgetBtn() {
    this.isLoading = true
    this._ForgetPassword.forgotPassword(this.forgetPasswordForm.value).subscribe({
      next: res => {
        this.isLoading = false
        if (res.statusMsg == 'success') {
          this._ToastrService.success(res.message,res.statusMsg)
          this.step = 2
        }
      },
      error: err => {
        this.isLoading = false
        this.errorMsg = err.error.message
      }
    })
  }

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{4,}$/)])
  })

  submitCode() {
    this.isLoading = true
    this._ForgetPassword.resetCode(this.resetCodeForm.value).subscribe({
      next: res => {
        this.isLoading = false
        if (res.status == 'Success') {
          this._ToastrService.success(res.status)
          this.step = 3
        }
      },
      error: err => {
        this.isLoading = false
        this.errorMsg = err.error.message
      }
    })
  }

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required]),
  })

  submitNewPassword() {
    this.isLoading = true
    this._ForgetPassword.resetPassword(this.resetPasswordForm.value).subscribe({
      next: res => {
        this.isLoading = false
        this._Router.navigate(['/logIn'])
      },
      error: err => {
        this.isLoading = false
        this.errorMsg = err.error.message
      }
    })
  }
}
