import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserContent} from '../../core/model/user-content';
import {QuizzesUserComponent} from './pages/quizzes-user/quizzes-user.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {UserSettingsComponent} from './pages/user-settings/user-settings.component';
import {ContentUserComponent} from './pages/content-user/content-user.component';
import {NgModule} from '@angular/core';
import {routes} from '../../app.routes';
import {CommonModule} from '@angular/common';
import {User} from '../../core/model/user';

export const UserRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: UserComponent
      },
      {
        path: 'contents',
        loadChildren: () => import('./pages/content-user/content-user.routes').then(m => m.ContentUserRoutes)
      },
      {
        path: 'quizzes',
        loadChildren: () => import('./pages/quizzes-user/quizzes-user.routes').then(m => m.QuizzesUserRoutes)
      },
      {
        path: 'tracking',
        loadChildren: () => import('./pages/tracking-user/tracking-user.routes').then(m => m.TrackingUserRoutes)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/user-profile/user-profile.routes').then(m => m.UserProfileRoutes)
      },
      {
        path: 'settings', component: UserSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    UserComponent,
    // Configura las rutas del módulo secundario
  ],
  declarations: []
})
export class LandingModule {}
