import {User} from './user';
import {Level} from './level';

export class Quiz {
  id: number;
  totalPoints: number;
  icreatedAt: Date; // Temporarily make it optional and of type 'any'
  user: User;

}

