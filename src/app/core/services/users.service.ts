import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio: Subject<User[]> = new Subject<User[]>();

  constructor() {
  }

  list(): Observable<any> {
    return this.http.get(this.url + "/users_admin");
  }

  deleteUser(userId:number):  Observable<any>{
    return this.http.delete(this.url + "/user/"+ userId);
  }
  getId(username: String): Observable<any> {
    return this.http.get(this.url + "/user_get_id/" + username);
  }

  listId(id: number): Observable<any> {
    return this.http.get(this.url + "/user/" + id);
  }

  existUsername(userName: String): Observable<any>{
    return this.http.get(this.url+ "/users_exist/" + userName, {})
  }

  insert(user: User): Observable<any> {
    return this.http.post(this.url + "/user", user);
  }

  update(user: User): Observable<any> {
    return this.http.put(this.url + "/user", user);
  }

  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<User[]> {
    return this.listaCambio.asObservable();
  }

  listByUsername(username: String): Observable<any>{
    return this.http.get(this.url + "/user_by_username/" + username);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(this.url + "/user/" + userId);
  }


  getUserAge(userId: number): Observable<any>{
    return this.http.get(this.url +"/user/age/"+userId)
  }

  getStatusByUser(userId: number): Observable<any>{
    return this.http.get(this.url + "/user/status/"+ userId, {responseType: "text"});
  }
}
