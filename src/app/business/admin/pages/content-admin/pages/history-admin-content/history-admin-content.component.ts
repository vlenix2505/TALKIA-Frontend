import {Component, inject, OnInit} from '@angular/core';
import {NavAdminComponent} from '../../../../shared/nav-admin/nav-admin.component';
import {DatePipe} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ContentHistoryService} from '../../../../../../core/services/content-history.service';
import {ShowHistoryContent} from '../../../../../../core/model/show-history-content';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-history-admin-content',
  standalone: true,
  imports: [
    NavAdminComponent,
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatTable,
    MatHeaderCellDef,
    RouterLink
  ],
  templateUrl: './history-admin-content.component.html',
  styleUrl: './history-admin-content.component.css'
})
export class HistoryAdminContentComponent implements OnInit{
  dataSource: MatTableDataSource<ShowHistoryContent> = new MatTableDataSource<ShowHistoryContent>();
  displayedColumns: string[] = ['empty','content', 'userName', 'iViewedAt'];
  userContentService: ContentHistoryService = inject(ContentHistoryService);

  ngOnInit() {
    this.loadLista();
  }

  loadLista(){
    this.userContentService.list().subscribe({
      next: data => {
        this.dataSource = data;
        console.log('Data recibida:', data);
      }
    })
  }

  onSearch(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const varName = inputElement.value;
    console.log(varName)

    if(varName != ''){
      console.log(varName);
      this.userContentService.listHistoryByContent(varName).subscribe({
        next: (data) => {
          this.dataSource = data;
          console.log('Data filtrada recibida');
          console.log(data);
        },
        error: (error) => console.log("Error en consulta"),
      });
    }
    else{
      this.loadLista();
    }

  }
}
