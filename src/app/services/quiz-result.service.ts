import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {
  private correctAnswersCount: number = 0;
  private totalQuestions: number = 0;
  private timeSpent: number = 0;


  addCorrectAnswer() {
    this.correctAnswersCount++;
  }

  setTotalQuestions(count: number) {
    this.totalQuestions = count;
  }

  getCorrectAnswersCount(): number {
    return this.correctAnswersCount;
  }

  getTotalQuestions(): number {
    return this.totalQuestions;
  }

  resetResults() {
    this.correctAnswersCount = 0;
    this.totalQuestions = 0;
    this.timeSpent = 0;
  }

  setTimeSpent(time: number): void {
    this.timeSpent = time;
  }

  getTimeSpent(): number {
    return this.timeSpent;
  }
}
