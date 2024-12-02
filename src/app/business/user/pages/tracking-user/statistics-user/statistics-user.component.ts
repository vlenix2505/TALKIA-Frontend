import { Component, inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { take } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import {NavUserComponent} from '../../shared/nav-user/nav-user.component';
import {QuizzesQuestionService} from '../../../../../core/services/quizzes-question.service';

Chart.register(...registerables);
const centerTextPlugin = {
  id: 'centerText',
  afterDatasetsDraw(chart: Chart) { // Specify the type as Chart here
    const { ctx, data } = chart;
    const width = chart.width;
    const height = chart.height;
    const fontSize = (height / 114).toFixed(2);

    ctx.save();
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';

    // Calculate the percentage and set the text in the center
    const text = `${(data.datasets[0].data[0] as number).toFixed(1)}%`; // Cast data to number for better type safety
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.restore();
  }
};


@Component({
  selector: 'app-statistics-user',
  standalone: true,
  imports:[
    RouterOutlet,
    RouterLink,
    NavUserComponent
  ],
  templateUrl: './statistics-user.component.html',
  styleUrls: ['./statistics-user.component.css']
})
export class StatisticsUserComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  avgCorrectAnswers: number;
  totalPoints: number;
  avgPoints: number;
  quizzesCompleted: number;
  percentageCorrectAnswers: number;
  chart: any;
  qqService: QuizzesQuestionService = inject(QuizzesQuestionService);

  ngOnInit() {
    this.loadStatistics();
  }


  loadStatistics() {
    // Obtener el promedio de respuestas correctas y actualizar el Chart1
    this.qqService.getPercentagePerUser(this.userId).pipe(take(1)).subscribe({
      next: (data) => {
        this.avgCorrectAnswers = Number(data.toFixed(2)); // Formatear a 2 decimales
        console.log('Promedio de respuestas correctas:', this.avgCorrectAnswers);
        this.loadChart1(); // Llamar al método para cargar el gráfico después de obtener el dato
      }
    });

    this.qqService.getTotalPoints(this.userId).subscribe({
      next: (data) => {
        this.totalPoints = Number(data.toFixed(2)); // Formatear a 2 decimales
        console.log('Puntos totales:', this.totalPoints);
      }
    });

    this.qqService.getAvgPointsPerUser(this.userId).subscribe({
      next: (data) => {
        this.avgPoints = Number(data.toFixed(2)); // Formatear a 2 decimales
        console.log('Promedio de puntos obtenidos por Quiz:', this.avgPoints);
      }
    });

    this.qqService.getCompletedPerUser(this.userId).subscribe({
      next: (data) => {
        this.quizzesCompleted = data; // Este valor parece ser entero, no necesita formateo
        console.log('Cantidad de cuestionarios resueltos totales:', this.quizzesCompleted);
      }
    });

    this.qqService.getPercentagePerUser(this.userId).subscribe({
      next: (data: number) => {
        this.percentageCorrectAnswers = Number(data.toFixed(2)); // Formatear a 2 decimales
        console.log('Porcentaje de respuestas correctas:', this.percentageCorrectAnswers);
      }
    });
  }


  // Método para cargar el primer gráfico (Chart1)
  private loadChart1(): void {
    // Si el gráfico ya existe, destruirlo antes de crear uno nuevo
    if (this.chart) {
      this.chart.destroy();
    }

    // Crear el gráfico con el porcentaje de respuestas correctas
    this.chart = new Chart("Chart1", {
      type: "doughnut",
      data: {
        datasets: [{
          label: 'Porcentaje de respuestas correctas',
          data: [this.avgCorrectAnswers*100, 100 - this.avgCorrectAnswers*100], // Usar avgCorrectAnswers y su complementario
          backgroundColor: ['#FF4081', '#E0E0E0'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true
      },
      plugins: [centerTextPlugin]
    });
  }
}
