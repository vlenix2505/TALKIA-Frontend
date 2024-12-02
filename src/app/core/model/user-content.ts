import {User} from './user';
import {Content} from './content';

export class UserContent {
  id: number;
  name: string;
  iViewedAt: Date = new Date();
  user: User;
  content: Content;
}
