import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizUserService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  insert(userId : number): Observable<any>{
    return this.http.post(this.url + "/quiz/"+ userId ,{});
  }

  listQuizzesByUser(userId: number):Observable<any>{
    return this.http.get(this.url + "/quizzes/"+ userId);
  }

  getQuizById(quizId: number): Observable<any>{
    return this.http.get(this.url + "/quiz/id/"+ quizId, {});
  }

}
