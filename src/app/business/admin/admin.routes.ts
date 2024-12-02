import { Routes } from '@angular/router';
import {AdminComponent} from './admin.component';
import {ContentAdminComponent} from './pages/content-admin/content-admin.component';
import {PaymentAdminComponent} from './pages/payment-admin/payment-admin.component';
import {StatisticsAdminComponent} from './pages/statistics-admin/statistics-admin.component';
import UsersComponent from './pages/users/users.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: AdminComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.routes').then(m => m.UsersRoutes)
      },
      {
        path: 'contents',
        loadChildren: () => import('./pages/content-admin/content.routes').then(m => m.ContentRoutes)
      },
      {
        path: 'payments',
        loadChildren: ()  => import('./pages/payment-admin/payment-admin.routes').then(m => m.PaymentAdminRoutes)
      },
      {
        path: 'quizzes',
        loadChildren: () => import('./pages/quizzes-menu-admin/quizzes-menu-admin.routes').then(m => m.QuizzesMenuAdminRoutes)
      },
      {
        path: 'statistics', component: StatisticsAdminComponent
      }
    ]
  }
];
