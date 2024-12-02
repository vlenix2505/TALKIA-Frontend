import {Component, inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import {Router, RouterModule} from '@angular/router';
import {User} from '../../../../core/model/user';
import { UsersService } from '../../../../core/services/users.service';
import {NavAdminComponent} from '../../shared/nav-admin/nav-admin.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NavAdminComponent,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export default class UsersComponent {
  displayedColumns: string[] = ['id', 'userName', 'name', 'email', 'dateOfBirth'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  title = 'Lista de Usuarios Registrados';
  profileImage: string = 'assets/img/profile_logo.png'; // Imagen por defecto

  exportCSV(): void {
    const data = this.dataSource.data.map(user => ({
      id: user.id,
      userName: user.userName,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth.toLocaleDateString(),
    }));

    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(objArray: any[]): string {
    const headers = Object.keys(objArray[0]).join(',');
    const rows = objArray.map(row => Object.values(row).join(',')).join('\n');
    return headers + '\n' + rows;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  UsersService: UsersService = inject(UsersService);
  router: Router = inject(Router);
  constructor() {
    console.log("Load constructor!")
  }

  ngOnInit(): void {
    console.log("Load Lista!");
    this.loadLista();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadLista():void {
    this.UsersService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Data recibida:', data);  // Asegúrate de que el array de levels esté presente en los datos recibidos
      },
      error: (error) => console.log("Error e en consulta",error),
    });
    console.log(this.dataSource.data);
  }
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProfileImage(userId: number): string {
    if (userId % 2 === 0) {
      return `https://randomuser.me/api/portraits/men/${userId}.jpg`;
    } else {
      return `https://randomuser.me/api/portraits/women/${userId}.jpg`;
    }
  }


  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const userName = inputElement.value;

    if(userName != ''){
      console.log(userName);
      this.UsersService.listByUsername(userName).subscribe({
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
