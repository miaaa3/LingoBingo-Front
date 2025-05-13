import { GamePlayer } from "./GamePlayer";
import { GameRound } from "./GameRound";

export interface Game {
    id: number;
    gameCode: string;
    score: number;
    players: GamePlayer[];
    rounds: GameRound[];
    isFinished: boolean;
}
