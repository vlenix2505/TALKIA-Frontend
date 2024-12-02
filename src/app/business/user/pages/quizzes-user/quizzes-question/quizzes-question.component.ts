import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule, MatStepper} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {AnswerService} from '../../../../../core/services/answer.service';
import {QuizzesQuestionService} from '../../../../../core/services/quizzes-question.service';
import {QuestionAdminService} from '../../../../../core/services/question-admin.service';
import {QuestionsByQuiz} from '../../../../../core/model/questions-by-quiz';
import {MatOption, MatSelect} from '@angular/material/select';
import {DataQuizzesSharingService} from '../../../../../core/services/data-quizzes-sharing.service';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-quizzes-question',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    RouterOutlet,
    MatSelect,
    MatOption,
    NgIf,
    NgForOf,
    MatCard,
    MatCardContent,
    RouterLink,
    NgClass,
  ],
  templateUrl: './quizzes-question.component.html',
  styleUrl: './quizzes-question.component.css'
})
export class QuizzesQuestionComponent implements OnInit{
  quizId: number;
  levelId = 1// parseInt(localStorage.getItem('levelId') || '0', 10);

  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  answerService: AnswerService = inject(AnswerService);
  qqService: QuizzesQuestionService = inject(QuizzesQuestionService);
  dataSharing: DataQuizzesSharingService = inject(DataQuizzesSharingService);
  public userAnswer: string = '';
  submitAnswer: boolean = false;
  correctAnswer: boolean = false;
  messageDialog: string = '';
  attemps: number = 0;
  points: number[] = []
  totalPoints: number = 0;
  pointsBylevel: number[] = [];

  lista: QuestionsByQuiz[] = [];  // Lista de preguntas
  answersMap: { [key: number]: any[] } = {};  // Mapa de respuestas por ID de pregunta

  // Grupos de formularios para cada paso
  formGroups: FormGroup[] = [
    this.fb.group({ answer0: ['', Validators.required] }),
    this.fb.group({ answer1: ['', Validators.required] }),
    this.fb.group({ answer2: ['', Validators.required] }),
    this.fb.group({ answer3: ['', Validators.required] })
  ];

  stepperOrientation: Observable<StepperOrientation>;

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);
    this.pointsBylevel.push(20.0,12.0,10.0);
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.quizId = this.dataSharing.getId();
    console.log('Id en qq', this.quizId);
    this.loadListaQuestions();
  }

  loadListaQuestions(): void {
    this.qqService.listQuestionsByQuizId(this.quizId).subscribe({
      next: (data) => {
        this.lista = data;
        this.lista.forEach(question => this.loadListaAnswers(question.questionId));
        console.log("Preguntas");
        console.log(this.lista);
      },
      error: (err) => console.error('Error al cargar preguntas', err)
    });
  }

  loadListaAnswers(questionId: number): void {
    console.log('Question ID: ', questionId);
    this.answerService.listAnswerByQuestionUser(questionId).subscribe({
      next: (data) => this.answersMap[questionId] = data,
      error: (err) => console.error('Error al cargar respuestas', err)
    });
  }

  onSelectionChange(event: any, questionIndex: number,qqid:number,stepper:any): void {
    const selectedAnswer = event.target.value;
    this.userAnswer = selectedAnswer;
    console.log("Selected Answer for question index", questionIndex, ":", selectedAnswer);
    console.log(this.userAnswer);

    this.submitAnswer = true;
    this.attemps += 1;

    this.qqService.answerQuestion(qqid, this.userAnswer).subscribe((response: any) =>{
      console.log(response.message);
      this.messageDialog = response.message;
      if (!response.message.includes('Incorrect') && !response.message.includes('intentos')) {
        console.log("Correcto");
        this.correctAnswer = true;
        if(this.attemps == 1){
          this.points.push(this.pointsBylevel[this.levelId-1]);
          this.totalPoints += this.pointsBylevel[this.levelId-1];
          console.log(this.pointsBylevel[this.levelId-1]);
        }
        else{
          this.points.push(this.pointsBylevel[this.levelId-1]/2);
          this.totalPoints += this.pointsBylevel[this.levelId-1]/2;
          console.log(this.pointsBylevel[this.levelId-1]/2)
        }
        this.attemps = 0;
        stepper.next();
      } else {
        console.log("Incorrecto");
        this.correctAnswer = false
      }

      if(this.attemps >= 2){
        this.points.push(0);
        this.totalPoints += 0;
        console.log("+0");
        stepper.next();
      }
    });
  }

  nextQuestion(message:string): void {
    this.submitAnswer = false;
    this.correctAnswer = false;
    this.attemps = 0;
  }
}
