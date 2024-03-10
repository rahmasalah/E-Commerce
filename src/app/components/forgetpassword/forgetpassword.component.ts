import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;

  userData: any = '';

  getEmail: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.email]],
  });

  getResetCode: FormGroup = this._FormBuilder.group({
    resetCode: [''],
  });

  newPassword: FormGroup = this._FormBuilder.group({
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/)],
    ],
  });

  userEmail(): void {
    const userEmail = this.getEmail.value;
    this.userData = userEmail.email;

    this._AuthService.getUserEmail(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Fresh Cart');
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Fresh Cart');
      },
    });
  }

  resetCode(): void {
    const code = this.getResetCode.value;
    this._AuthService.verifyCode(code).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Fresh Cart');
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Fresh Cart');
      },
    });
  }

  resetPassword(): void {
    const newPass = this.newPassword.value;
    newPass.email = this.userData;
    this._AuthService.resetPassword(newPass).subscribe({
      next: (res) => {
        if (res.token) {
          this._ToastrService.success(res.message, 'Fresh Cart');
          localStorage.setItem('eToken', res.token);
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Fresh Cart');
      },
    });
  }
}
