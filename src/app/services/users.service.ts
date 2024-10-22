import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  constructor() {}
  list():Observable<any>{
    return this.http.get(this.url + "/users");
  }
}
