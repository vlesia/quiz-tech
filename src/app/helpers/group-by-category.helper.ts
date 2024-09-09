import { QuizQuestion } from '../models/quiz-question.model';
import { Quiz } from '../models/quiz.model';

export const groupByCategory = (
  data: QuizQuestion[],
  maxGroups: number
): Quiz[] => {
  const groupedData = data.reduce(
    (acc: { [key: string]: QuizQuestion[] }, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {}
  );

  return Object.keys(groupedData)
    .slice(0, maxGroups)
    .map((category, index) => ({
      id: index + 1,
      category,
      items: groupedData[category],
    }));
};
