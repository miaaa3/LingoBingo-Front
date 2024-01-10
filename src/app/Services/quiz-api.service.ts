import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { QUIZ_API_ENDPOINTS as api} from './api-endpoints.service'; 

import { catchError, map, Observable, of } from 'rxjs';
import { Question } from '../Models/question.model'; 

@Injectable({
  providedIn: 'root',
})
export class QuizApiService {
  constructor(private http: HttpClient,) {}
    
  
  getQuestions(): Observable<Question[]> {
    return this.http.get(api.questions).pipe(
      map((data: any) => {
        console.log(data);
        if (Array.isArray(data)) {
          return data.map((questionData: any) => Question.fromJson(questionData)) as Question[];
        } else {
          // If the response is not an array, handle it accordingly
          console.error('Invalid response format:', data);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching questions:', error);
        return of([]);
      })
    );
  }

}
