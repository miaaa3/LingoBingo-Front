import { Game } from "./Game";

export interface GamePlayer {
    id: number;
    playerId: number;
    game: Game;
    isFinished: boolean;
    score: number;
}