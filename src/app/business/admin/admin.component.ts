import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {NavAdminComponent} from './shared/nav-admin/nav-admin.component';

@Component({
  selector: 'admin-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavAdminComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
