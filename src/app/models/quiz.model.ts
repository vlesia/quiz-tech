import { QuizQuestion } from './quiz-question.model';

export interface Quiz {
  id: number;
  category: string;
  items: QuizQuestion[];
}
