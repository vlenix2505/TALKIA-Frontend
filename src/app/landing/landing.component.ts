import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
