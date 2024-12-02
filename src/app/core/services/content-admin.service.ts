import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Content} from '../model/content';

@Injectable({
  providedIn: 'root'
})
export class ContentAdminService {

  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/contents");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/content/id/" + id)
    return this.http.get<Content[]>(this.url + "/content/id/" + id);
  }

  listByTitle(title: String): Observable<any>{
    return this.http.get(this.url + "/contents/title/" + title,{});
  }

  insert(content:Content): Observable<any>{
    return this.http.post(this.url + "/content", content);
  }

  update(content: Content): Observable<any>{
    return this.http.put(this.url + "/content", content);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/content/"+id);
  }
}
