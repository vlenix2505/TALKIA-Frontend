import { Component } from '@angular/core';
import {NavAdminComponent} from '../admin/shared/nav-admin/nav-admin.component';
import {NavUserComponent} from './pages/shared/nav-user/nav-user.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NavAdminComponent,
    NavUserComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
