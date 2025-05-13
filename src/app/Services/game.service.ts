import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';
import { Game } from '../Models/game/Game';
import { GamePlayer } from '../Models/game/GamePlayer';
import { GameRound } from '../Models/game/GameRound';
import { GameSettings } from '../Models/game/GameSettings';

@Injectable({
  providedIn: 'root'
})
export class GameService {

   private apiUrl = environment.apiUrl+'/games';
 
   constructor(private http: HttpClient) {}

  /**
   * Start a new game
   */
  startGame(gameSettings: GameSettings): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/start`, gameSettings);
  }

  /**
   * Player joins a game using the game code
   */
  joinGame(gameCode: string, playerId: number): Observable<Game> {
    const player = { id: playerId }; // Assuming player is just an ID, modify as per your data structure
    return this.http.post<Game>(`${this.apiUrl}/join/${gameCode}`, player);
  }

  /**
   * Submit an answer for a game round
   */
  submitAnswer(gameCode: string, answerRequest: any): Observable<GameRound> {
    return this.http.post<GameRound>(`${this.apiUrl}/${gameCode}/submit-answer`, answerRequest);
  }

  /**
   * End the game for a specific player
   */
  endGameForPlayer(gameCode: string, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${gameCode}/end/${userId}`, {});
  }

  /**
   * Get the leaderboard for the game
   */
  getLeaderboard(gameCode: string): Observable<GamePlayer[]> {
    return this.http.get<GamePlayer[]>(`${this.apiUrl}/${gameCode}/leaderboard`);
  }

  /**
   * Check if the game is over (check the status of all players)
   */
  checkGameStatus(gameCode: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${gameCode}/check-status`);
  }

}
