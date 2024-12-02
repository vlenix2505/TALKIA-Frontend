import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormArray,
  FormControl
} from '@angular/forms';
import {NavAdminComponent} from '../../../shared/nav-admin/nav-admin.component';
import {Answer} from '../../../../../core/model/answer';
import {NgForOf, NgIf} from '@angular/common';
import {Question} from '../../../../../core/model/question';
import {QuestionAdminService} from '../../../../../core/services/question-admin.service';
import {LevelService} from '../../../../../core/services/level.service';
import {Level} from '../../../../../core/model/level';
import {AnswerService} from '../../../../../core/services/answer.service';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    NavAdminComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {

  datosForm: FormGroup;
  level: Level = new Level();
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  questionAdminService: QuestionAdminService = inject(QuestionAdminService);
  levelService: LevelService = inject(LevelService);
  answerService: AnswerService = inject(AnswerService);


  levels: string[] = ['Basico', 'Intermedio', 'Avanzado'];
  //Seteado
  nivel: number = 1;


  constructor() {
    this.datosForm = this.fb.group({
      description: ['', Validators.required],
      level: [0, Validators.required],
      feedback: [''],
      answers: this.fb.array([])
    });

  }

  get answers(): FormArray {
    return this.datosForm.get('answers') as FormArray;
  }

  addAnswer() {
    const answerGroup = this.fb.group({
      description: [''],
      isCorrect: [false]
    });
    this.answers.push(answerGroup);
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  setNivel(event: Event) {
    const select = event.target as HTMLSelectElement;
    const  selectedNivel = select.value;
    switch (selectedNivel) {
      case 'Basico':
        this.nivel = 1;
        break;
      case 'Intermedio':
        this.nivel = 2;
        break;
      case 'Avanzado':
        this.nivel = 3;
        break;
      default:
        this.nivel = 0;
    }
    console.log(selectedNivel);
    console.log(this.nivel);
  }

  onCorrectAnswerSelected(index: number): void {
    this.answers.controls.forEach((control, i) => {
      if (i !== index) {
        control.get('isCorrect')?.setValue(false);
      }
    });
  }


  onSubmit(): void {
    if (this.datosForm.valid) {
      const question: Question = new Question();
      console.log(this.nivel);

      this.levelService.getLevel(this.nivel).subscribe((level: any): void => {
        this.level = level;

        question.level = this.level;
        question.feedback = this.datosForm.value.feedback;
        question.description = this.datosForm.value.description;

        console.log(question.level);
        console.log(question.feedback);
        console.log(question.description);

        this.questionAdminService.insert(question).subscribe((data: Object): void => {
          this.questionAdminService.list().subscribe((data: any) => {
            console.log("Lista actualizada de preguntas:", data);
            this.questionAdminService.setList(data);

            this.questionAdminService.getQuestionByDescription(question.description).subscribe((questionGet: Question) => {
              const q = questionGet;

              // Accedemos al FormArray de respuestas correctamente
              const answersArray = this.answers;

              // Recorremos las respuestas y suscribimos cada una usando `answerService.insert`
              answersArray.value.forEach((answer: any, index: number) => {
                // Asignamos la pregunta a cada respuesta
                answer.question = q;
                console.log(q.id);

                // Insertamos cada respuesta usando el servicio
                this.answerService.insert(answer).subscribe((insertedAnswer: any) => {
                  console.log(`Respuesta ${index + 1} insertada:`, insertedAnswer);
                });
              });

              // Después de insertar todas las respuestas, actualizamos la lista de preguntas y redirigimos
              this.questionAdminService.list().subscribe((data: any) => {
                console.log("Lista actualizada de preguntas:", data);
                this.questionAdminService.setList(data);
              });

                this.router.navigate(['admin/quizzes/list-questions']);
              },
              error => console.error("Error en el proceso:", error)
            );
            });
          });
        });
    }
  }

}
