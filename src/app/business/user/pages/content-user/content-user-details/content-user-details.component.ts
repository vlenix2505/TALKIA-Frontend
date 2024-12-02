import {ActivatedRoute, Params, Router, RouterLink, RouterOutlet} from '@angular/router';
import { Content } from '../../../../../core/model/content';
import { RatingService } from '../../../../../core/services/rating.service';
import { ContentAdminService } from '../../../../../core/services/content-admin.service';
import { Component, inject, OnInit } from '@angular/core';
import { ContentUserService } from '../../../../../core/services/content-user.service';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { NgForOf, NgIf } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardModule, MatCardTitle } from '@angular/material/card';
import { NavUserComponent } from '../../shared/nav-user/nav-user.component';

@Component({
  selector: 'app-content-user-details',
  standalone: true,
  imports: [
    NavUserComponent,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatCardTitle,
    MatCardHeader,
    MatCardFooter,
    MatCardModule,
    MatButtonModule,
    MatPaginator,
    NgForOf,
    RouterOutlet,
    NgIf,
    StarRatingComponent,
    RouterLink
  ],
  templateUrl: './content-user-details.component.html',
  styleUrls: ['./content-user-details.component.css'],
})
export class ContentUserDetailsComponent implements OnInit {
  content: Content = new Content();
  reviews: any[] = []; // Propiedad para almacenar las reseñas
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  contentUserService: ContentUserService = inject(ContentUserService);
  contentAdminService: ContentAdminService = inject(ContentAdminService);
  ratingService: RatingService = inject(RatingService);
  currentRating: number = 0;
  avgRate: number = 0.0;
  //Identificar usuario
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  id: number = 0;
  hasRated: boolean = false;

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de ContentUserDetailsComponent");
      console.log(data);
      this.id = data['id']; // capturando el id del listado
      console.log(this.id);
      this.loadLista();
      this.loadRatings(); // Cargar las reseñas al inicializar el componente

    });
  }

  private loadLista() {
    this.contentUserService.getContentById(this.id).subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.content = data[0];
          console.log('Data recibida:', this.content);
        } else {
          console.log("No se encontraron datos para el contenido con ID:", this.id);
        }
      },
      error: (error: any) => console.log("Error en consulta", error)
    });

  }

  private loadRatings() {
    this.ratingService.listRatingByContent(this.id).subscribe({
      next: (ratings) => {
        console.log('Ratings recibidos:', ratings); // Mostrar los ratings en la consola
        this.reviews = ratings; // Guardar los ratings en la propiedad `reviews`
        this.ratingService.avgRatingByContent(this.id).subscribe({
          next: (data: any) => {
            this.avgRate = data;
            console.log(this.avgRate);
          }
        })

      },
      error: (error) => console.log("Error al obtener ratings", error)
    });

  }



  addRating() {
    this.ratingService.isRated(this.id,this.userId).subscribe({
      next: (data) => {
        this.hasRated = data;
        console.log(this.hasRated);
        if (this.hasRated) {
          console.log('El usuario ya ha calificado este contenido.');
          return;
        }

        console.log('Calificación agregada:', this.currentRating);
        // Aquí se ejecuta el servicio para guardar la calificación
        this.ratingService.addRating(this.id, this.userId, this.currentRating).subscribe({
          next: (response) => {
            console.log('Calificación guardada:', response);
            this.loadRatings()

          },
          error: (error) => console.error('Error al guardar la calificación:', error)
        });
      }
    })


  }
  openLink(url: string) {
    window.open(url, '_blank');
  }
}
