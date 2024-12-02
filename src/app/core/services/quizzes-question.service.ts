import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuizzesQuestionService {
  private url = environment.apiUrl + "/api"
  private http: HttpClient = inject(HttpClient);

  constructor() { }
  listQuestionsByQuizId(quizId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/listQuestionsByQuiz/" + quizId,{});
  }

  answerQuestion(qqId: number, userAnswer: string): Observable<any>{
    return this.http.put(this.url + "/quizzesQuestion/answerQuestion/" + qqId + "/" + userAnswer, {});
  }

  numberOfEndedQuizzes(lvId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/getTotalQuizzesPerLevel/" + lvId,{});
  }
  avgQuestionAdmin(lvId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/getAvgPointsByLevel/" + lvId , {});
  }

  getSecondAttemptAnswers(quizId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/getSecondAttemptCorrect/" + quizId , {});
  }

  getTotalPoints(userId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/getTotalPoints/" + userId, {});
  }

  getCorrectAnswerCount(quizId: number):Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/getCorrectAnswersCount/" + quizId , {});
  }

  getPercentageCorrectAnswers(quizId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/getPercentageCorrectAnswers/" + quizId , {});
  }

  listQuizzesQuestionByQuizId(quizId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/listQuizzesQuestionByQuizId/" + quizId, {});
  }

  getAvgPointsPerUser(userId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/avgPointsByUser/" + userId, {});
  }

  getCompletedPerUser(userId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/listTotalQuizzesCompleted/" + userId, {});
  }

  getPercentagePerUser(userId: number): Observable<any>{
    return this.http.get(this.url + "/quizzesQuestion/correctAnswerPercentage/" + userId, {});
  }

}
