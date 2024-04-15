import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseServerUrl="https://localhost:44339/api/User/";

  addUser(user:User){
    return this.http.post(this.baseServerUrl + "CreateUser",{
      name:user.name,
      email:user.email,
      password:user.password,
      lastName:user.lastName

    },{
      responseType:"json"
    });
  }
  login(user:User){
    return this.http.post(this.baseServerUrl + "Login",{
      email:user.email,
      Password:user.password,
    },{
      responseType:"json"
    });
  }
}
