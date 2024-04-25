import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { User } from '../interface/user.interface';
import jwt_token, { JwtPayload, jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  addUser(user: User) {
    return this.http.post(environment.apiUrl + 'User/CreateUser', user);
  }
  currentUser(): any {
    try {
      let token = localStorage.getItem('token');
      let decoded: any = token != null ? jwtDecode(token) : null;
      return decoded;
    } catch (e) {
      return null;
    }
  }
  login(user: User) {
    return this.http.post(environment.apiUrl + 'User/Login', user);
  }
  isLoggedIn(): boolean {
    let user = this.currentUser();
    if (user == null) return false;
    return user.exp < Date.now();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
