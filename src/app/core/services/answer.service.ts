import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {Answer} from '../model/answer';
import {Question} from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private url = environment.apiUrl +"/api";
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  insert(answer:Answer): Observable<any>{
    return this.http.post(this.url + "/answer", answer);
  }
  delete(id:number): Observable<any>{
    return this.http.delete(this.url + "/answer/" + id);
  }
  listAnswerByQuestionUser(questionId:number): Observable<any>{
    return this.http.get(this.url + "/answers/listAnswersByQuestionUser/" + questionId , {});
  }
  listAnswerByQuestionAdmin(questionId:number): Observable<any>{
    return this.http.get(this.url + "/answers/listAnswersByQuestionAdmin/" + questionId , {});
  }
  update(answer: Answer): Observable<any>{
    return this.http.put(this.url + "/answer", answer);
  }
}
