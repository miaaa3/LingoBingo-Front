import { FlashcardSet } from "./flashcard-set";
import { Quiz } from "./quiz.model";

export class RecentActivity {
    id?: number;
    userId?: number;
    type: string; // You can use an enum for activity types
    title: string;
    quiz: Quiz;
    flashcardSet: FlashcardSet;
    timestamp?: Date;

}