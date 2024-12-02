import {Routes} from '@angular/router';
import UsersComponent from './users.component';
import {UserProfileAdminComponent} from './user-profile-admin/user-profile-admin.component';


export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: UsersComponent
      },
      {
        path: 'user-profile-admin/:id', component: UserProfileAdminComponent
      }
    ]
  }
];
