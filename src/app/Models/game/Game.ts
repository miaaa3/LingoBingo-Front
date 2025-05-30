import { FlashcardSet } from "../flashcard-set";
import { User } from "../user.model";
import { Player } from "./Player";
import { QuestionType } from "./QuestionType";

export interface Game {
  id: number;
  createdBy: User;
  createdAt: string;  // Use ISO string for dates in frontend
  players: Player[];
  flashcardSet?: FlashcardSet;
  questionType: QuestionType;
  isActive: boolean;
  gameCode?: string;

  // Since Java maps from Long to Integer/Long, in TS use Record with string keys (player IDs as strings)
  playerScores: Record<string, number>;
  playerFinishTimes: Record<string, number>;

  numberOfQuestions: number;
}
