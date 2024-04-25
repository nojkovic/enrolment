import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
  ) {
    this.titleService.setTitle('Login');
  }
  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    pass: new FormControl('', Validators.minLength(9)),
  });

  message: String = '';
  loginSubmit() {
    // this.authService.addUser({
    //   name:"Sara",
    //   email:"sara@gmail.com",
    //   password:"sifra12345",
    //   lastName:"Nojkovic",
    //   roleId:1
    // }).subscribe(res=>{
    //   console.log(res);
    // })

    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.Email.value,
          password: this.Password.value,
        })
        .subscribe(
          (res: any) => {
            this.setToken(res.jwtToken);
            this.router.navigateByUrl('home');
          },
          (error) => {
            this.message = error.error.message;
            console.log(error);
          },
        );
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get('pass') as FormControl;
  }
}
