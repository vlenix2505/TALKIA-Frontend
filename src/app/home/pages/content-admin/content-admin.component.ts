import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminNavComponent } from "../../../admin-nav/admin-nav.component";

interface Content {
  id: number;
  title: string;
  description: string;
  year: number;
  type: string;
  theme: string;
  link: string;
  iCreatedAt: Date;
  iModifiedAt: Date;
  iCreatedBy: string;
  iModifiedBy: string;
}

@Component({
  selector: 'app-content-admin',
  standalone: true,
  imports: [
    CommonModule,
    AdminNavComponent
],
  templateUrl: './content-admin.component.html',
  styleUrls: ['./content-admin.component.css'],
})
export class ContentAdminComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Content>;

  // Dummy Data para probar
  DUMMY_CONTENT: Content[] = [
    { id: 1, title: 'The Great Gatsby', description: 'A classic novel.', year: 1925, type: 'Libro', theme: 'Literatura', link: 'https://example.com/gatsby', iCreatedAt: new Date(), iModifiedAt: new Date(), iCreatedBy: 'Admin', iModifiedBy: 'Admin' },
    { id: 2, title: '1984', description: 'A dystopian social science fiction novel.', year: 1949, type: 'Libro', theme: 'Ciencia Ficción', link: 'https://example.com/1984', iCreatedAt: new Date(), iModifiedAt: new Date(), iCreatedBy: 'Admin', iModifiedBy: 'Admin' },
    { id: 3, title: 'To Kill a Mockingbird', description: 'A novel about racial injustice.', year: 1960, type: 'Libro', theme: 'Literatura', link: 'https://example.com/mockingbird', iCreatedAt: new Date(), iModifiedAt: new Date(), iCreatedBy: 'Admin', iModifiedBy: 'Admin' },
    { id: 4, title: 'Moby-Dick', description: 'A novel about the voyage of the whaling ship Pequod.', year: 1851, type: 'Libro', theme: 'Aventura', link: 'https://example.com/mobydick', iCreatedAt: new Date(), iModifiedAt: new Date(), iCreatedBy: 'Admin', iModifiedBy: 'Admin' },
    { id: 5, title: 'The Catcher in the Rye', description: 'A novel about teenage alienation and rebellion.', year: 1951, type: 'Libro', theme: 'Juvenil', link: 'https://example.com/catcher', iCreatedAt: new Date(), iModifiedAt: new Date(), iCreatedBy: 'Admin', iModifiedBy: 'Admin' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Inicializar dataSource con los datos dummy
    this.dataSource = new MatTableDataSource(this.DUMMY_CONTENT);
  }

  ngOnInit(): void {
    console.log('Datos cargados:', this.DUMMY_CONTENT);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
