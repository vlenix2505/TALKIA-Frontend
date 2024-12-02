import {Quiz} from './quiz';
import {Question} from './question';

export class QuizzesQuestionQuiz {
  qqid: number;
  quiz: Quiz;
  question: Question;
  correctAnswer: string;
  attempt: number;
  is_correct: boolean;
}
