import {Routes} from '@angular/router';
import {ListQuestionsComponent} from './list-questions.component';
import {EditQuestionComponent} from './pages/edit-question/edit-question.component';

export const QuestionsAdminRoutes: Routes = [
  { path: '',
    children:[
      { path: '', component: ListQuestionsComponent},
      { path: 'edit-question/:id', component: EditQuestionComponent},


    ],

  }];
