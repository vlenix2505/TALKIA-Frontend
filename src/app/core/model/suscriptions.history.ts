import {Payment} from './payment';
import {User} from './user';
import {Suscription} from './suscription';

export class SuscriptionsHistory{
  startDate: Date;
  endDate: Date;
  id: number;
  payment: Payment;
  suscription: Suscription;
  user: User;
}
