import {Routes} from '@angular/router';
import {QuizzesMenuAdminComponent} from './quizzes-menu-admin.component';
import {ListQuestionsComponent} from './list-questions/list-questions.component';
import {QuizManagementComponent} from './quiz-management/quiz-management.component';
import {AddQuestionComponent} from './add-question/add-question.component';

export const QuizzesMenuAdminRoutes: Routes = [
  { path: '',
    children:[
      { path: '', component: QuizzesMenuAdminComponent},
      { path: 'list-quizzes', component: QuizManagementComponent},
      { path: 'add-question', component: AddQuestionComponent},
      { path: 'list-questions',
        loadChildren: ()  => import('./list-questions/questions-admin.routes').then(m => m.QuestionsAdminRoutes)}
    ],

  }];
