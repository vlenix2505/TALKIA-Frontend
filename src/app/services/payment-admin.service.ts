import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentAdminService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  constructor() { }
  list():Observable<any>{
    return this.http.get(this.url + "/histories");
  }

}
