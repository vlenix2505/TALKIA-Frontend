import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestDto} from "../model/request-dto";
import {map, Observable} from "rxjs";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  login(requestDto: RequestDto): Observable<any> {
    console.log("Enviando:", requestDto)
    return this.http.post(this.url + "/authenticate", requestDto,
      {observe: 'response'}).pipe(map((response) => {
        const body = response.body;
        const headers = response.headers;
        console.log(headers);
        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer ', '');
        console.log("Authorization:", bearerToken)
        localStorage.setItem('token', token);
        return body;
      }
    ));
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
