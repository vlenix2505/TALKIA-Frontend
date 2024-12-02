import {RouterModule, Routes} from '@angular/router';
import {QuizzesMenuAdminComponent} from '../../../admin/pages/quizzes-menu-admin/quizzes-menu-admin.component';
import {QuizzesUserComponent} from './quizzes-user.component';
import {QuizzesQuestionComponent} from './quizzes-question/quizzes-question.component';
import {NgModule} from '@angular/core';
import {routes} from '../../../../app.routes';
import {CommonModule} from '@angular/common';


export const QuizzesUserRoutes: Routes = [
  { path: '',
    children:[
      { path: '', component: QuizzesUserComponent },
      { path: 'quizzes-question', component: QuizzesQuestionComponent },
    ],
  }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(QuizzesUserRoutes),
    QuizzesUserComponent,
    // Configura las rutas del módulo secundario
  ],
  declarations: []
})
export class LandingModule {}
