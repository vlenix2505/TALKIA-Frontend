import {Level} from './level';

export class Question {
  id: number;
  description: string;
  feedback: string;
  iCreatedAt: Date= new Date();
  iCreatedBy: string;
  iModifiedAt: Date= new Date();
  iModifiedBy: string;
  level: Level;
}

