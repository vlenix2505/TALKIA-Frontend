import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataQuizzesSharingService {

  private quizId: number;

  constructor() { }

  setId(quizId: number) {
    this.quizId = quizId;
  }

  getId(): number{
    return this.quizId;
  }
}
