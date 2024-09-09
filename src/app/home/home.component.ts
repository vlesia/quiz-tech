import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Quiz } from '../models/quiz.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  quizzes$: Observable<Quiz[]>;
  randomQuizId$: Observable<number | null>;

  constructor(private quizService: QuizService) {
    this.quizzes$ = this.quizService.getData();
    this.randomQuizId$ = this.quizService.getRandomQuiz();
  }
}
