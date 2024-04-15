import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
    {path:'login',component: LoginComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes),
        ReactiveFormsModule
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}