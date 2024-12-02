import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Level} from '../model/level';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);

  constructor() { }
  getLevel(levelId:number): Observable<any> {
    return this.http.get(this.url+"/levelId/"+levelId,{})

  }
  list():Observable<any>{
    return this.http.get(this.url + "/levels");
  }
}
