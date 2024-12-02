import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatGridTile,
    MatGridList
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
