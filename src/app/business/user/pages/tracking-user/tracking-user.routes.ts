import {Routes} from '@angular/router';
import {TrackingUserComponent} from './tracking-user.component';

export const TrackingUserRoutes: Routes = [
  { path: '',
    children:[
      { path: '', component: TrackingUserComponent },
      { path: 'statistics',
        loadChildren: () => import('./statistics-user/statistics-user.routes').then(m => m.StatisticsUserRoutes)
      }
    ],
  }];
