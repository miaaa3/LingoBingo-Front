import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { Game } from '../../Models/game/Game';
import { Player } from '../../Models/game/Player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = environment.apiUrl + '/game';

  constructor(private http: HttpClient) {}

  /**
   * Create a new game
   * Maps to POST /api/game/create
   */
  createGame(
    questionType: string,
    numberOfQuestions: number,
    flashcardSetId: number
  ): Observable<Game> {
    const params = new HttpParams()
      .set('questionType', questionType)
      .set('numberOfQuestions', numberOfQuestions.toString())
      .set('flashcardSetId', flashcardSetId.toString());

    return this.http.post<Game>(`${this.apiUrl}/create`, null, { params });
  }

  /**
   * Player joins a game using gameCode and username
   * Maps to POST /api/game/join
   */
  joinGame(gameCode: string, username: string): Observable<string> {
    const params = new HttpParams()
      .set('gameCode', gameCode)
      .set('username', username);

    return this.http.post<string>(`${this.apiUrl}/join`, null, { params });
  }

  /**
   * Start the game
   * Maps to POST /api/game/start/{gameId}
   */
  startGame(gameId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/start/${gameId}`, null);
  }

  /**
   * Check answer for a flashcard in the game
   * Maps to POST /api/game/check/{gameId}
   */
  checkAnswer(
    gameId: number,
    flashcardId: number,
    answer: string,
    playerId: number
  ): Observable<string> {
    const params = new HttpParams()
      .set('flashcardId', flashcardId.toString())
      .set('answer', answer)
      .set('playerId', playerId.toString());

    return this.http.post<string>(`${this.apiUrl}/check/${gameId}`, null, { params });
  }

  /**
   * Finish game for a player
   * Maps to POST /api/game/finish/{gameId}/{playerId}
   */
  finishGame(gameId: number, playerId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/finish/${gameId}/${playerId}`, null);
  }

  /**
   * End the game and get leaderboard
   * Maps to POST /api/game/end/{gameId}
   */
  endGame(gameId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/end/${gameId}`, null);
  }

  /**
   * Get all active games
   * Maps to GET /api/game/active
   */
  getActiveGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/active`);
  }

  /**
   * Get game details by code
   * Maps to GET /api/game/byCode/{gameCode}
   */
  getGameByCode(gameCode: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/byCode/${gameCode}`);
  }

  /**
   * Get players in a game
   * Maps to GET /api/game/players/{gameId}
   */
  getPlayersForGame(gameId: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/players/${gameId}`);
  }
   getGameQRCode(gameCode: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${gameCode}/qrcode`, { responseType: 'blob' });
  }
}
