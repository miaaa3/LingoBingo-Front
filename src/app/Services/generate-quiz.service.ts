import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { QuizApiService } from './quiz-api.service';
import { Question } from '../Models/question.model';
import { getQuizCategories, QuizCategory } from '../Models/enums/quiz-category.enum';


@Injectable({
  providedIn: 'root'
})
export class GenerateQuizService {

  constructor(private api: QuizApiService) {}
  categories: string[] = getQuizCategories()

  generateQuizzes(): Observable<Question[]> {
    return from(this.categories).pipe(
      mergeMap(category => this.api.getQuestionsByCategory(category)),
      mergeMap(questions => this.getRandomQuestions(questions, 5))
    );
  }
  generateQuizzesForCategory(category: QuizCategory): Observable<Question[]> {
    return this.api.getQuestionsByCategory(category).pipe(
      mergeMap(questions => this.getRandomQuestions(questions, 20)),
    );
  }
  private getRandomQuestions(questions: Question[], count: number): Observable<Question[]> {
    count = Math.min(count, questions.length);
  
    const shuffledQuestions = this.shuffleArray([...questions]);
  
    const randomQuestions = shuffledQuestions.slice(0, count);
  
    return of(randomQuestions);
  }
  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
