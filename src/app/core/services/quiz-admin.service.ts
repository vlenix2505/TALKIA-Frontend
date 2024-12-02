import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizAdminService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);

  constructor() { }
  list():Observable<any>{
    return this.http.get(this.url + "/quizzes");
  }
  listByUser(userName: String): Observable<any>{
    return this.http.get(this.url + "/quizzes/username/" + userName,{});
  }

}
