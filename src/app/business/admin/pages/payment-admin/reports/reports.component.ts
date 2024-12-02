import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Payment} from '../../../../../core/model/payment';
import {PaymentAdminService} from '../../../../../core/services/payment-admin.service';
import {MatSort} from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {TotalAmountSubtype} from '../../../../../core/model/total-amount-subtype';
import {CountHistoriesObject} from '../../../../../core/model/count-histories-object';
import {NavAdminComponent} from '../../../shared/nav-admin/nav-admin.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    RouterLink,
    MatSort,
    MatTable,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NavAdminComponent,
    RouterOutlet,
    MatHeaderCellDef
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  paymentService: PaymentAdminService = inject(PaymentAdminService);
  displayedColumns1: string[] = ['suscriptionType', 'countHistories','totalAmount'];
  displayedColumns2: string[] = ['varType', 'count'];
  dataSus: MatTableDataSource<TotalAmountSubtype> = new MatTableDataSource<TotalAmountSubtype>();
  dataPay: MatTableDataSource<CountHistoriesObject> = new MatTableDataSource<CountHistoriesObject>();
  numberFilter: number = 0;
  startDate: Date | null = null;
  endDate: Date | null = null;

  onFilter() {
    const formattedStartDate = this.formatDate(this.getStartDate());
    const formattedEndDate = this.formatDate(this.getEndDate());

    // Llama a los métodos de servicio con las fechas formateadas
    this.listaSusTable(formattedStartDate, formattedEndDate);
    this.listaPayTable(formattedStartDate, formattedEndDate);
  }

  onChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.numberFilter = parseInt(inputElement.value);
  }

  getStartDate(): Date {
    if (this.numberFilter === 1) {
      // Predeterminado: desde enero 2020
      return new Date(2020, 0, 1);
    } else if (this.numberFilter === 2) {
      return this.startDate ? this.startDate : new Date(2020, 0, 1); // O puedes dejarlo en null si prefieres
    }
    return new Date(); // Manejo de un caso por defecto
  }

  getEndDate(): Date {
    if (this.numberFilter === 1) {
      // Predeterminado: hasta hoy
      return new Date();
    } else if (this.numberFilter === 2) {
      return this.endDate ? this.endDate : new Date();
    }
    return new Date();
  }


  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }


  listaSusTable(startDate: string, endDate: string): void {
    this.paymentService.listTotalAmountBySubType(startDate, endDate).subscribe({
      next: (data) => {
        this.dataSus.data = data;
        console.log('Data recibida:', data);
      },
      error: (error) => console.log("Error en consulta", error),
    });
  }

  listaPayTable(startDate: string, endDate: string) {
    this.paymentService.countHistoriesByPaymentType(startDate, endDate).subscribe({
      next: (data) => {
        this.dataPay.data = data;
        console.log('Data recibida:', data);
      },
      error: (error) => console.log("Error en consulta", error),
    });
  }

  onDateChange(dateType: 'start' | 'end', event: Event) {
    const inputDate = (event.target as HTMLInputElement).value;
    if (dateType === 'start') {
      this.startDate = new Date(inputDate);
    } else if (dateType === 'end') {
      this.endDate = new Date(inputDate);
    }
  }



}
