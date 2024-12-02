import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NavAdminComponent} from '../../shared/nav-admin/nav-admin.component';

@Component({
  selector: 'app-quizzes-menu-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavAdminComponent
  ],
  templateUrl: './quizzes-menu-admin.component.html',
  styleUrl: './quizzes-menu-admin.component.css'
})
export class QuizzesMenuAdminComponent {
}
