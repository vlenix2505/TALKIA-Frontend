import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {userGuard} from './security/user.guard';
import {adminGuard} from './security/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./business/landing/landing.routes').then(m => m.LandingRoutes)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./business/welcome/welcome.routes').then(m => m.WelcomeRoutes)
  },
  {
    path: 'login',
    loadChildren: () => import('./business/welcome/pages/login/login.routes').then(m => m.LoginRoutes)
  },
  {
    path: 'register',
    loadChildren: () => import('./business/welcome/pages/register/register.routes').then(m => m.RegisterRoutes)
  },
  {
    path: 'admin',
    loadChildren: () => import('./business/admin/admin.routes').then(m => m.AdminRoutes),
    canActivate:[adminGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./business/user/user.routes').then(m => m.UserRoutes),
    canActivate:[userGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
