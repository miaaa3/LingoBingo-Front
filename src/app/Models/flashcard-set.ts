import { Flashcard } from "./flashcard";
import { Game } from "./game/Game";

export interface FlashcardSet {
  id?: number;
  name: string; 
  description: string;
  flashcards: Flashcard[]; 
  createdAt?: Date;
  games: Game[];
  isPublic?: boolean; // Indicates if the set is public or private
}
