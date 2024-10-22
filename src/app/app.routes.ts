import {Routes } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {HomeComponent} from './home/home.component';
import {ContentAdminComponent} from './home/pages/content-admin/content-admin.component';

import UsersComponent from './home/pages/users/users.component';
import { PaymentAdminComponent } from './home/pages/payment-admin/payment-admin.component';
import { LoginComponent } from './login/login.component';



export const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'contents', component: ContentAdminComponent },
      { path: 'histories', component: PaymentAdminComponent },
    ]
  },
  {
    path:'',redirectTo:'', pathMatch:'full'
  }
];
