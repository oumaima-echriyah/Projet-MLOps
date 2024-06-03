import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CardPageComponent } from './card-page/card-page.component';
import { LandingComponent } from './landing/landing.component';
import { ImageBasedComponent } from './image-based/image-based.component';
import { SignatureBasedComponent } from './signature-based/signature-based.component';


const routes: Routes = [
  {path:'Login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  
  {path:'card-page',component:CardPageComponent},
  {path:'signature',component:SignatureBasedComponent},
  {path:'image',component:ImageBasedComponent},
  { path: 'section', component: LandingComponent },
  { path: '', redirectTo: '/section', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
