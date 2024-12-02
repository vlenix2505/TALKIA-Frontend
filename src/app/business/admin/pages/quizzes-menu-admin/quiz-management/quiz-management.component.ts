import {Component, inject, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {DatePipe, NgForOf} from '@angular/common';
import {NavAdminComponent} from '../../../shared/nav-admin/nav-admin.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Quiz} from '../../../../../core/model/quiz';
import {QuizAdminService} from '../../../../../core/services/quiz-admin.service';

@Component({
  selector: 'app-quiz-management',
  standalone: true,
  imports: [
    NgForOf,
    RouterOutlet,
    RouterLink,
    NavAdminComponent,
    DatePipe
  ],
  templateUrl: './quiz-management.component.html',
  styleUrl: './quiz-management.component.css'
})
export class QuizManagementComponent {
  lista: Quiz[]=[];
  displayedColumns: string[]=['id', 'TotalPoints','iCreatedAt', 'user'];
  dataSource: MatTableDataSource<Quiz>= new MatTableDataSource<Quiz>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  quizAdminService: QuizAdminService = inject(QuizAdminService);
  router: Router = inject(Router);

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
  }

  private loadLista():void {
    this.quizAdminService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Data recibida:', data);  // Asegúrate de que el array de levels esté presente en los datos recibidos
      },
      error: (error) => console.log("Error e en consulta",error),
    });
    console.log(this.dataSource.data);
  }
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const userName = inputElement.value;

    if(userName != ''){
      console.log(userName);
      this.quizAdminService.listByUser(userName).subscribe({
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


}
