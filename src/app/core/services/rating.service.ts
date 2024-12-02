import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  listContentOrderByScore(): Observable<any> {
    return this.http.get(this.url + "/ratingsContentByScore");
  }


  avgRatingByContent(contentId: number): Observable<any>{
    return this.http.get(this.url + "/avgRatingByContent/"+ contentId);
  }

  isRated(contentId: number, userId: number): Observable<any>{
    return this.http.get(this.url + "/ratingByContentAndUser/" + contentId + "/" + userId, {})
  }

  listRatingByUser(userId: number): Observable<any>{
    return this.http.get(this.url + "/ratingsByUser/" + userId);
  }

  listRatingByContent(contentId: number): Observable<any>{
    return this.http.get(this.url + "/ratingsByContent/" + contentId);
  }

  addRating(contentId: number, userId: number, score: number): Observable<any>{
    return this.http.post(this.url + "/rating/" + contentId + "/" + userId + "/" + score, score);
  }


}
