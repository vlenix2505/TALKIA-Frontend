import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    AdminNavComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
