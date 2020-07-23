import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteService} from './cliente/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './cliente/form/form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';

  const routes: Routes = [
    {path:"", redirectTo:"/login", pathMatch:"full"},
    {path:"cliente", component: ClienteComponent},
    {path:"directiva", component: DirectivaComponent},
    {path:"cliente/form/:id", component: FormComponent},
    {path:"cliente/form", component: FormComponent},
    {path:"login", component: LoginComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClienteComponent,
    FormComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
