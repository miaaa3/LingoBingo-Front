import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ApiEndPoints {
  
  base = 'https://quizapi.io/api/v1';
  token = 'vcpSUYxrQftVeqfk20RMDyjtPw2ofY16KpNJqhsI';
  
  QUIZ_API_ENDPOINTS = {
    questions: `${this.base}/questions?apiKey=${this.token}`,
    questionByCategory: (category: string) => `${this.base}/questions?apiKey=${this.token}&limit=10&category=${category}`,
    questionByDifficulty: (difficulty: string) => `${this.base}/questions?apiKey=${this.token}&limit=10&difficulty=${difficulty}`
  };
}