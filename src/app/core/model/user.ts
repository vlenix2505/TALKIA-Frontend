import {Level} from './level';

export class User {
  id: number;
  userName: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  totalPoints: number;
  icreatedAt: Date = new Date();
  iModifiedAt: Date = new Date();
  level: Level;
}
