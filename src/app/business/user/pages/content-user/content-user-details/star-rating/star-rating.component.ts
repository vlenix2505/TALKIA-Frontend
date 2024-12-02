import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;  // Calificación inicial
  @Input() maxRating: number = 5;  // Número máximo de estrellas
  @Output() ratingChange = new EventEmitter<number>();  // Emisor para la calificación

  stars: boolean[] = Array(this.maxRating).fill(false);
  @Input() readonly: boolean = false;

  ngOnChanges(): void {
    this.updateStars();
  }

  updateStars(): void {
    this.stars = this.stars.map((_, i) => i < this.rating);
  }

  onClick(index: number): void {
    if(!this.readonly){
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
      this.updateStars();
    }
  }
}
