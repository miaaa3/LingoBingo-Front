import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { catchError, map, Observable, of, OperatorFunction } from 'rxjs';
import { Question } from '../Models/question.model'; 
import { ApiEndPoints } from './api-endpoints.service';
import { Difficulty } from '../Models/enums/difficulty.enum';

@Injectable({
  providedIn: 'root',
})
export class QuizApiService {
  constructor(private http: HttpClient,private api:ApiEndPoints) {}
    
  
  getQuestions(): Observable<Question[]> {
    return this.http.get(this.api.QUIZ_API_ENDPOINTS.questions).pipe(
      this.mappeddata()
    );
  }

  getQuestionsByCategory(category:string):Observable<Question[]>{
    return this.http.get(this.api.QUIZ_API_ENDPOINTS.questionByCategory(category)).pipe(
      this.mappeddata()
    )
  }
  getQuestionsByDifficulty(difficulty:Difficulty):Observable<Question[]>{
    return this.http.get(this.api.QUIZ_API_ENDPOINTS.questionByDifficulty(difficulty)).pipe(
      this.mappeddata()
    )
  }



  mappeddata():OperatorFunction<any,Question[]>{
    return map((data: any) => {
      if (Array.isArray(data)) {
        console.error(data);
        return data.map((questionData: any) => Question.fromJson(questionData)) as Question[];
      } else {
        console.error('Invalid response format:', data);
        return [];
      }
    }),
    catchError((error) => {
      console.error('Error fetching questions:', error);
      return of([]);
    })
  }

}
