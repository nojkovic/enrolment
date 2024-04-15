import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit{
  constructor(private titleService:Title,private authService:AuthService){
      this.titleService.setTitle('Login');
  }
  ngOnInit(): void {
      
  }
  loginForm=new FormGroup({
    email:new FormControl("",[Validators.email]),
    pass:new FormControl("",Validators.minLength(9))
  });

  message:String="";
  loginSubmit(){
    // this.authService.addUser([
    //   // "Sara","sara@gmail.com","sifra123","Nojkovic"
    // ]).subscribe(res=>{
    //   console.log(res);
    // })
    
    if(this.loginForm.valid){
      this.authService.login({
        email:this.Email.value,password:this.Password.value
      }).subscribe((res:any)=>{
        
        if(res.status!=='log')
          this.message=res.message;
        else{
          console.log(res.token);
          this.setToken(res.token);
        }
       
      })
    }
  }
  setToken(token:string){
    localStorage.setItem("token",token);
  }
  get Email():FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get Password():FormControl{
    return this.loginForm.get('pass') as FormControl;
  }
}
