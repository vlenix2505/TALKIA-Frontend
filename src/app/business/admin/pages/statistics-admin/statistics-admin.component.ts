import { Component, OnInit } from '@angular/core';
import { NavAdminComponent } from '../../shared/nav-admin/nav-admin.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import { QuizzesQuestionService } from '../../../../core/services/quizzes-question.service';

@Component({
  selector: 'app-statistics-admin',
  standalone: true,
  imports: [
    NavAdminComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './statistics-admin.component.html',
  styleUrls: ['./statistics-admin.component.css']
})
export class StatisticsAdminComponent implements OnInit {
  averageScore: number = 0;
  quizCount: number = 0;
  selectedLevel: number = 1; // Nivel inicial predeterminado: Básico

  constructor(private quizAdminService: QuizzesQuestionService) {}

  ngOnInit(): void {
    this.loadStatistics(this.selectedLevel);
  }

  private loadStatistics(lvId: number): void {
    console.log(`Cargando estadísticas para el nivel ${lvId}...`);

    // Llamar a avgQuestionAdmin para obtener el promedio de puntos
    this.quizAdminService.avgQuestionAdmin(lvId).subscribe({
      next: (data: any) => {
        console.log("Datos recibidos de avgQuestionAdmin:", data);
        this.averageScore = data; // Asegúrate de que `avgQuestionAdmin` es el nombre correcto en los datos
        console.log("averageScore asignado:", this.averageScore);
      },
      error: (error: any) => console.error("Error al obtener el promedio de puntos", error)
    });

    // Llamar a numberOfEndedQuizzes para obtener la cantidad de quizzes
    this.quizAdminService.numberOfEndedQuizzes(lvId).subscribe({
      next: (data: any) => {
        console.log("Datos recibidos de numberOfEndedQuizzes:", data);
        this.quizCount = data; // Asegúrate de que `totalQuizzes` es el nombre correcto en los datos
        console.log("quizCount asignado:", this.quizCount);
      },
      error: (error: any) => console.error("Error al obtener la cantidad de cuestionarios", error)
    });
  }

  // Método para manejar el cambio de nivel desde el selector
  onLevelChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedLevel = Number(target.value); // Convierte el valor seleccionado a número
    console.log("Nivel seleccionado:", this.selectedLevel);
    this.loadStatistics(this.selectedLevel); // Recargar estadísticas para el nuevo nivel seleccionado
  }
}
