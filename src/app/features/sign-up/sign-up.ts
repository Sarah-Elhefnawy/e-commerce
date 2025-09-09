import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authService/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  isLoading!: boolean;
  errorMsg: string = '';

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
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
          console.log(res);
          if (res.message == 'success') {
            // login
            this.isLoading = false
            // console.log(this.registerForm.value);
            this._Router.navigate(['/logIn'])
          }
        },
        error: (err) => {
          this.errorMsg = err.error.message
        },
      })

    } else {
      this.registerForm.markAllAsTouched()
      this.isLoading = false
    }
  }

  constructor() {
    this.registerForm.valueChanges.subscribe(values => {
      console.log('Form values changed:', values);
      console.log('Form valid:', this.registerForm.valid);
      console.log('Form errors:', this.registerForm.errors);
      console.log('Password errors:', this.registerForm.get('password')?.errors);
      console.log('Email errors:', this.registerForm.get('email')?.errors);
    });
  }
}
