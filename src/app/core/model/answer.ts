import {Question} from './question';

export class Answer {
  id: number;
  description: string;
  isCorrect: boolean;
  question: Question;

}
