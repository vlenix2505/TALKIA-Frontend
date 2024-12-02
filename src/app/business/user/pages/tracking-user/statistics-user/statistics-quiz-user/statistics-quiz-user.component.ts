import { Component, inject, OnInit } from '@angular/core';

import {DatePipe, NgForOf, NgIf} from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatCard, MatCardContent, MatCardImage } from '@angular/material/card';

import { Chart, registerables } from 'chart.js';
import {NavUserComponent} from '../../../shared/nav-user/nav-user.component';
import {Quiz} from '../../../../../../core/model/quiz';
import {UsersService} from '../../../../../../core/services/users.service';
import {QuizzesQuestionService} from '../../../../../../core/services/quizzes-question.service';
import {QuizUserService} from '../../../../../../core/services/quiz-user.service';
import {AnswerService} from '../../../../../../core/services/answer.service';
import {QuizzesQuestionQuiz} from '../../../../../../core/model/quizzes-question-quiz';

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
  selector: 'app-statistics-quiz-user',
  standalone: true,
  imports: [
    NavUserComponent,
    NgForOf,
    RouterOutlet,
    MatCardImage,
    MatCard,
    MatCardContent,
    NgIf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './statistics-quiz-user.component.html',
  styleUrls: ['./statistics-quiz-user.component.css']
})
export class StatisticsQuizUserComponent implements OnInit {
  chart: any;
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  questionDetails: QuizzesQuestionQuiz[] = [];
  quizzes: Quiz[] = [];
  quizId: number;
  avgCorrectAnswers: number = 0;
  countCorrectAnswers: number;
  countSecondAttempt: number;
  qqService: QuizzesQuestionService = inject(QuizzesQuestionService);
  quizService: QuizUserService = inject(QuizUserService);
  totalPoints: number;

  ngOnInit() {
    this.loadLista();
  }

  loadLista() {
    this.quizService.listQuizzesByUser(this.userId).subscribe({
      next: (data: Quiz[]) => {
        this.quizzes = data;
        console.log(data);

        if (this.quizzes.length > 0) {
          this.quizId = this.quizzes[0].id; // Load the first quiz by default
          this.onUpdateList();
        } else {
          console.warn('No quizzes found for this user.');
        }
      },
      error: (err) => {
        console.error('Failed to load quizzes', err);
      }
    });
  }

  onUpdateList() {
    this.qqService.getCorrectAnswerCount(this.quizId).subscribe({
      next: (data) => {
        this.countCorrectAnswers = data;
      }
    });

    this.qqService.getSecondAttemptAnswers(this.quizId).subscribe({
      next: (data) => {
        this.countSecondAttempt = data;
      }
    });

    this.qqService.getPercentageCorrectAnswers(this.quizId).subscribe({
      next: (data) => {
        this.avgCorrectAnswers = data;
        this.updateChart();
      }
    });

    this.qqService.listQuizzesQuestionByQuizId(this.quizId).subscribe({
      next: (data: QuizzesQuestionQuiz[]) => {
        this.questionDetails = data;
        console.log(data);
      }
    });

    this.quizService.getQuizById(this.quizId).subscribe({
      next: (data: Quiz) => {
        this.totalPoints = data.totalPoints;
        console.log(data);
      }
    });
  }

  onDetails(quizId: number) {
    this.quizId = quizId;
    this.onUpdateList();
  }

  public config: any = {
    type: "doughnut",
    data: {
      datasets: [{
        label: 'Porcentaje de respuestas correctas',
        data: [this.avgCorrectAnswers * 100, 100 - (this.avgCorrectAnswers * 100)],
        backgroundColor: ['#FF4081', '#E0E0E0'],
        hoverOffset: 4
      }]
    },
    options: {
      plugins: {
        legend: {
          display: true
        }
      }
    },
    plugins: [centerTextPlugin]
  };

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.avgCorrectAnswers * 100,
        100 - (this.avgCorrectAnswers * 100)
      ];
      this.chart.update();
    } else {
      this.chart = new Chart("Chart1", this.config);
    }
  }

}
