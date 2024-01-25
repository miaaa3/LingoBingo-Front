import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlashcardSetService {
  private baseUrl = environment.apiUrl+'/flashcard-sets';

  constructor(private http: HttpClient) {}

  getAllFlashcardSets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getFlashcardSetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addFlashcardSet(flashcardSet: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, flashcardSet);
  }

  updateFlashcardSet(id: number, updatedFlashcardSet: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/update`, updatedFlashcardSet);
  }

  deleteFlashcardSet(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/delete`);
  }
}
