import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentHistoryService {

  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/user_content/listar"); //cambiar el url por el de listar por usuario
  }
  insertUserContent(contentId: number, userId: number): Observable<any>{
    return this.http.post(this.url + "/user_content/" + contentId + "/"+ userId, {responseType:'number'});
  }

  listHistoryByUserID(userId: number):Observable<any>{
    return this.http.get(this.url + "/content_history_by_user/" + userId);
  }

  listHistoryByUsername(username: string):Observable<any>{
    return this.http.get(this.url + "/user_content/username/"+ username);
  }

  listHistoryByContent(content: string):Observable<any>{
    return this.http.get(this.url + "/user_content/content/"+ content);
  }




}
