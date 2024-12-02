import {Routes} from '@angular/router';
import {UserProfileComponent} from './user-profile.component';
import {SuscriptionsComponent} from './suscriptions/suscriptions.component';
import {HistoryContentComponent} from './history-content/history-content.component';

export const UserProfileRoutes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',component: UserProfileComponent
      },
      {
        path: 'subscriptions',component: SuscriptionsComponent
      },
      {
        path: 'content-history', component: HistoryContentComponent
      }
    ]
  }
]
