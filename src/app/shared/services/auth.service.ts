import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrlService } from './base-url.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    private _HttpClient: HttpClient,
    private _BaseUrlService: BaseUrlService,
    private _Router: Router
  ) {}

  logOutUser(): void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['login']);
  }

  saveUserData() {
    if (localStorage.getItem('eToken') != null) {
      let encodeData: any = localStorage.getItem('eToken');
      let decodeData = jwtDecode(encodeData);
      this.userData = decodeData;
    }
  }
  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(
      `${this._BaseUrlService.BaseUrl}/api/v1/auth/signup`,
      userData
    );
  }

  setLogin(userdata: object): Observable<any> {
    return this._HttpClient.post(
      `${this._BaseUrlService.BaseUrl}/api/v1/auth/signin`,
      userdata
    );
  }

  getUserEmail(userEmail: object): Observable<any> {
    return this._HttpClient.post(
      `${this._BaseUrlService.BaseUrl}/api/v1/auth/forgotPasswords`,
      userEmail
    );
  }

  verifyCode(code: object): Observable<any> {
    return this._HttpClient.post(
      `${this._BaseUrlService.BaseUrl}/api/v1/auth/verifyResetCode`,
      code
    );
  }

  resetPassword(newPass: object): Observable<any> {
    return this._HttpClient.put(
      `${this._BaseUrlService.BaseUrl}/api/v1/auth/resetPassword`,
      newPass
    );
  }
}
