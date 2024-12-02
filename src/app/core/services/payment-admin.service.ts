import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentAdminService {
  private url = environment.apiUrl + "/api"
  private http: HttpClient = inject(HttpClient);
  constructor() { }
  list():Observable<any>{
    return this.http.get(this.url + "/histories");
  }

  listTotalAmountBySubType(startDate: string, endDate: string): Observable<any>{
    return this.http.get(this.url + "/listTotalAmountBySubType/" + startDate +"/"+ endDate);
  }

  countHistoriesByPaymentType(startDate: string, endDate: string): Observable<any>{
    return this.http.get(this.url + "/countHistoriesByPaymentType/" + startDate +"/"+ endDate);
  }

}
