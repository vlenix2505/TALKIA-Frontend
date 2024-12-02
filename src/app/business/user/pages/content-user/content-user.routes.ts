import { Routes } from '@angular/router';
import {ContentUserComponent} from './content-user.component';
import {ContentUserDetailsComponent} from './content-user-details/content-user-details.component';


export const ContentUserRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ContentUserComponent },
      { path: 'content-user-details/:id', component: ContentUserDetailsComponent}
    ]
  }
];
