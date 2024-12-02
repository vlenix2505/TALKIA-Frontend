import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NavUserComponent} from '../shared/nav-user/nav-user.component';
import {QuizUserService} from '../../../../core/services/quiz-user.service';
import {Quiz} from '../../../../core/model/quiz';
import {DataQuizzesSharingService} from '../../../../core/services/data-quizzes-sharing.service';
import {LoadingScreenComponent} from '../shared/loading-screen/loading-screen.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-quizzes-user',
  standalone: true,
  imports: [
    RouterOutlet,
    NavUserComponent,
    RouterLink,
    LoadingScreenComponent,
    NgIf
  ],
  templateUrl: './quizzes-user.component.html',
  styleUrl: './quizzes-user.component.css'
})
export class QuizzesUserComponent {

  userQuizService: QuizUserService = inject(QuizUserService)
  router: Router = inject(Router);
  loading = false;
  dataSharing: DataQuizzesSharingService = inject(DataQuizzesSharingService);
  userId:  number = parseInt(localStorage.getItem('userId') || '0', 10);

  startQuiz(userId: number) {
    console.log('Id de usuario: ', userId);
    this.loading = true;

    setTimeout(() => {
      this.userQuizService.insert(userId).subscribe(
        (data: Quiz) => {
          console.log('Quizz creado', data.id);
          console.log('Carga completa');
          this.loading = false;
          this.dataSharing.setId(data.id);
          this.router.navigate(['/user/quizzes/quizzes-question']);

        },
        (error) => {
          console.error('Error al crear el quiz:', error);
          this.loading = false;
        }
      );
    }, 5000);
  }
}
