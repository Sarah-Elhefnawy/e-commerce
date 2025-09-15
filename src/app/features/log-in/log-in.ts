import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/loginService/login-service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';
import { DecodeService } from '../../core/services/decodeService/decode-service';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss'
})
export class LogIn {
  private readonly _LoginServcie = inject(LoginService)
  private readonly _Router = inject(Router)
  public _MyTranslateService = inject(MyTranslateService)
  private _DecodeService = inject(DecodeService)

  isLoading!: boolean;
  errorMsg: string = '';

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })

  submitBtn() {
    this.isLoading = true

    if (this.logInForm.valid) {
      this._LoginServcie.sendRegisterForm(this.logInForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            // save token in localStorage
            localStorage.setItem('token', res.token)
            // user data from token
            this._DecodeService.decodeUserData()
            //home
            this.isLoading = false
            this._Router.navigate(['/'])
          }
        },
        error: (err) => {
          this.isLoading = false
          this.errorMsg = err.error.message
        },
      })
    } else {
      this.isLoading = false
      this.logInForm.markAllAsTouched()
    }
  }
}
