import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common'; // Importar CommonModule para usar *ngFor
import { PaymentAdminService } from '../../../services/payment-admin.service';
import { AdminNavComponent } from "../../../admin-nav/admin-nav.component";

interface Payment {
  username: string;
  transactionId: string;
  date: Date;
  amount: number;
}

@Component({
  selector: 'app-payment-admin',
  standalone: true,
  imports: [
    CommonModule, // Importar CommonModule
    MatPaginator,
    MatSort,
    AdminNavComponent
],
  templateUrl: './payment-admin.component.html',
  styleUrls: ['./payment-admin.component.css'],
})
export class PaymentAdminComponent implements OnInit {
  displayedColumns: string[] = ['username', 'transactionId', 'date', 'amount'];
  dataSource: MatTableDataSource<Payment> = new MatTableDataSource<Payment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private paymentAdminService: PaymentAdminService) {}

  ngOnInit(): void {
    // Cargar la lista de pagos
    this.loadLista();
  }

  ngAfterViewInit(): void {
    // Conectar el paginador y el ordenamiento con la tabla
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadLista(): void {
    const DUMMY_DATA: Payment[] = [
      { username: 'Samantha Diaz', transactionId: '0012552', date: new Date('2024-07-25'), amount: 500 },
      { username: 'Carlota Perez', transactionId: '5684628', date: new Date('2024-07-27'), amount: 500 },
      { username: 'Daniella Vargas', transactionId: '8966523', date: new Date('2024-07-15'), amount: 290 },
      { username: 'Dayana Ávila', transactionId: '9965536', date: new Date('2024-07-11'), amount: 290 },
    ];

    this.dataSource = new MatTableDataSource(DUMMY_DATA);
  }
}
