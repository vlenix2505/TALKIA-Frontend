import {Quiz} from './quiz';
import {Question} from './question';

export class QuizzesQuestion {
  id: number;
  quiz: Quiz;
  question: Question;
  userAnswer: string;
  pointsEarned: number;
  attempt: number;
  iAttempAt : Date;
  is_correct: boolean;
}
