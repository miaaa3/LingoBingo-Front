import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment';
import { LocalService } from '../Auth/local.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardSetService {
  private baseUrl = environment.apiUrl + '/flashcard-sets';

  constructor(
    private http: HttpClient,
    private tokenStorage: LocalService,
    ) {}
  // private httpHeader = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     Authorization: 'Bearer '+this.tokenStorage.getData("userApiKey2"),
  //   })
  // }

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

  getAllFlashcardSetsByCategory(category: string): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/by-category/${category}`).pipe();
  }

  getAllFlashcardSetsByDifficulty(difficulty: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-difficulty/${difficulty}`).pipe();
  }

  getAllFlashcardSetsByCategoryAndDifficulty(category: string, difficulty: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-category-and-difficulty/${category}/${difficulty}`).pipe();
  }
}
