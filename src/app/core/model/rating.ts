import {User} from './user';
import {Content} from './content';

export class Rating {
  id: number;
  iRatedAt: Date;
  score: number;
  user: User;
  content:Content;
}
