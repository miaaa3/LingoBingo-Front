import { Category } from "./enums/category.enum";
import { Difficulty } from "./enums/difficulty.enum";
import { Question } from "./question.model";

export class Quiz {
    quizId!: number;
    quizName!: string;
    category!: Category;
    difficulty!: Difficulty;
    questions!: Question[];
}