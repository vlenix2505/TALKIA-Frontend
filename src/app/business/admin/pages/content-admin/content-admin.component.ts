import {Component, OnInit, ViewChild, AfterViewInit, inject} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';  // Importar CommonModule
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {ContentAdminService} from '../../../../core/services/content-admin.service';
import {Content} from '../../../../core/model/content';
import {NavAdminComponent} from '../../shared/nav-admin/nav-admin.component';
import {DeleteContentComponent} from './pages/delete-content/delete-content.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-content-admin',
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
    MatDialogModule,

    MatHeaderRowDef,
    CommonModule,
    RouterOutlet,
    NavAdminComponent
  ],
  templateUrl: './content-admin.component.html',
  styleUrls: ['./content-admin.component.css'],
})
export class ContentAdminComponent implements OnInit, AfterViewInit {
  lista: Content[]=[];
  displayedColumns: string[]=['id', 'title', 'type','theme', 'year', 'level'];
  dataSource: MatTableDataSource<Content>= new MatTableDataSource<Content>();
  title = 'Gestión de Contenidos';
  dialog = inject(MatDialog)

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  contentAdminService: ContentAdminService = inject(ContentAdminService);

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
    this.contentAdminService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Data recibida:', data);
      },
      error: (error) => console.log("Error en consulta",error),
    });
    console.log(this.dataSource.data);
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const contentName = inputElement.value;

    if(contentName != ''){
      console.log(contentName);
      this.contentAdminService.listByTitle(contentName).subscribe({
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
  delete(id:number){
    this.contentAdminService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }
  openDialog(id:number){
    const dialogRef = this.dialog.open(DeleteContentComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
        console.log("Producto eliminado")
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }


}
