import {Routes} from '@angular/router';
import {StatisticsQuizUserComponent} from './statistics-quiz-user/statistics-quiz-user.component';
import {StatisticsUserComponent} from './statistics-user.component';

export const StatisticsUserRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StatisticsUserComponent },
      { path: 'statistics-quiz-user', component: StatisticsQuizUserComponent }
    ]
  }
];
