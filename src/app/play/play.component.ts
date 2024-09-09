import { Component, DestroyRef, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuizResultService } from '../services/quiz-result.service';
import { QuizQuestion } from '../models/quiz-question.model';
import { Quiz } from '../models/quiz.model';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit {
  quiz$: Observable<Quiz | undefined>;
  currentQuestionIndex: number = 0;
  currentQuestion: QuizQuestion | undefined;
  selectedAnswer: string | null = null;
  options: string[] = [];
  startTime!: number;

  constructor(
    private quizService: QuizService,
    private quizResultService: QuizResultService,
    private router: Router,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {
    this.quiz$ = this.quizService.getQuizById(
      +this.route.snapshot.params['id']
    );
  }

  ngOnInit() {
    this.quiz$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((quiz) => {
      if (quiz) {
        this.loadQuestion(quiz);
        this.quizResultService.setTotalQuestions(quiz.items.length);
        this.startTime = Date.now();
      }
    });
  }

  loadQuestion(quiz: Quiz): void {
    const question = quiz.items[this.currentQuestionIndex];
    this.currentQuestion = question;

    this.options = this.shuffleOptions([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);
    this.selectedAnswer = null;
  }

  nextQuestion(quiz: Quiz): void {
    this.checkAnswer();

    if (this.currentQuestionIndex < quiz.items.length - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion(quiz);
    } else {
      this.finishQuiz();
    }
  }

  checkAnswer(): void {
    if (this.selectedAnswer === this.currentQuestion?.correct_answer) {
      this.quizResultService.addCorrectAnswer();
    }
  }

  finishQuiz(): void {
    const timeSpent = Date.now() - this.startTime;
    this.quizResultService.setTimeSpent(timeSpent);
    this.router.navigate(['/finish']);
  }

  cancelQuiz(): void {
    this.quizResultService.resetResults();
    this.router.navigate(['/home']);
  }

  shuffleOptions(options: string[]): string[] {
    return options.sort(() => Math.random() - 0.5);
  }
}
