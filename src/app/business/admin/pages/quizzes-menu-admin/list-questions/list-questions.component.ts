import {Component, inject, ViewChild} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {NgForOf} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';
import {Question} from '../../../../../core/model/question';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {QuestionAdminService} from '../../../../../core/services/question-admin.service';
import {Level} from '../../../../../core/model/level';
import {NavAdminComponent} from '../../../shared/nav-admin/nav-admin.component';

@Component({
  selector: 'app-list-questions',
  standalone: true,
  imports: [
    NgForOf,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatCheckbox,
    ReactiveFormsModule,
    RouterLink,
    MatExpansionPanelTitle,
    RouterOutlet,
    NavAdminComponent

  ],
  templateUrl: './list-questions.component.html',
  styleUrl: './list-questions.component.css'
})
export class ListQuestionsComponent {
  lista: Question[]=[];
  displayedColumns: string[]=['id', 'description'];
  dataSource: MatTableDataSource<Question>= new MatTableDataSource<Question>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  questionAdminService: QuestionAdminService = inject(QuestionAdminService);
  router: Router = inject(Router);
  levels: Level[]=[];
  filterForm: FormGroup;

  constructor() {
    console.log("Load constructor!")
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    console.log("Load Lista!");
    this.loadLista();
    this.loadLevels();
    //console.log('Datos cargados:', this.DUMMY_CONTENT);
  }

  private loadLista():void {
    this.questionAdminService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Data recibida:', data);  // Asegúrate de que el array de levels esté presente en los datos recibidos
      },
      error: (error) => console.log("Error e en consulta",error),
    });
    console.log(this.dataSource.data);
  }

  protected readonly String = String;

  private loadLevels(): void {
    this.questionAdminService.getLevels().subscribe({
      next: (data) => {
        this.levels = data;  // Guardar los niveles en el array
        console.log('Niveles recibidos:', data);
      },
      error: (error) => console.log("Error en consulta de niveles", error),
    });

  }

  onSearch(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const questionDes = inputElement.value;

    if(questionDes != ''){
      console.log(questionDes);
      this.questionAdminService.listQuestionsByDescription(questionDes).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          console.log('Data filtrada recibida');
        },
        error: (error) => console.log("Error en consulta"),
      });
    }
    else{
      this.loadLista();
    }


  }

  onDifficultyChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const level = inputElement.value;

    console.log(level);

    this.questionAdminService.listQuestionsByLevel(level).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: () => console.log("Error en consulta"),
    });
  }

  onDifficultyReset(): void {
    console.log("Resetting level filter");
    this.clearRadioButtons('level');
    this.loadLista();
  }
  private clearRadioButtons(name: string): void {
    document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((input) => {
      input.checked = false;
    });
  }
}
