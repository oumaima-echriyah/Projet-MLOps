import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CardPageComponent } from './card-page/card-page.component';
import { LandingComponent } from './landing/landing.component';
import { SignatureBasedComponent } from './signature-based/signature-based.component';
import { ImageBasedComponent } from './image-based/image-based.component';
import { MasterComponent } from './master/master.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    CardPageComponent,
    LandingComponent,
    SignatureBasedComponent,
    ImageBasedComponent,
    MasterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
