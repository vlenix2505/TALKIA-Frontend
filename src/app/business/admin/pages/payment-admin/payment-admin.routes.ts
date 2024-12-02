import {Routes} from '@angular/router';
import {PaymentAdminComponent} from './payment-admin.component';
import {ReportsComponent} from './reports/reports.component';

export const PaymentAdminRoutes: Routes = [
  {path: '', component: PaymentAdminComponent},
  {path: 'reports', component: ReportsComponent},

]
