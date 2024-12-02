import {Component, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';
import {NavAdminComponent} from '../../../admin/shared/nav-admin/nav-admin.component';
import {NavUserComponent} from '../shared/nav-user/nav-user.component';
import {Content} from '../../../../core/model/content';
import {ContentUserService} from '../../../../core/services/content-user.service';
import {Observable} from 'rxjs';
import {data} from 'autoprefixer';
import {RatingService} from '../../../../core/services/rating.service';
import {ContentHistoryService} from '../../../../core/services/content-history.service';
import {UserContent} from '../../../../core/model/user-content';
import {UsersService} from '../../../../core/services/users.service';
import {User} from '../../../../core/model/user';


@Component({
  selector: 'app-content-user',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatSort,
    MatButton,
    MatHeaderRow,
    MatPaginator,
    RouterLink,
    MatSortHeader,
    MatRow,
    MatRowDef,
    DatePipe,
    MatHeaderRowDef,
    CommonModule,
    RouterOutlet,
    NavAdminComponent,
    NavUserComponent
  ],
  templateUrl: './content-user.component.html',
  styleUrl: './content-user.component.css',
  encapsulation: ViewEncapsulation.None, // Desactiva estilos de Material para este componente

})
export class ContentUserComponent implements OnInit{
  lista: Content[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  level: string | undefined;
  type: string | undefined;
  theme: string | undefined;
  contentUserService: ContentUserService = inject(ContentUserService);
  ratingService: RatingService= inject(RatingService);
  userContentService: ContentHistoryService = inject(ContentHistoryService);
  isDateAsc = true;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  //Identificar usuario
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);

  ngOnInit(): void {
    console.log("Load Lista!");
    this.loadLista();
  }

  private loadLista(): void{
    this.contentUserService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Data recibida:', data);
      },
      error: (error) => console.log("Error en consulta",error)
    });
    console.log(this.dataSource);
  }

  onSearch(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const contentName = inputElement.value;

    //this.onFiltersReset();

    if (contentName != '') {
      console.log(contentName);
      this.contentUserService.listByTitle(contentName).subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (error) => console.log("Error en consulta"),
      })
    }
    else{
      this.loadLista();
    }
  }

  onDate() {

    this.clearInput();
   // this.onFiltersReset();

    if (this.isDateAsc) {
      this.contentUserService.listContentOrderByDateOfPublicationAsc().subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (error) => console.log("Error en consulta de fecha ascendente", error),
      });
    } else {
      this.contentUserService.listContentOrderByDateOfPublicationDesc().subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (error) => console.log("Error en consulta de fecha descendente", error),
      });
    }
    this.isDateAsc = !this.isDateAsc;
  }

  onPopularity() {

    this.clearInput();
    //this.onFiltersReset();

    this.ratingService.listContentOrderByScore().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => console.log("Error en consulta de popularidad", error),
    });
  }

  resetOrder() {

    //this.onFiltersReset();
    this.clearInput();

    this.contentUserService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => console.log("Error al resetear la ordenación", error),
    });
  }

  onDifficultyChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.level = inputElement.value;
    this.applyFilters();
  }

  onTypeChange(event:Event){
    const inputElement = event.target as HTMLInputElement;
    this.type = inputElement.value;
    this.applyFilters();
  }

  onThemeChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.theme = inputElement.value;
    this.applyFilters();
  }

  applyFilters(): void{

    this.clearInput();

    this.contentUserService.listFilterContent(this.level,this.theme,this.type).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => console.log("Error en consulta"),
    });
  }

  clearInput() {
    if (this.searchInput) {
        this.searchInput.nativeElement.value = '';
    }
  }

  onFiltersReset(): void {
    console.log("Resetting filters");
    this.clearRadioButtons('difficulty');
    this.clearRadioButtons('type');
    this.clearRadioButtons('theme');
    this.loadLista();
    this.level = undefined;
    this.theme = undefined;
    this.type = undefined;
  }

  onRegister(id: number){
    console.log('registrado en UserContent')
    this.userContentService.insertUserContent(id,this.userId).subscribe({
      next: (data: UserContent) => {
        console.log(data);
      }
    })
  }

  private clearRadioButtons(name: string): void {
    document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((input) => {
      input.checked = false;
    });
  }
}
