import { Difficulty } from "./enums/difficulty.enum";
import { Category } from "./enums/category.enum";
import { Flashcard } from "./flashcard";

export interface FlashcardSet {
  id?: number;
  name: string;
  category?: Category; 
  difficulty?: Difficulty; 
  description: string;
  flashcards?: Flashcard[]; 
}
