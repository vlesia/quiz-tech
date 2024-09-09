import { Component, OnInit } from '@angular/core';
import { QuizResultService } from '../services/quiz-result.service';
import { Router } from '@angular/router';
import { formatTime } from '../helpers/format-time.helper';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
})
export class FinishComponent implements OnInit {
  correctAnswers: number = 0;
  totalQuestions: number = 0;
  timeSpent!: string;

  constructor(
    private quizResultService: QuizResultService,
    private router: Router
  ) {}

  ngOnInit() {
    this.correctAnswers = this.quizResultService.getCorrectAnswersCount();
    this.totalQuestions = this.quizResultService.getTotalQuestions();
    const timeInMs = this.quizResultService.getTimeSpent();
    this.timeSpent = formatTime(timeInMs);
  }

  goHome(): void {
    this.quizResultService.resetResults();
    this.router.navigate(['/home']);
  }
}
