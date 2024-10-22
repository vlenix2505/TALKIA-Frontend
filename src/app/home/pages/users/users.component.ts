import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { User } from '../../../model/user';
import { AdminNavComponent } from "../../../admin-nav/admin-nav.component";  // Asegúrate de que la ruta es correcta

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
    AdminNavComponent
],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export default class UsersComponent {
  displayedColumns: string[] = ['id', 'userName', 'name', 'email', 'dateOfBirth'];
  dataSource = new MatTableDataSource<User>();

  // Dummy Data
  DUMMY_USERS: User[] = [
    {
      id: 1,
      userName: 'Lio24Perez',
      name: 'Lionel Perez',
      email: 'lio24perez@example.com',
      password: 'pass123',
      dateOfBirth: new Date(1995, 6, 24),
      totalPoints: 1500,
      iCreatedAt: new Date(2023, 3, 14, 10, 30),
      iModifiedAt: new Date(2023, 3, 16, 15, 45)
    },
    {
      id: 2,
      userName: 'Carlota_Perez',
      name: 'Carlota Perez',
      email: 'carlota.perez@example.com',
      password: 'password456',
      dateOfBirth: new Date(1992, 11, 12),
      totalPoints: 1200,
      iCreatedAt: new Date(2023, 1, 20, 9, 0),
      iModifiedAt: new Date(2023, 1, 22, 11, 15)
    },
    {
      id: 3,
      userName: 'Liriwazotski30',
      name: 'Liria Wazotski',
      email: 'liriwazotski30@example.com',
      password: 'securepass789',
      dateOfBirth: new Date(1998, 5, 17),
      totalPoints: 950,
      iCreatedAt: new Date(2023, 5, 10, 13, 20),
      iModifiedAt: new Date(2023, 5, 12, 16, 30)
    },
    {
      id: 4,
      userName: 'Daniella_Vargas',
      name: 'Daniella Vargas',
      email: 'daniella.vargas@example.com',
      password: 'mypassword123',
      dateOfBirth: new Date(1996, 9, 30),
      totalPoints: 1750,
      iCreatedAt: new Date(2023, 7, 5, 14, 0),
      iModifiedAt: new Date(2023, 7, 7, 10, 45)
    },
    {
      id: 5,
      userName: 'Dayna_Avila',
      name: 'Dayna Avila',
      email: 'dayna.avila@example.com',
      password: 'daynapass',
      dateOfBirth: new Date(1997, 3, 2),
      totalPoints: 890,
      iCreatedAt: new Date(2023, 8, 15, 8, 15),
      iModifiedAt: new Date(2023, 8, 17, 14, 30)
    },
    {
      id: 6,
      userName: 'Daniel_Mont',
      name: 'Daniel Montoya',
      email: 'daniel.mont@example.com',
      password: 'montsecure',
      dateOfBirth: new Date(1990, 2, 14),
      totalPoints: 2100,
      iCreatedAt: new Date(2023, 9, 1, 11, 0),
      iModifiedAt: new Date(2023, 9, 3, 12, 30)
    }
  ];
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


  constructor() {
    this.loadDummyData();
  }

  ngOnInit(): void {
    this.loadDummyData();
  }

  // Cargar datos de prueba
  loadDummyData(): void {
    this.dataSource.data = this.DUMMY_USERS;
  }
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewProfile(user: User): void {
    console.log('Ver perfil de usuario:', user);
    // Lógica para navegar al perfil del usuario
  }
}
