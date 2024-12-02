import {Component, inject, OnInit} from '@angular/core';
import {NavAdminComponent} from '../../../../../shared/nav-admin/nav-admin.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router, RouterLink, RouterOutlet} from '@angular/router';
import {Level} from '../../../../../../../core/model/level';
import {QuestionAdminService} from '../../../../../../../core/services/question-admin.service';
import {LevelService} from '../../../../../../../core/services/level.service';
import {AnswerService} from '../../../../../../../core/services/answer.service';
import {Question} from '../../../../../../../core/model/question';
import {Content} from '../../../../../../../core/model/content';
import {forkJoin, Observable} from 'rxjs';
import { Answer } from '../../../../../../../core/model/answer';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [
    NavAdminComponent,
    NgForOf,
    ReactiveFormsModule,
    RouterOutlet,
    NgIf,
    RouterLink
  ],
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent implements OnInit {
  questionForm: FormGroup;
  listaNivel: Level[] = []; // Define listaNivel como un array de Level

  level: Level = new Level();
  fb = inject(FormBuilder);
  router: Router = inject(Router);
  questionAdminService: QuestionAdminService = inject(QuestionAdminService);
  levelService: LevelService = inject(LevelService);
  answerService: AnswerService = inject(AnswerService);
  route: ActivatedRoute = inject(ActivatedRoute);
  edicion: boolean = false;
  id: number = 2;

  levels: string[] = ['Basico', 'Intermedio', 'Avanzado'];
  //Seteado
  nivel: number = 1;
  deletedAnswerIds: number[] = [];

  constructor() {
    this.questionForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      level: [0, Validators.required],
      feedback: [''],
      answers: this.fb.array([])
    });

  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    const answerGroup = this.fb.group({
      description: [''],
      isCorrect: [false]
    });
    this.answers.push(answerGroup);
  }

  removeAnswer(index: number) {
      const answerGroup = this.answers.at(index);
      const answerId = answerGroup.value.id;

      // Si la respuesta tiene un ID, significa que existe en el backend, así que lo agregamos a deletedAnswerIds
      if (answerId) {
        this.deletedAnswerIds.push(answerId);
      }

      this.answers.removeAt(index); // Elimina la respuesta del FormArray en el frontend
    }

  setNivel(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedNivel = select.value;
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

  ngOnInit(): void { //sólo una vez luego del constructor
    this.loadLista();
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de EditQuestionComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      console.log(this.id);
      this.edicion = data['id'] != null;//true, false
      this.cargaForm()
    });
  }

  loadLista(): void {
    this.levelService.list().subscribe({
      next: (data) => this.listaNivel = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  delete(id:number){
    this.questionAdminService.delete(id).subscribe(()=>{
      this.loadLista()
    })
  }
  cargaForm() {
    if (this.edicion) {
      this.questionAdminService.listId(this.id).subscribe((data: Question) => {
        console.log(data);
        this.questionForm.patchValue({
          description: data.description,
          feedback: data.feedback,
          level: data.level.level,

        });
        this.answerService.listAnswerByQuestionAdmin(this.id).subscribe((answersData: any[]) => {
          console.log("Fetched Answers:", answersData);

          this.answers.clear();

          answersData.forEach(answer => {
            const answerGroup = this.fb.group({
              id: [answer.id],
              description: [answer.answersDescription],
              isCorrect: [answer.correct]
            });
            this.answers.push(answerGroup);
          });

        });


      });
    }
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const atLeastOneCorrect = this.answers.controls.some(control => control.value.isCorrect);

      if (!atLeastOneCorrect) {
        alert("Debe seleccionar al menos una respuesta correcta.");
        return; // Detener el envío si no hay respuestas correctas seleccionadas
      }

      const question: Question = new Question();
      this.levelService.getLevel(this.nivel).subscribe((level: any): void => {
        this.level = level;
        question.id = this.id;
        question.level = this.level;
        question.feedback = this.questionForm.value.feedback;
        question.description = this.questionForm.value.description;

        // Actualiza la pregunta
        this.questionAdminService.update(question).subscribe(() => {
          console.log("Datos de la pregunta actualizados.");

          this.processAnswers(question).then(() => {
            if (this.deletedAnswerIds.length > 0) {
              this.processDeletedAnswers().then(() => {
                console.log("Todas las respuestas se han procesado correctamente.");
                this.router.navigate(['admin/quizzes/list-questions']);
              }).catch(error => console.error("Error al eliminar respuestas:", error));
            } else {
              this.router.navigate(['admin/quizzes/list-questions']);
            }
          }).catch(error => console.error("Error al procesar respuestas:", error));
        });
      });
    }
  }

  private processAnswers(question: Question): Promise<void> {
    return new Promise((resolve, reject) => {
      const answersData = this.answers.controls.map(control => ({
        id: control.value.id,
        description: control.value.description,
        isCorrect: control.value.isCorrect,
        question: question,
      }));

      let processedAnswers = 0;
      const totalAnswers = answersData.length;

      answersData.forEach(answer => {
        const request = answer.id
          ? this.answerService.update(answer)
          : this.answerService.insert(answer);

        request.subscribe({
          next: () => {
            processedAnswers++;
            if (processedAnswers === totalAnswers) resolve();
          },
          error: reject,
        });
      });
    });
  }

  private processDeletedAnswers(): Promise<void> {
    return new Promise((resolve, reject) => {
      let processedDeletions = 0;
      const totalDeletions = this.deletedAnswerIds.length;

      this.deletedAnswerIds.forEach(id => {
        this.answerService.delete(id).subscribe({
          next: () => {
            processedDeletions++;
            if (processedDeletions === totalDeletions) resolve();
          },
          error: reject,
        });
      });
    });
  }
}
