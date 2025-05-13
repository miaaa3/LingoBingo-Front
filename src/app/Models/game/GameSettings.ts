import { switchMode } from "../enums/switchMode.enum";
import { FlashcardSet } from "../flashcard-set";

export interface GameSettings {
    id: number;
    flashcardsToAnswer: number;  // Number of flashcards to answer to complete the game
    switchMode: switchMode;      // Display mode for the game (Terms, Definitions, or Both)
    flashcardSet: FlashcardSet;  // The flashcard set associated with the game settings
}