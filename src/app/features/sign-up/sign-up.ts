import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authService/auth-service';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, TranslateModule, TranslatePipe],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  public _MyTranslateService = inject(MyTranslateService)

  isLoading!: boolean;
  errorMsg: string = '';

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)])
  }, { validators: this.confirmPassword })

  confirmPassword(group: AbstractControl) {
    let password = group.get('password')?.value
    let rePassword = group.get('rePassword')?.value
    if (!password || !rePassword) {
      return null;
    }
    return password === rePassword ? null : { mismatch: true };
  }

  submitBtn() {
    this.isLoading = true
    if (this.registerForm.valid) {
      this._AuthService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.isLoading = false
            this._Router.navigate(['/logIn'])
          }
        },
        error: (err) => {
          this.isLoading = false
          this.errorMsg = err.error.message
        }
      })

    } else {
      this.registerForm.markAllAsTouched()
      this.isLoading = false
    }
  }
}
