import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment';
import { Quiz } from 'src/app/Models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = environment.apiUrl + '/quizzes';

  constructor(private http: HttpClient) {}

  getAllQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getQuizById(quizId: number): Observable<any> {
    return this.http.get<Quiz>(`${this.baseUrl}/getQuizById/${quizId}`);
  }

  getQuizzesByCategory(category: string): Observable<any[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/${category}`);
  }

  getQuizzesByCategoryAndDifficulty(category: string, difficulty: string): Observable<any[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/getQuizzesByCategoryAndDifficulty`, {
      params: { category, difficulty }
    });
  }

  addQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, quiz);
  }

  updateQuiz(quizId: number, updatedQuiz: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${quizId}/update`, updatedQuiz);
  }

  deleteQuiz(quizId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${quizId}/delete`);
  }
}
