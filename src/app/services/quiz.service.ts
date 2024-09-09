import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { groupByCategory } from '../helpers/group-by-category.helper';
import { QuizQuestion } from '../models/quiz-question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php?amount=50';
  private quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);

  constructor(private http: HttpClient) {}

  getData(): Observable<Quiz[]> {
    return this.http.get<{ results: QuizQuestion[] }>(this.apiUrl).pipe(
      map((response) => groupByCategory(response.results, 10)),
      tap((quizzes) => this.quizzes$.next(quizzes))
    );
  }

  getQuizById(id: number): Observable<Quiz | undefined> {
    return this.quizzes$.pipe(
      map((quizzes) => quizzes.find((quiz) => quiz.id === id))
    );
  }

  getRandomQuiz(): Observable<number> {
    return this.quizzes$.pipe(
      map((quizzes) => {
        const randomIndex = Math.floor(Math.random() * quizzes.length);
        return quizzes[randomIndex]?.id ?? null;
      })
    );
  }
}
