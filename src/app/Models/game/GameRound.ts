import { Flashcard } from "../flashcard";

export interface GameRound {
    id: number;
    gameId: number;
    flashcard: Flashcard;
    isCorrect: boolean;
    timeSpent: number;
    isPaused: boolean;
    correctAnswer: string;
}