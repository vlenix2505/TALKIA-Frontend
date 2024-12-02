import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
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
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {Payment} from '../../../../core/model/payment';
import {PaymentAdminService} from '../../../../core/services/payment-admin.service';
import {NavAdminComponent} from '../../shared/nav-admin/nav-admin.component';
import {SuscriptionsHistory} from '../../../../core/model/suscriptions.history';
import {SuscriptionsHistoryService} from '../../../../core/services/suscriptions-history.service';
import {HistoryObject} from '../../../../core/model/history-object';
import {ProfileImageService} from '../../../../core/services/profile-image.service';
import {UsersService} from '../../../../core/services/users.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-payment-admin',
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
    NavAdminComponent,
    RouterOutlet,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './payment-admin.component.html',
  styleUrl: './payment-admin.component.css',
})


export class PaymentAdminComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['profile','varName1','id' ,'date', 'amount'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  title = 'Historial de Transacciones';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  susService: SuscriptionsHistoryService = inject(SuscriptionsHistoryService);
  profileImageService: ProfileImageService = inject(ProfileImageService);

  //router: Router = inject(Router);


  constructor() {
    console.log("Load constructor!")
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Load Lista!");
    this.loadLista();
  }

  private loadLista(): void {
    this.susService.listHistories().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Data recibida:', data);  // Asegúrate de que el array de levels esté presente en los datos recibidos
      },
      error: (error) => console.log("Error en consulta",error),
    });
    console.log(this.dataSource.data);
  }

  getProfileImage(userId: number): string {
    return this.profileImageService.getProfileImage(userId);
  }


  onUserPayments(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const userName = inputElement.value;
    if (userName != '') {
      console.log(userName);
      this.susService.listHistoryByUser(userName).subscribe({
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

  onPaymentTypeChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const type = inputElement.value;
    this.susService.listHistoryByPaymentType(type).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Data recibida:', data);
      },
      error: (error) => console.log("Error en consulta",error),
    });
    console.log(this.dataSource.data);
  }

  onSuscriptionChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const sus = inputElement.value;
    this.susService.listHistoryBySuscription(sus).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Data recibida:', data);  // Asegúrate de que el array de levels esté presente en los datos recibidos
      },
      error: (error) => console.log("Error en consulta",error),
    });
    console.log(this.dataSource.data);

  }

  onTypeReset(): void {
    console.log("Resetting type filter");
    this.clearRadioButtons('type');
    this.loadLista();
  }

  onSusReset(): void {
    console.log("Resetting theme filter");
    this.clearRadioButtons('sus');
    this.loadLista();
  }

  private clearRadioButtons(name: string): void {
    document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((input) => {
      input.checked = false;
    });
  }

}
